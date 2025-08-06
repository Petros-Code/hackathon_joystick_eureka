class CategorieController {
  constructor(categorieRepository) {
    this.categorieRepository = categorieRepository;
    this.createCategorie = this.createCategorie.bind(this);
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
}

// get All catégories
/* export async function getAllCategories(req, res) {
  try {
    // const { id, nom } = req.body;
    const rows = await pool.query("SELECT id, nom FROM categories");
    // [id, nom];
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des catégories :", err);
    res.status(500).json({
      message: "Erreur lors de la récupération des catégories",
    });
  }
} */

export default CategorieController;
