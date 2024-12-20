from django.contrib import admin
from .models import MenuItem, Category, Reservation


if not admin.site.is_registered(MenuItem):
    admin.site.register(MenuItem)

if not admin.site.is_registered(Category):
    admin.site.register(Category)


if not admin.site.is_registered(Reservation):
    admin.site.register(Reservation)