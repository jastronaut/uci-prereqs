from django.shortcuts import render
from django.http import JsonResponse
import uciprereqs.prereqs

openDepts = uciprereqs.prereqs.load_json()

def show_courses(request):
    dept = request.GET.get('selectedDept', None)
    data = {'courses': list(openDepts[dept].keys())}
    return JsonResponse(data)

def show_course_info(request):
    dept = request.GET.get('selectedDept', None)
    num = request.GET.get('selectedNum', None)
    data = openDepts[dept][num]
    return JsonResponse(data)


def index(request):
    context = {'openDepts': list(openDepts.keys())}
    return render(request, 'uciprereqs/index.html', context)