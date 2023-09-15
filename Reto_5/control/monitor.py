from argparse import ArgumentError
import ssl
from django.db.models import Avg
from datetime import timedelta, datetime
from receiver.models import Data, Measurement
import paho.mqtt.client as mqtt
import schedule
import time
from django.conf import settings
import random
import string

client = mqtt.Client(settings.MQTT_USER_PUB)

def trend_analysis(numbers):
    # Determinar las diferencias entre números consecutivos
    differences = [numbers[i] - numbers[i - 1] for i in range(1, len(numbers))]

    if all(diff == 0 for diff in differences[:-1]) and differences[-1] < 0:
        return "Bajando"
    elif all(diff == 0 for diff in differences[:-1]) and differences[-1] > 0:
        return "Subiendo"
    elif all(diff == 0 for diff in differences):
        return "Estable"
    else:
        return "Fluctuante"

def generate_code():
    # Combinamos dígitos y letras
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(characters) for _ in range(5))

def analyze_data():
    # Consulta todos los datos de la última hora, los agrupa por estación y variable
    # Compara el promedio con los valores límite que están en la base de datos para esa variable.
    # Si el promedio se excede de los límites, se envia un mensaje de alerta.

    print("Calculando alertas...")

    data = Data.objects.filter(
        base_time__gte=datetime.now() - timedelta(hours=1))

    aggregation = data.annotate(check_value=Avg('avg_value')) \
        .select_related('station', 'measurement') \
        .select_related('station__user', 'station__location') \
        .select_related('station__location__city', 'station__location__state',
                        'station__location__country') \
        .values('check_value', 'station__user__username',
                'measurement__name',
                'measurement__max_value',
                'measurement__min_value',
                'station__location__city__name',
                'station__location__state__name',
                'station__location__country__name',
                'values')
    alerts = 0
    for item in aggregation:
        alert = False

        variable = item["measurement__name"]
        max_value = item["measurement__max_value"] or 0
        min_value = item["measurement__min_value"] or 0
        check_value = item["check_value"]

        country = item['station__location__country__name']
        state = item['station__location__state__name']
        city = item['station__location__city__name']
        user = item['station__user__username']

        if check_value > max_value or check_value < min_value:
            alert = True

        if alert:
            message = "ALERT {} {} {}".format(variable, min_value, max_value)
            topic = '{}/{}/{}/{}/in'.format(country, state, city, user)
            print(message)
            print("VALUE -> " + str(check_value))
            print(datetime.now(), "Sending alert to {} {}".format(topic, variable))
            client.publish(topic, message)
            alerts += 1
            # Revisar los ultimos X valores por estacion si hay una alerta anterior
            x_values = 5
            item_values = item["values"]
            print(type(item_values))
            if type(item_values) is str:
                item_values = item_values.replace("[", "").replace("]", "").split(",")
                item_values = eval(item_values)
                print(type(item_values))

            last_x_values = item_values[(-x_values):]

            if len(set(last_x_values)) > 1:
                trend = trend_analysis(last_x_values)
                uuid = generate_code()
                message = "ALERT-LED: [{}]-'{}' esta {}".format(uuid, variable, trend)
                topic = '{}/{}/{}/{}/in'.format(country, state, city, user)
                print("MSG -> " + message)
                print("VALUE -> " + str(last_x_values[0]))
                print(datetime.now(), "Sending alert to {} {}".format(topic, variable))
                client.publish(topic, message)
                alerts += 1

    print(len(aggregation), "dispositivos revisados")
    print(alerts, "alertas enviadas")


def on_connect(client, userdata, flags, rc):
    '''
    Función que se ejecuta cuando se conecta al bróker.
    '''
    print("Conectando al broker MQTT...", mqtt.connack_string(rc))


def on_disconnect(client: mqtt.Client, userdata, rc):
    '''
    Función que se ejecuta cuando se desconecta del broker.
    Intenta reconectar al bróker.
    '''
    print("Desconectado con mensaje:" + str(mqtt.connack_string(rc)))
    print("Conectando con usuario: " + settings.MQTT_USER_PUB)
    print("Reconectando...")
    client.reconnect()


def setup_mqtt():
    '''
    Configura el cliente MQTT para conectarse al broker.
    '''

    print("Iniciando cliente MQTT...", settings.MQTT_HOST, settings.MQTT_PORT)
    global client
    try:
        client = mqtt.Client(settings.MQTT_USER_PUB)
        client.on_connect = on_connect
        client.on_disconnect = on_disconnect

        if settings.MQTT_USE_TLS:
            client.tls_set(ca_certs=settings.CA_CRT_PATH,
                           tls_version=ssl.PROTOCOL_TLSv1_2, cert_reqs=ssl.CERT_NONE)

        client.username_pw_set(settings.MQTT_USER_PUB,
                               settings.MQTT_PASSWORD_PUB)
        client.connect(settings.MQTT_HOST, settings.MQTT_PORT)

    except Exception as e:
        print('Ocurrió un error al conectar con el bróker MQTT:', e)


def start_cron():
    '''
    Inicia el cron que se encarga de ejecutar la función analyze_data cada 5 minutos.
    '''
    print("Iniciando cron...")
    schedule.every(2).minutes.do(analyze_data)
    print("Servicio de control iniciado")
    while 1:
        schedule.run_pending()
        time.sleep(1)
