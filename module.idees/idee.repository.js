class IdeeRepository{
    constructor(pool) {
    this.pool = pool;
    }

    async createIdee(idee) {
        const { id_utilisateurs,titre, corps_de_texte, vote} = idee;
        const query = 'INSERT INTO idees (id_utilisateurs,titre, corps_de_texte, vote) VALUES (?, ?, ?, ?)';
        const values = [id_utilisateurs,titre, corps_de_texte, vote];
        
        try {
            const result = await this.pool.query(query, values);
            return { id: result.insertId,id_utilisateurs,titre, corps_de_texte, vote};
        } catch (error) {
            throw new Error("Erreur lors de la création de l'idée :" + error.message);
        }
        
    }
    async getIdees() {
        const query = 'SELECT * FROM idees';
        try {
            const rows = await this.pool.query(query);
            return rows;
        } catch (error) {
            throw new Error("Erreur lors de la récupération des idées :" + error.message);
        }
    }

    async deleteIdee(id) {
        const query = 'DELETE FROM idees WHERE id = ?';
        try {
            const result = await this.pool.query(query, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Erreur lors de la suppression de l'idée :" + error.message);
        }
    }
}

export default IdeeRepository;