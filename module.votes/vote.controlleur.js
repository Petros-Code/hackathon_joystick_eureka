class VoteControlleur{
    constructor(voteRepository) {
        this.voteRepository = voteRepository;
        this.createVote = this.createVote.bind(this);
    }

    async createVote(req, res, next) {
        console.log('Body reçu côté serveur :', req.body);
        const {id_utilisateurs, id_idee} = req.body;
        try {
            const newVote = await this.voteRepository.createVote({ id_utilisateurs, id_idee });
            res.status(201).json(newVote);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}
export default VoteControlleur;