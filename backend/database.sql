-- Script para recrear la base de datos de Al-korte-motorsport
-- Versión normalizada con tablas maestras y relaciones N:N
-- Compatible para importar en XAMPP/MySQL

CREATE DATABASE IF NOT EXISTS al_korte_motorsport
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE al_korte_motorsport;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS usuarios_autos;
DROP TABLE IF EXISTS autos_piezas;
DROP TABLE IF EXISTS autos;
DROP TABLE IF EXISTS piezas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS rarezas;
DROP TABLE IF EXISTS categorias;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE rarezas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE autos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  hp INT NOT NULL,
  torque INT NOT NULL,
  agarre INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  rareza_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE piezas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  hp INT NOT NULL,
  torque INT NOT NULL,
  agarre INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE autos_piezas (
  auto_id INT NOT NULL,
  pieza_id INT NOT NULL,
  PRIMARY KEY (auto_id, pieza_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE usuarios_autos (
  usuario_id INT NOT NULL,
  auto_id INT NOT NULL,
  PRIMARY KEY (usuario_id, auto_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índices recomendados para búsquedas frecuentes
CREATE INDEX idx_autos_nombre ON autos(nombre);
CREATE INDEX idx_piezas_nombre ON piezas(nombre);
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Datos de ejemplo
INSERT INTO categorias (nombre) VALUES
  ('Motor'),
  ('Suspensión'),
  ('Transmisión'),
  ('Carrocería');

INSERT INTO rarezas (nombre) VALUES
  ('Común'),
  ('Rara'),
  ('Épica'),
  ('Legendaria');

INSERT INTO usuarios (nombre, email, pass) VALUES
  ('Admin', 'admin@ejemplo.com', '123456'),
  ('Juan', 'juan@ejemplo.com', '123456');

INSERT INTO autos (nombre, hp, torque, agarre, precio, rareza_id) VALUES
  ('Aero X', 520, 610, 85, 150000.00, 1),
  ('Turbo Z', 680, 720, 90, 280000.00, 3);

INSERT INTO piezas (nombre, hp, torque, agarre, precio, categoria_id) VALUES
  ('Turbo', 120, 90, 40, 25000.00, 1),
  ('Suspensión Deluxe', 0, 25, 30, 18000.00, 2),
  ('Caja de cambios', 0, 80, 20, 22000.00, 3);

INSERT INTO autos_piezas (auto_id, pieza_id) VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3);

INSERT INTO usuarios_autos (usuario_id, auto_id) VALUES
  (1, 1),
  (1, 2),
  (2, 1);

-- Restricciones de integridad al final del script
ALTER TABLE autos
  ADD CONSTRAINT fk_autos_rareza
  FOREIGN KEY (rareza_id) REFERENCES rarezas(id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;

ALTER TABLE piezas
  ADD CONSTRAINT fk_piezas_categoria
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;

ALTER TABLE autos_piezas
  ADD CONSTRAINT fk_autos_piezas_auto
  FOREIGN KEY (auto_id) REFERENCES autos(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  ADD CONSTRAINT fk_autos_piezas_pieza
  FOREIGN KEY (pieza_id) REFERENCES piezas(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE usuarios_autos
  ADD CONSTRAINT fk_usuarios_autos_usuario
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  ADD CONSTRAINT fk_usuarios_autos_auto
  FOREIGN KEY (auto_id) REFERENCES autos(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

-- Mejoras recomendadas para el futuro:
-- 1. Agregar columnas de auditoría (created_at, updated_at) a más tablas.
-- 2. Usar un campo de estado para autos/piezas si necesitas borrado lógico.
-- 3. Encriptar contraseñas con bcrypt o Argon2.
-- 4. Separar la lógica de negocio del acceso a datos cuando el backend crezca.
