import React from "react"
import "../../scss/components/quizz/quizz-card-component.scss"
import api from "../../_helpers/axios"
import Btn from "../../components/btn"
import Tooltip from "../../components/tooltip"

const LeaderboardItem = ({ score, rank, history }) => {
    return (
        <div onClick={() => { history.push(`/player/profile/${score.playerId}`) }} style={{ background: "#500ad2", color: "#fff", padding: '1em', display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", boxShadow: '3px 3px 20px rgba(0,0,0,.1)', borderRadius: '10px', cursor: "pointer" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
                {rank}.
                <img style={{width: "30px", height: "30px", borderRadius: '50%', marginLeft: "10px", marginRight: "10px"}} src={process.env.REACT_APP_S3_BUCKET_URL + score.player.avatar} />
                <span style={{ fontWeight: "bolder", cursor: "pointer", marginRight: "20px" }}>{score.player.username}</span>
                {rank === 1 ? <img style={{ height: "20px", width: "20px" }} src={window.location.origin + '/img/gold.svg'} /> : ''}
                {rank === 2 ? <img style={{ height: "20px", width: "20px" }} src={window.location.origin + '/img/silver.svg'} /> : ''}
                {rank === 3 ? <img style={{ height: "20px", width: "20px" }} src={window.location.origin + '/img/bronze.svg'} /> : ''}
            </span>
            <span>{score.playerScore} / {score.quizzTotalScore}</span>
        </div>
    )
}

const Leaderboard = ({ playerScores, history }) => {
    let sortedScores = playerScores.sort((a, b) => b.playerScore - a.playerScore)
    return (
        <>
            {   !sortedScores.length ? (<div style={{fontStyle: "italic"}}>This quizz has not been played yet</div>) :
                sortedScores.map((score, itemKey) => {
                    return (
                        <LeaderboardItem history={history} key={itemKey} rank={itemKey + 1} score={score} />
                    )
                })
            }
        </>
    )
}
class QuizzDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            quizzData: {},
            player: {},
            playerScores: []
        }
    }

    componentDidMount() {
        console.log(this)
        if (!localStorage.getItem('player')) this.props.history.push('/login')
        this.setState({ ...this.state, isFetching: true });
        api.get(`/quizz/${this.props.match.params.quizzId}`)
            .then(response => {
                console.log(response)
                this.setState({ player: response.data.data.player, quizzData: response.data.data, playerScores: response.data.data.playerScores, isFetching: false });
            }).catch((err) => {
                console.error(err)
                this.setState({ ...this.state, isFetching: false });
            })
    }

    render() {
        return (
            <div style={{background: "#4E0ACC", padding: "1.5em", borderRadius: "15px", boxShadow: "3px 3px 20px rgba(0,0,0,0.1)"}}>
                {this.state.isFetching ?
                    <p>'Fetching quizz data ...'</p> :
                    <div>
                        <div className="quizzCard" style={{ background: "#fff" }}>
                            <div className="titleBloc">
                                <h3 className="title">{this.state.quizzData.title}</h3>
                                <Tooltip label={(<div style={{ width: "100%", textAlign: "center" }}>Created by <span style={{ fontWeight: "bold" }}>{this.state.player.username}</span></div>)}>
                                    <img onClick={() => { this.props.history.push(`/player/profile/${this.state.player.id}`) }} className="avatar" src={process.env.REACT_APP_S3_BUCKET_URL + this.state.player.avatar} />
                                </Tooltip>
                            </div>
                            <div>
                            </div>
                            <hr style={{ opacity: .3, backgroundColor: "lightgrey" }} />
                            <p className="description">{this.state.quizzData.description}</p>
                            <div style={{ display: "grid", placeItems: "center", width: "100%" }}>
                                <Btn content="PLAY QUIZZ" slug={`/quizz/player/${this.state.quizzData.id}`} />
                            </div>
                        </div>
                        <div style={{ marginTop: "25px", padding: "1.2em", background: "#fff", boxShadow: "3px 3px 20px rgba(0, 0, 0, .1)", borderRadius: "15px" }}>
                            <h3 style={{color: "#4E0ACC", textTransform: "uppercase"}}>Quizz leaderboard : </h3>
                            <Leaderboard history={this.props.history} playerScores={this.state.playerScores} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default QuizzDetails;
