from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from django .conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


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
