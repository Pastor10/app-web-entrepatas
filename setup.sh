#!/bin/sh -e

# echo "Setting up project $PROFILE"
# echo "Starting Web Server ..."
# nginx -g 'daemon off;'


if [ "$PROFILE" == "LOCAL" ]
then
    echo "Setting up project $PROFILE"
    echo "Starting Web Server ..."
    nginx -g 'daemon off;'

elif [ "$PROFILE" == "DEV" ]
then    

    echo "Setting up project $PROFILE"
    echo "backend for dev"
    sed -i -e 's/localhost:9002/dev.f7ws.solucionesfps.pe/g' /var/www/html/fps-app-web-f7/main.js
    echo "filestorage for dev"
    # sed -i -e 's/35.229.116.96:8585/35.229.116.96:8585/g' /var/www/html/app/main.*.js
    nginx -g 'daemon off;'

elif [ "$PROFILE" == "QA" ]
then    

    echo "Setting up project $PROFILE"
    echo "backend for qa"
    sed -i -e 's/localhost:9002/qa.f7ws.solucionesfps.pe/g' /var/www/html/fps-app-web-f7/main.js
    echo "filestorage for dev"
    # sed -i -e 's/35.229.116.96:8585/35.229.116.96:8585/g' /var/www/html/app/main.*.js
    nginx -g 'daemon off;'

elif [ "$PROFILE" == "PRD" ]
then

    echo "Setting up project $PROFILE"
    echo "backend for prod"
    #sed -i -e 'htts/localhost:9002/f7ws.farmaciasperuanas.pe/g' /var/www/html/fps-app-web-f7/main.js
    sed -i -e 's/http:\/\/localhost:9002/https:\/\/f7ws.farmaciasperuanas.pee/g' /var/www/html/fps-app-web-f7/main.js
    echo "filestorage for prod" 
    nginx -g 'daemon off;'

else
    echo "Please enter a valid PROFILE option [ LOCAL, DEV, QA, PROD ]"
    nginx -g 'daemon off;'
fi
