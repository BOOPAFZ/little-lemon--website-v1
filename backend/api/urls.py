from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuItemViewSet, create_reservation, CategoryViewSet, UserProfileView, CreateUserView
from django.conf import settings
from django.conf.urls.static import static

# Register the viewsets with the router
router = DefaultRouter()
router.register(r'menu', MenuItemViewSet, basename='menu')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('api/user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/user/create/', CreateUserView.as_view(), name='create-user'),
    
    path('/api/reservation/', create_reservation, name='reservation'),
    path('api/', include(router.urls)),  # Ensure the router URLs are prefixed with /api/
]


# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

