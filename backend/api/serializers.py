from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category, MenuItem, Reservation

from rest_framework.decorators import api_view
from rest_framework.response import Response

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class MenuItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'description', 'price', 'category', 'image']


@api_view(['POST'])
def create_reservation(request):
    if request.user.is_authenticated:
        # Save reservation for the logged-in user
        serializer = ReservationSerializer(data={
            'user': request.user.id,  # User is automatically authenticated
            'date': request.data.get('date')
        })
    else:
        # Save reservation for a guest
        serializer = ReservationSerializer(data={
            'guest_name': request.data.get('guest_name'),
            'guest_email': request.data.get('guest_email'),
            'date': request.data.get('date')
        })
    
    if serializer.is_valid():
        serializer.save()  # Save the reservation in the database
        return Response({"message": "Reservation created successfully"}, status=201)
    else:
        return Response(serializer.errors, status=400)