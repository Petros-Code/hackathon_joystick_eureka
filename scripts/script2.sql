-- 1. Insérer des utilisateurs
INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe) VALUES
(UUID(), 'Dupont', 'Jean', 'jean.dupont@example.com', 'mdp123'),
(UUID(), 'Martin', 'Claire', 'claire.martin@example.com', 'mdp456'),
(UUID(), 'Durand', 'Pierre', 'pierre.durand@example.com', 'mdp789');

-- 2. Insérer des catégories
INSERT INTO categories (nom) VALUES
('Technologie'),
('Éducation'),
('Environnement'),
('Santé');