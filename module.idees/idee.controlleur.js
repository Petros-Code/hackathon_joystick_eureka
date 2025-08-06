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


}
export default IdeeControlleur;