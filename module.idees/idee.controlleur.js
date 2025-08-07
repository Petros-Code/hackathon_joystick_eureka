class IdeeControlleur {
    constructor(ideeRepository) {
        this.ideeRepository = ideeRepository;
        this.createIdee = this.createIdee.bind(this);
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
    async getIdees(res, next) {
        try {
            const idees = await this.ideeRepository.getIdees();
            res.status(200).json(idees);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }


}
export default IdeeControlleur;