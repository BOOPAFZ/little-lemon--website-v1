
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import MenuItemViewSet, create_reservation


router = DefaultRouter()
router.register(r'menu', MenuItemViewSet, basename='menu')

urlpatterns = [
    path('reservation/', create_reservation, name='create_reservation'),
    path('', include(router.urls)), 
]
