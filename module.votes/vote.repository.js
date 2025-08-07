class VoteRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createVote({id_utilisateurs, id_idee}) {
    try{
        const [result] = await this.pool.query(
          'INSERT INTO votes (id_utilisateurs, id_idee) VALUES (?, ?)',
          [id_utilisateurs, id_idee]
        );
        return result;
      } catch (error){
        throw new Error("Erreur lors du votes : " + error.message);
      }

    }

  async getVotesByPostId(postId) {
    const { rows } = await this.pool.query(
      'SELECT * FROM votes WHERE id_idee = ?',
      [postId]
    );
    return rows;
  }

  async deleteVote(voteId) {
    const { rowCount } = await this.pool.query(
      'DELETE FROM votes WHERE id = ?',
      [voteId]
    );
    return rowCount > 0;
  }
}
export default VoteRepository;