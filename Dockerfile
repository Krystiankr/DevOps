FROM nginx:alpine

LABEL AUTHOR=Krystian
LABEL VERSION=10.10.10
LABEL DESCRIPTION=Plik_Dockera

ENV BGCOLOR=green

# plik index.html jest w opt/custom_site
COPY opt/custom_site/index.html /usr/share/nginx/html

# Czy to obraz ma instalowac te wget? Jesli tak to pewnie trzeba skorzystać
# z FROM ubuntu, a następnie RUN apt update && apt install nginx -y?
#RUN apt install wget curl git nano

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log;\
    sed -i 's/CHANGE_ME/$BGCOLOR/' /usr/share/nginx/html/index.html

CMD nginx -g 'daemon off;'
