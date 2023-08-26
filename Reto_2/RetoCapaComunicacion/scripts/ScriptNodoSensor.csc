
set ant 999
set ite 0
battery set 100

atget id id
getpos2 lonSen latSen

loop

wait 100

inc ite
print "Ite:" ite
if(ite>=1000)
   cprint "Ite alcanzo limite"
   stop
end

read mens
rdata mens tipo valor

if((tipo=="hola") && (ant == 999))
   set ant valor
   data mens tipo id
   send mens * valor
end

if(tipo=="alerta")
   send mens ant
end

if(tipo=="stop")
    cprint "tipo es stop"
    data mens "stop"
    send mens * valor
    cprint "Para sensor:" id
    wait 1000
    stop    
end

areadsensor tempSen
rdata tempSen SensTipo idSens temp

if(temp>30)
   data mens "alerta" lonSen latSen
   send mens ant
end

battery bat

print "Ite:" ite "Bat:" bat 
if(bat<5)
    cprint "Bateria bajita..."
    data mens "critico" lonSen latSen
    send mens ant
end

delay 1000