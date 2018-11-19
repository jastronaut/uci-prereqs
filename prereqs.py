import json
import os

def fix_filename(dept: str):
    return dept.replace('and', '&').replace('-', ' ')

def load_json():
    #  DEPTS = [
            #  'CS',
            #  'EECS'
            #  'INF',
            #  'ICS',
            #  'MATH',
            #  'MGMT',
            #  'STATS',
            #  ]

    openDepts = {}
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    STATIC_ROOT = os.path.dirname(BASE_DIR) + '/static/uciprereqs/'

    deptsfile = open(STATIC_ROOT + 'departments.json')
    openDepts = json.load(deptsfile)
    deptsfile.close()

    return openDepts