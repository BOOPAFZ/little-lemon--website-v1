from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)  
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="menu_items")
    image = models.ImageField(upload_to='menu_images/', null=True, blank=True)  

    def __str__(self):
        return self.name


class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest_email = models.EmailField(null=True, blank=True)
    guest_name = models.CharField(max_length=15, default='')
    date = models.DateTimeField()
    number_of_people = models.IntegerField()