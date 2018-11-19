from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path(r'ajax/show_courses/', views.show_courses, name='show_courses'),
	path(r'ajax/show_course_info/', views.show_course_info, name='show_course_info')
]