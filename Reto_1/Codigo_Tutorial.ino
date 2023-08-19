#include <ESP8266WiFi.h>
#include "DHT.h"
#define DHTTYPE DHT11 // DHT 11

const char *ssid = "INVERCIONES.GILALF";
const char *password = "Rafa0524";

#define LED D1 // LED
// DHT Sensor
uint8_t DHTPin = 4;

// Initialize DHT sensor.
DHT dht(DHTPin, DHTTYPE);

float Temperature;
float Humidity;

WiFiServer server(80);

void setup()
{
    Serial.begin(115200);
    delay(10);

    pinMode(LED, OUTPUT);
    digitalWrite(LED, LOW); // LED apagado

    // Connect to WiFi network
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");

    // Start the server
    server.begin();
    Serial.println("Server started");

    // Print the IP address
    Serial.print("Use this URL to connect: ");
    Serial.print("http://");
    Serial.print(WiFi.localIP());
    Serial.println("/");
}

void loop()
{
    Temperature = dht.readTemperature(); // Gets the values of the temperature
    Humidity = dht.readHumidity();       // Gets the values of the humidity
    // Check if a client has connected
    WiFiClient client = server.available();
    if (!client)
    {
        return;
    }

    // Wait until the client sends some data
    Serial.println("new client");
    while (!client.available())
    {
        delay(1);
    }

    // Read the first line of the request
    String request = client.readStringUntil('\r');
    Serial.println(request);
    client.flush();

    // Match the request

    int value = HIGH;
    if (request.indexOf("/LED=ON") != -1)
    {
        digitalWrite(LED, HIGH);
        value = HIGH;
    }
    if (request.indexOf("/LED=OFF") != -1)
    {
        digitalWrite(LED, LOW);
        value = LOW;
    }

    // Return the response
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println(""); //  do not forget this one
    client.println("<!DOCTYPE HTML>");
    client.println("<html>");

    client.print("LED is now: ");

    if (value == LOW)
    {
        client.print("Off");
    }
    else
    {
        client.print("On");
    }
    client.println("<br><br>");
    client.println("<a href=\"/LED=ON\"\"><button>Turn On </button></a>");
    client.println("<a href=\"/LED=OFF\"\"><button>Turn Off </button></a><br />");
    client.println("</html>");

    client.println("<br><br>");
    client.print("Temperature: ");
    client.print(Temperature);
    client.print("C");
    client.println("<br><br>");
    client.print("Humidity: ");
    client.print(Humidity);
    client.print("%");

    delay(1);
    Serial.println("Client disconnected");
    Serial.println("");
}