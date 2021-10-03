from django.shortcuts import redirect, render
from decouple import config, Csv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from requests import Request, post
from .utils import update_or_create_user_tokens, is_spotify_authenticated


class AuthURL(APIView):
    def get(self, request):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scopes': scopes,
            'response_type': 'code',
            'redirect_uri': config('REDIRECT_URI'),
            'client_id': config('CLIENT_ID')
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)


def spotify_call_back(request):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': config('REDIRECT_URI'),
        'client_id': config('CLIENT_ID'),
        'client_secret': config('CLIENT_SECRET'),
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, refresh_token, expires_in)

    return redirect('frontend:')


class IsAuthenticated(APIView):
    def get(self, request):
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
