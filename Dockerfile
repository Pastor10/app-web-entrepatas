FROM nginx:1.11-alpine

# Se agregan metadatos a la imagen
LABEL Descripción="Web F7 " Autor="Arquitectura" Versión="v1.0.0"

RUN apk add --no-cache tzdata
ENV TZ=America/Lima
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /
RUN cd var && mkdir www && cd www && mkdir html && cd html && mkdir fps-app-web-f7
WORKDIR /
RUN rm -r /etc/nginx/nginx.conf && rm -r /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.conf /etc/nginx/
COPY docker/nginx/f7.conf /etc/nginx/conf.d/
# Se copian los ficheros hacia la carpeta de nginx
COPY dist/fps-app-web-f7 /var/www/html/fps-app-web-f7
CMD ["root/setup.sh"]