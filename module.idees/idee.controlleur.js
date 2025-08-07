class IdeeControlleur {
    constructor(ideeRepository) {
        this.ideeRepository = ideeRepository;
        this.createIdee = this.createIdee.bind(this);
        this.getIdees = this.getIdees.bind(this);
        this.getIdeeById = this.getIdeeById.bind(this);
        this.updateIdee = this.updateIdee.bind(this);
        this.deleteIdee = this.deleteIdee.bind(this);
    }

    async createIdee(req, res, next) {
        const { id_utilisateurs, titre, corps_de_texte, vote } = req.body;
        
        try {
            // Validation des champs requis
            if (!id_utilisateurs || !titre || !corps_de_texte) {
                const err = new Error("Les champs id_utilisateurs, titre et corps_de_texte sont requis");
                err.status = 400;
                throw err;
            }

            const newIdee = await this.ideeRepository.createIdee({ 
                id_utilisateurs, 
                titre, 
                corps_de_texte, 
                vote: vote || 0 
            });
            res.status(201).json(newIdee);
        } catch (error) {
            next(error);
        }
    }
    async getIdees(req, res, next) {
        try {
            const idees = await this.ideeRepository.getIdees();
            res.status(200).json(idees);
        } catch (error) {
            next(error);
        }
    }

    async getIdeeById(req, res, next) {
        const { id } = req.params;
        
        try {
            if (!id) {
                const err = new Error("ID de l'idée requis");
                err.status = 400;
                throw err;
            }

            const idee = await this.ideeRepository.getIdeeById(id);
            if (!idee) {
                const err = new Error("Idée non trouvée");
                err.status = 404;
                throw err;
            }
            res.status(200).json(idee);
        } catch (error) {
            next(error);
        }
    }

    async updateIdee(req, res, next) {
        const { id } = req.params;
        const { titre, corps_de_texte, vote } = req.body;
        
        try {
            if (!id) {
                const err = new Error("ID de l'idée requis");
                err.status = 400;
                throw err;
            }

            if (!titre && !corps_de_texte && vote === undefined) {
                const err = new Error("Au moins un champ à mettre à jour est requis");
                err.status = 400;
                throw err;
            }

            const updated = await this.ideeRepository.updateIdee(id, { titre, corps_de_texte, vote });
            if (!updated) {
                const err = new Error("Idée non trouvée");
                err.status = 404;
                throw err;
            }
            res.status(200).json({ message: "Idée mise à jour avec succès", id });
        } catch (error) {
            next(error);
        }
    }
    async deleteIdee(req, res, next) {
        const { id } = req.params;
        
        try {
            if (!id) {
                const err = new Error("ID de l'idée requis");
                err.status = 400;
                throw err;
            }

            const deleted = await this.ideeRepository.deleteIdee(id);
            if (!deleted) {
                const err = new Error("Idée non trouvée");
                err.status = 404;
                throw err;
            }
            res.status(200).json({ message: "Idée supprimée avec succès", id });
        } catch (error) {
            next(error);
        }
    }


}
export default IdeeControlleur;