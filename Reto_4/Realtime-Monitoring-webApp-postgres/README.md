# Realtime-Monitoring-webApp-postgresql

python3 -m venv venv
source venv/bin/activate  
pip3 install -r requirements_local.txt    
python3 manage.py makemigrations
python3 manage.py migrate
python manage.py runserver 0.0.0.0:8000