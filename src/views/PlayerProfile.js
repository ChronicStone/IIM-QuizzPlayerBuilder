import React from "react"
import axios from "../_helpers/axios"
import "../scss/views/player-profile.scss";
import dayjs from "dayjs"
export default class PlayerProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playerData: {},
            playerScores: [],
            playerQuizz: []
        }
    }

    getPlayerId() {
        if(this.props.match.params.playerId) return this.props.match.params.playerId
        else return JSON.parse(localStorage.getItem('player')).player.id
    }

    componentDidMount() {
        if (!localStorage.getItem('player')) this.props.history.push('/login')
        axios.get(`/player/${this.getPlayerId()}`)
            .then((response) => {
                this.setState({playerData: response.data.data, playerScores: response.data.data.playerScores, playerQuizz: response.data.data.quizzs})
            })
            .catch((err) => {
                console.error(err)
            })
    }

    render() {
        return (
            <div class="grid-container">
                <div class="PlayerProfile">
                    <div style={{display: "flex", alignItems: "center", fontSize: "40px"}}>
                        <img src="../../home.svg" className="avatar"/>
                        <h1 style={{color: "#fff", paddingLeft: "15px"}}>{this.state.playerData.username}</h1>
                    </div>
                </div>
                <div class="PlayerScore">
                    <div className="titleBloc">
                        Quizz played
                    </div>
                    <div className="dataList">
                        {!this.state.playerScores.length ? <div className='emptyDataMsg'>No quizz played yet ...</div> : 
                            this.state.playerScores.map((quizz, key) => {
                                return (
                                    <div onClick={() => {this.props.history.push(`/quizz/details/${quizz.quizzId}`)}} key={key} className="listItem">
                                        <span style={{width: "90%",}}>{quizz.quizz.title}</span>
                                        <span>{quizz.playerScore} / {quizz.quizzTotalScore}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div class="PlayerQuizz">
                <div className="titleBloc">
                        Quizz created
                    </div>
                    <div className="dataList">
                        {!this.state.playerQuizz.length ? <div className="emptyDataMsg">No quizz created yet ...</div> : 
                            this.state.playerQuizz.map((quizz, key) => {
                                return (
                                    <div onClick={() => {this.props.history.push(`/quizz/details/${quizz.id}`)}} key={key} className="listItem">
                                        <span style={{width: "90%",}}>{quizz.title}</span>
                                        <span>{dayjs(quizz.createdAt).format('DD-MM-YYYY')}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}