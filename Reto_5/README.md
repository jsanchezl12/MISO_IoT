sudo pip install crispy-bootstrap4


MQTT Broker
sudo systemctl status mosquitto.service

IOT Reciever App
python3 manage.py start_mqtt &

IOT Alert App
python3 manage.py start_control &

IOT Viewer App
sudo python3 manage.py runserver 0.0.0.0:80 &

user: jsanchezl12
email: js.sanchezl12@uniandes.edu.co
psw: reto5iot