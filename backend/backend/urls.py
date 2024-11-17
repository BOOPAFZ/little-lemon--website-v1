from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
]


# # api/urls.py
# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from api.views import MenuItemViewSet

# # Create a router and register the MenuItemViewSet
# router = DefaultRouter()
# router.register(r'menu', MenuItemViewSet, basename='menu')

# urlpatterns = [
#     path('', include(router.urls)),  # Include router-generated URLs
# ]
