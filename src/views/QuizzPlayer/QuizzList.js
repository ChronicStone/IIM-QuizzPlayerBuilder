import React from "react"
import QuizzCardList from "../../components/QuizzPlayer/QuizzCardList";

export default class QuizzList extends React.Component {
    componentDidMount() {
        if(!localStorage.getItem('player')) this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <div className="topSectionQuizzList" style={{marginTop: '-50px'}}>
                    <h2 style={{color: "#500ad2", fontSize: "25px"}}>Welcome to the Quizz section !</h2>
                    <h3 style={{color: "grey", fontSize: "21px"}}>From here, you will be able to create quizz, and play quizz created by other players. </h3>
                </div>
                <div style={{background: "#500ad2", padding: "1.2em", borderRadius: '15px', boxShadow: "3px 3px 20px rgba(0,0,0,.1)"}}>
                    <QuizzCardList/>
                </div>
            </div>
        )
    }
}