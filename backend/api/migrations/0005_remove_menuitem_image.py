# Generated by Django 5.1.3 on 2024-11-19 06:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_reservation_guest_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menuitem',
            name='image',
        ),
    ]