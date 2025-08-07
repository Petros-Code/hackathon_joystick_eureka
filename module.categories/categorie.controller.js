class CategorieController {
  constructor(categorieRepository) {
    this.categorieRepository = categorieRepository;
    this.createCategorie = this.createCategorie.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this); // pour get
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
}

export default CategorieController;
