-- Insérer des idées
INSERT INTO idees (id_utilisateurs, titre, corps_de_texte, vote) VALUES
('73d9eba1-72c1-11f0-9530-74563cd5f086', 'Application mobile de tri sélectif', 'Une app qui scanne un produit et indique comment le recycler.', 10),
('73d9ed70-72c1-11f0-9530-74563cd5f086', 'Plateforme de cours en ligne', 'Un site pour des cours courts avec quiz interactifs.', 5),
('73d9ee00-72c1-11f0-9530-74563cd5f086', 'Potager collaboratif', 'Un jardin partagé entre voisins pour favoriser le bio local.', 8);

-- Vérifier les IDs générés pour idees
-- SELECT id, titre FROM idees;

-- Insérer des commentaires
INSERT INTO commentaires (id_utilisateurs, id_idee, titre, corps_de_texte) VALUES
('73d9ed70-72c1-11f0-9530-74563cd5f086', 1, 'Bonne idée', 'Je trouve ce projet très utile !'),
('73d9ee00-72c1-11f0-9530-74563cd5f086', 1, 'Intéressant', 'Ça pourrait marcher avec un système de récompenses.'),
('73d9eba1-72c1-11f0-9530-74563cd5f086', 2, 'Super concept', 'J’aimerais voir une version mobile.');

-- Insérer des votes
INSERT INTO votes (id_utilisateurs, id_idee) VALUES
('73d9eba1-72c1-11f0-9530-74563cd5f086', 1),
('73d9ed70-72c1-11f0-9530-74563cd5f086', 1),
('73d9ee00-72c1-11f0-9530-74563cd5f086', 2),
('73d9eba1-72c1-11f0-9530-74563cd5f086', 3);

-- Lier les idées aux catégories
INSERT INTO idees_categories (id_idee, id_categorie) VALUES
(1, 3), -- Tri sélectif → Environnement
(2, 2), -- Plateforme de cours → Éducation
(3, 3); -- Potager collaboratif → Environnement