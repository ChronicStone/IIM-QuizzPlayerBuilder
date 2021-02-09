import React from "react"
import Btn from "../../components/btn"
import api from "../../_helpers/axios"

const S3_BASE_URL = 'https://iim-quizz-project.s3.eu-central-1.amazonaws.com'

export default class QuizzResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            playerScoreData: {},
            quizz: {}
        }
    }

    componentDidMount() {
        if(!localStorage.getItem('player')) this.props.history.push('/login')
        console.log(this.props)
        api.get(`/playerScore/${this.props.match.params.playerScoreId}`)
        .then((response) => {
            if(!response.data.data) console.log(response)
            else this.setState({fetched: true, playerScoreData: response.data.data, quizz: response.data.data.quizz})
        }).catch((err) => {
            console.error(err)
        })
    }

    downloadCertificate () {
        window.open(`${S3_BASE_URL}/${this.state.playerScoreData.certificate}`, "_blank");
    }

    render() {
        return (
            <div style={{display:"flex", justifyContent: "center", width: "100%", height: 'auto'}}>
               { !this.state.fetched ? (<div></div>) : 
                    <div style={{width: "50%", height: "fit-content", padding: "2em", textAlign: "center", borderRadius: '15px', boxShadow: "3px 3px 20px rgba(0,0,0,.2)"}}>
                        <h2 style={{color: "#500ad2", fontFamily: "'Montserrat', sans-serif", fontSize: "30px"}}>Congratulations !</h2>
                        
                        <img style={{height: "160px"}} src={window.location.origin + '/img/congrat.png'}/>
                        <p>You have successfuly completed the quizz <span style={{color: "#500ad2"}}>"{this.state.quizz.title}"</span></p>
                        <p>Your score : {this.state.playerScoreData.playerScore} / {this.state.playerScoreData.quizzTotalScore}</p>
                        <div style={{display: "flex", justifyContent: "space-evenly"}}>
                            <Btn content="Return to the QuizzList" inverse={"True"} slug={'/quizz/list'} />
                            <div onClick={this.downloadCertificate.bind(this)}><Btn content="Download your certificate"/></div>
                        </div>
                    </div>
               }
            </div>
        )
    }
}