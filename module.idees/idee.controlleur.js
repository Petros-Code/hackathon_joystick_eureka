class IdeeControlleur {
    constructor(ideeRepository) {
        this.ideeRepository = ideeRepository;
    }

    async createIdee(idee) {
        try {
            const createdIdee = await this.ideeRepository.createIdee(idee);
            return createdIdee;
        } catch (error) {
            console.error("Erreur lors de la creation de l'idee :", error.message);
            throw error;
        }
    }


}
export default IdeeControlleur;