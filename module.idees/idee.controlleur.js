class IdeeControlleur {
    constructor(ideeRepository) {
        this.ideeRepository = ideeRepository;
        this.createIdee = this.createIdee.bind(this);
        this.getIdees = this.getIdees.bind(this);
        this.deleteIdee = this.deleteIdee.bind(this);
    }

    async createIdee(req,res,next) {
        const {id_utilisateurs,titre, corps_de_texte, vote} = req.body;
        try {
            const newIdee = await this.ideeRepository.createIdee({id_utilisateurs,titre, corps_de_texte, vote});
            res.status(201).json(newIdee);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    async getIdees(req, res, next) {
        try {
            const idees = await this.ideeRepository.getIdees();
            res.status(200).json(idees);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des idées" });
        }
    }
    async deleteIdee(req, res, next) {
        const { id } = req.params;
        try {
            const deleted = await this.ideeRepository.deleteIdee(id);
            if (deleted) {
                res.status(200).json({ message: "Idée supprimée avec succès" });
            } else {
                res.status(404).json({ message: "Idée non trouvée" });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    }


}
export default IdeeControlleur;