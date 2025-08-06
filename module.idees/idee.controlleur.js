class IdeeControlleur {
    constructor(ideeRepository) {
        this.ideeRepository = ideeRepository;
        this.createIdee = this.createIdee.bind(this);
    }

    async createIdee(req,res,next) {
        const {titre, corps_de_texte, categorie} = req.body;
        try {
            const newIdee = await this.ideeRepository.createIdee({titre, corps_de_texte, categorie});
            res.status(201).json(newIdee);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }


}
export default IdeeControlleur;