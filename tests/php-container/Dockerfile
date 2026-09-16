FROM php:8.3-apache

# Lekcje korzystają z mysqli, a nie z dodatkowych frameworków.
RUN docker-php-ext-install mysqli

WORKDIR /var/www/html

# Kontener jest zdrowy dopiero wtedy, gdy Apache nasłuchuje na porcie 80.
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=12 \
    CMD php -r '$socket = @fsockopen("127.0.0.1", 80, $errorCode, $errorMessage, 1); exit($socket ? 0 : 1);'
