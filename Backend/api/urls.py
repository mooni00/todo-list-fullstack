from django.contrib import admin
from django.urls import path, include
from api.views import CategoryViewSet, TaskViewSet



urlpatterns = [
    path('tasks/', TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-list'),
    path('tasks/<int:pk>/', TaskViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='task-detail'),
    path('categories/', CategoryViewSet.as_view({'get': 'list', 'post': 'create'}), name='category-list'),
]

