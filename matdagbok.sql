CREATE DATABASE IF NOT EXISTS matdagbok;
USE matdagbok;
CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(63) NOT NULL UNIQUE,
    password VARCHAR (255) NOT NULL,
    firstname VARCHAR(63),
    lastname VARCHAR(63),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS ingredients (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(63) NOT NULL UNIQUE,
    calories INT(6),
    standard_portion INT(6) DEFAULT 0,
    owner INT(6) DEFAULT 0,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS meals (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(127),
    user_id INT(6),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS consumption (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    meal_id INT(6),
    name VARCHAR(127) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount INT(6) DEFAULT 0,
    calories INT(6) DEFAULT 0,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);