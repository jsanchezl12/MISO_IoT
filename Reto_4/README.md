
7z a postgres.zip Realtime-Monitoring-webApp-postgres/

wget https://github.com/jsanchezl12/MISO_IoT/raw/main/Reto_4/postgres.zip 
unzip postgres.zip

wget https://github.com/jsanchezl12/MISO_IoT/raw/main/Reto_4/timescale.zip
unzip timescale.zip


pipenv install
pipenv shell
python3 manage.py makemigrations
python3 manage.py migrate
python manage.py runserver 0.0.0.0:8000