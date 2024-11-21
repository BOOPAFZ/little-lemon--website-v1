from django.contrib.auth.models import User
from rest_framework import generics, viewsets, permissions
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from django.conf import settings
from django.core.mail import send_mail
from .models import Category, MenuItem, Reservation
from .serializers import UserSerializer, CategorySerializer, MenuItemSerializer, ReservationSerializer
from datetime import datetime
from rest_framework.views import APIView  
from rest_framework.response import Response


from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return self.request.user


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]
    


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]



@api_view(['POST'])
@permission_classes([AllowAny])
def create_reservation(request):
    reservation_date = request.data.get('date')
    reservation_time = request.data.get('time')  
    number_of_people = request.data.get('number_of_people')

    if not reservation_date:
        return JsonResponse({"error": "Date is required."}, status=400)
    if not reservation_time:
        return JsonResponse({"error": "Time is required."}, status=400)  
    if not number_of_people:
        return JsonResponse({"error": "Number of people is required."}, status=400)

  
    if not request.user.is_authenticated:
        guest_name = request.data.get('guest_name')
        guest_email = request.data.get('guest_email')

        if not guest_name or not guest_email:
            return JsonResponse({"error": "Guest name and email are required for unauthenticated users."}, status=400)

   
    existing_reservation = Reservation.objects.filter(
        date=reservation_date,
        time=reservation_time
    ).exists()

    if existing_reservation:
        return JsonResponse({"error": "The selected time slot is already taken."}, status=400)

   
    if request.user.is_authenticated:
       
        serializer = ReservationSerializer(data={
            'user': request.user.id,
            'date': reservation_date,
            'time': reservation_time, 
            'number_of_people': number_of_people
        }, context={'request': request})  
    else:
       
        serializer = ReservationSerializer(data={
            'guest_name': guest_name,
            'guest_email': guest_email,
            'date': reservation_date,
            'time': reservation_time, 
            'number_of_people': number_of_people
        }, context={'request': request})  

    if serializer.is_valid():
        reservation = serializer.save()  

  
        send_reservation_email(reservation)

        return JsonResponse({"message": "Reservation created successfully"}, status=201)
    else:
        print(f"Serializer Errors: {serializer.errors}") 
        return JsonResponse(serializer.errors, status=400)
def send_reservation_email(reservation):
    subject = 'Reservation Confirmation'
    message = f"Thank you for your reservation! Here are your reservation details:\n\n"
    message += f"Name: {reservation.guest_name}\n"
    message += f"Email: {reservation.guest_email}\n"
    message += f"Reservation Date: {reservation.date}\n"
    message += f"Number of People: {reservation.number_of_people}\n"
    
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [reservation.guest_email]  
    
    try:
        send_mail(subject, message, from_email, recipient_list)
    except Exception as e:
        print(f"Error sending email: {e}")


class ReservationListView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):

        reservations = Reservation.objects.filter(user=request.user)
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)