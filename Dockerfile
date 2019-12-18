FROM nginx:alpine
RUN apk update && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/America/Bogota /etc/localtime && \
    echo "America/Bogota" >  /etc/timezone && \
    apk del tzdata
COPY dist/colas/ /usr/share/nginx/html/

