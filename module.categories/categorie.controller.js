class CategorieController {
  constructor(categorieRepository) {
    this.categorieRepository = categorieRepository;
    this.createCategorie = this.createCategorie.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.getCategorieById = this.getCategorieById.bind(this);
    this.updateCategorie = this.updateCategorie.bind(this);
    this.deleteCategorie = this.deleteCategorie.bind(this);
  }

  async createCategorie(req, res, next) {
    const { nom } = req.body;

    try {
      // Validation des champs requis
      if (!nom || nom.trim() === '') {
        const err = new Error("Le nom de la catégorie est requis");
        err.status = 400;
        throw err;
      }

      const newCategorie = await this.categorieRepository.createCategorie({
        nom: nom.trim()
      });
      res.status(201).json(newCategorie);
    } catch (error) {
      next(error);
    }
  }

  // get All catégories
  async getAllCategories(req, res, next) {
    try {
      const rows = await this.categorieRepository.getAllCategories();
      res.status(200).json(rows);
    } catch (error) {
      next(error);
    }
  }
  // getById
  async getCategorieById(req, res, next) {
    const { id } = req.params;
    
    try {
      if (!id) {
        const err = new Error("ID de la catégorie requis");
        err.status = 400;
        throw err;
      }

      const categorie = await this.categorieRepository.getCategorieById(id);
      if (!categorie) {
        const err = new Error("Catégorie non trouvée");
        err.status = 404;
        throw err;
      }
      res.status(200).json(categorie);
    } catch (error) {
      next(error);
    }
  }

  // updateCategorie
  async updateCategorie(req, res, next) {
    const { id } = req.params;
    const { nom } = req.body;
    
    try {
      if (!id) {
        const err = new Error("ID de la catégorie requis");
        err.status = 400;
        throw err;
      }

      if (!nom || nom.trim() === '') {
        const err = new Error("Le nom de la catégorie est requis");
        err.status = 400;
        throw err;
      }

      const updated = await this.categorieRepository.updateCategorie(id, { nom: nom.trim() });
      if (!updated) {
        const err = new Error("Catégorie non trouvée");
        err.status = 404;
        throw err;
      }
      res.status(200).json({ message: "Catégorie mise à jour avec succès", id });
    } catch (error) {
      next(error);
    }
  }
  // supprimer ById
  async deleteCategorie(req, res, next) {
    const { id } = req.params;

    try {
      if (!id) {
        const err = new Error("ID de la catégorie requis");
        err.status = 400;
        throw err;
      }

      const deleted = await this.categorieRepository.deleteCategorie(id);
      if (!deleted) {
        const err = new Error("Catégorie non trouvée");
        err.status = 404;
        throw err;
      }
      res.status(200).json({ message: "Catégorie supprimée avec succès", id });
    } catch (error) {
      next(error);
    }
  }
}

export default CategorieController;
