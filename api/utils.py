from .models import Room

import string
import random


# * This function return unique code for Room
def generate_unique_code():
    length = 8
    while True:
        code = ''.join(random.choices(string.ascii_uppercase+ string.digits, k=length))
        if Room.objects.filter(code=code).count() == 0: break

    return code
