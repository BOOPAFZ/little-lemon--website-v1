from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse

from .models import Category, MenuItem, Reservation
from .serializers import UserSerializer, CategorySerializer, MenuItemSerializer


# User registration view allowing all access
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Category viewset for admin users
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]


# MenuItem viewset for admin users
class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [IsAdminUser]


# Reservation creation view accessible by all users (authenticated and non-authenticated)
@api_view(['POST'])
@permission_classes([AllowAny])
def create_reservation(request):
    # Retrieve reservation date from the request
    reservation_date = request.data.get('date') 

    if not reservation_date:
        return JsonResponse({"error": "Date is required."}, status=400)

    # Create reservation for authenticated users
    if request.user.is_authenticated:
        reservation = Reservation(
            user=request.user,
            date=reservation_date
        )
    else:
        # For guests, ensure the guest_email is provided
        guest_email = request.data.get('guest_email')
        if not guest_email:
            return JsonResponse({"error": "Guest email is required for non-authenticated users."}, status=400)

        reservation = Reservation(
            guest_email=guest_email,
            date=reservation_date
        )

    reservation.save()
    return JsonResponse({"message": "Reservation successfully created"})
