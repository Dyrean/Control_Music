from django.contrib.auth.models import AbstractUser
from django.db import models

import string
import random
# from django.conf import settings

# * This function return unique code for Room


def generate_unique_code():
    length = 8
    while True:
        code = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


class User(AbstractUser):
    pass


class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

# user = models.ForeignKey(settings.AUTH_USER_MODEL, )
