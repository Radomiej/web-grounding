SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS web_grounding
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_polish_ci;

USE web_grounding;

DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS places;

CREATE TABLE offers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available TINYINT(1) NOT NULL DEFAULT 1
);

INSERT INTO offers (title, price, available) VALUES
    ('Kurs HTML od podstaw', 49.00, 1),
    ('Ćwiczenia PHP i MySQL', 79.90, 1),
    ('Powtórka przed INF.03', 29.50, 0);

CREATE TABLE places (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(60) NOT NULL,
    population INT UNSIGNED NOT NULL
);

INSERT INTO places (name, country, population) VALUES
    ('Rzeszów', 'Polska', 198609),
    ('Wrocław', 'Polska', 673923),
    ('Praga', 'Czechy', 1384732),
    ('Brno', 'Czechy', 400566),
    ('Bratysława', 'Słowacja', 475503);

