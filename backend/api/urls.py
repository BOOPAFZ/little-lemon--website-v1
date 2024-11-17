# from django.urls import path
# from . import views


# urlpatterns = [
#     path('menu/', views.MenuItemViewSet.as_view(), name='menu'),
   
# ]

# # api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import MenuItemViewSet, create_reservation

# Create a router and register the MenuItemViewSet
router = DefaultRouter()
router.register(r'menu', MenuItemViewSet, basename='menu')

urlpatterns = [
    path('reservation/', create_reservation, name='create_reservation'),  # Add this line for the reservation endpoint
    path('', include(router.urls)),  # Include router-generated URLs
]
