from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuItemViewSet, create_reservation, CategoryViewSet, UserProfileView, CreateUserView, ReservationListView
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'menu', MenuItemViewSet, basename='menu')
router.register(r'categories', CategoryViewSet, basename='category')


urlpatterns = [
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('user/create/', CreateUserView.as_view(), name='create-user'),
    path('api/reservation/create/', create_reservation, name='create-reservation'), 
    path('api/user/reservation/', ReservationListView.as_view(), name='user-reservations'),  
    
    path('', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

