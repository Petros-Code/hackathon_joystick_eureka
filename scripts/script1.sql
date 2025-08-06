CREATE DATABASE IF NOT EXISTS EUREKA;
USE EUREKA;

CREATE TABLE IF NOT EXISTS utilisateurs (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL,
  date_de_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS idees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_utilisateurs CHAR(36) NOT NULL,
  titre VARCHAR(100) NOT NULL,
  corps_de_texte TEXT NOT NULL,
  vote INT DEFAULT 0,
  date_de_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_idees_utilisateurs FOREIGN KEY (id_utilisateurs) REFERENCES utilisateurs(id)
);

CREATE TABLE IF NOT EXISTS commentaires (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_utilisateurs CHAR(36) NOT NULL,
  id_idee INT NOT NULL,
  titre VARCHAR(100) NOT NULL,
  corps_de_texte TEXT NOT NULL,
  date_de_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_commentaires_utilisateurs FOREIGN KEY (id_utilisateurs) REFERENCES utilisateurs(id),
  CONSTRAINT fk_commentaires_idees FOREIGN KEY (id_idee) REFERENCES idees(id)
);

CREATE TABLE IF NOT EXISTS votes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_utilisateurs CHAR(36) NOT NULL,
  id_idee INT NOT NULL,
  date_de_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_votes_utilisateurs FOREIGN KEY (id_utilisateurs) REFERENCES utilisateurs(id),
  CONSTRAINT fk_votes_idees FOREIGN KEY (id_idee) REFERENCES idees(id)
);

CREATE TABLE IF NOT EXISTS idees_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_idee INT NOT NULL,
  id_categorie INT NOT NULL,
  CONSTRAINT fk_idees_categories_idees FOREIGN KEY (id_idee) REFERENCES idees(id),
  CONSTRAINT fk_idees_categories_categories FOREIGN KEY (id_categorie) REFERENCES categories(id)
);
