#### Configuracion ambiente python

python3 -m venv venv  
Linux ->
source venv/bin/activate   
Windows ->
venv\Scripts\activate

pip3 install -r requeriments.txt  

#### Comandos para correr el proyecto
Linux ->
python3 subscriber.py
python3 publisher.py --host 34.202.163.71 --user user1 --passwd 123456 --topic mexico/jalisco/guadalajara/user1

Windows ->
python subscriber.py
python publisher.py --host 34.202.163.71 --user user1 --passwd 123456 --topic mexico/jalisco/guadalajara/user1

#### Comandos para generar certificados para JMeter

Generar llave para JMeter -->
"C:\Program Files\OpenSSL-Win64\bin\openssl.exe" pkcs12 -export -out ca.p12 -inkey ca.key -in ca.crt
keytool -importkeystore -destkeystore ca.jks -srcstoretype PKCS12 -srckeystore ca.p12 

javac -version

psw_jks: mqtt123
psw_key: mqtt