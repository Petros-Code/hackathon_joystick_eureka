class IdeeRepository{
    constructor(pool) {
    this.pool = pool;
    }

    async createIdee(idee) {
        const { titre, corps_de_texte, categorie, dateCreation } = idee;
        const query = 'INSERT INTO idees (titre, corps_de_texte, categorie) VALUES (?, ?, ?) RETURNING *';
        const values = [titre, corps_de_texte, categorie, dateCreation];
        
        try {
            const result = await this.pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error("Erreur lors de la création de l'idée :", error.message);
        }
        
    }
}

export default IdeeRepository;