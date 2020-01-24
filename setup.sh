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
    sed -i -e 's/localhost:9002/f7ws.farmaciasperuanas.pe/g' /var/www/html/fps-app-web-f7/main.js
    echo "filestorage for dev"
    # sed -i -e 's/35.229.116.96:8585/35.229.116.96:8585/g' /var/www/html/app/main.*.js
    nginx -g 'daemon off;'

elif [ "$PROFILE" == "PRD" ]
then

    echo "Setting up project $PROFILE"
    echo "backend for prod"
    sed -i -e 's/localhost:9002/f7ws.farmaciasperuanas.pe/g' /var/www/html/fps-app-web-f7/main.js
    echo "filestorage for prod" 
    # sed -i -e 's/35.229.116.96:8585/35.229.116.96:8585/g' /var/www/html/app/main.*.js
    nginx -g 'daemon off;'

else
    echo "Please enter a valid PROFILE option [ LOCAL, DEV, PROD ]"
    nginx -g 'daemon off;'
fi
