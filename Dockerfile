FROM nginx:stable

COPY dist/ /var/www/static
RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
