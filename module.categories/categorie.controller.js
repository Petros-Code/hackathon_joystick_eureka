class CategorieController {
  constructor(categorieRepository) {
    this.categorieRepository = categorieRepository;
    this.createCategorie = this.createCategorie.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this); // pour get
    this.getCategorieById = this.getCategorieById.bind(this); // getById
  }

  async createCategorie(req, res, next) {
    const { id, nom } = req.body;

    try {
      const newCategorie = await this.categorieRepository.createCategorie({
        id,
        nom,
      });
      res.status(201).json(newCategorie);
    } catch (error) {
      next(error); // Passer l'erreur au middleware global
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
      const categorie = await this.categorieRepository.getCategorieById(id);
      if (!categorie) {
        return res.status(404).json({ message: "Catégorie non trouvée" });
      }
      res.status(200).json(categorie);
    } catch (error) {
      next(error);
    }
  }
}

export default CategorieController;
