import React from "react";
import Btn from "../btn"


const AwnserInput = ({awnserText, awnserId, selectedAwnserId, handleAwnserSelect, isCorrect}) => {
    function clickEvent () {
        handleAwnserSelect(awnserId, isCorrect)
    }
    return (
        <div onClick={ clickEvent } style={{color: awnserId === selectedAwnserId ? '#fff' : 'black', cursor:"pointer", borderRadius: '7px', background: awnserId === selectedAwnserId ? "#500ad2" : "lightgray", display: "flex", justifyContent: "flex-start", width: "100%", padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
            <p>O</p>
            <p style={{marginLeft: "25px"}}>{awnserText}</p>
        </div>
    )
}

export default class QuestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAwnserId: null,
        }
    }

    handleAwnserSelect = (selectedAwnserId) => {
        this.setState({selectedAwnserId: selectedAwnserId})
    }

    handleSaveQuestion = () =>  {
        let selectedAwnser = this.props.question.awnsers.find(awnser => awnser.id === this.state.selectedAwnserId)
        this.props.triggerNextQuestion(selectedAwnser)
    }

    render() {
        let awnsers = this.props.question.awnsers.map((awnser, key) => {
            return (
                <AwnserInput isCorrect={awnser.isCorrectAwnser} key={key} handleAwnserSelect={this.handleAwnserSelect} awnserText={awnser.awnserInput} awnserId={awnser.id} selectedAwnserId={this.state.selectedAwnserId} />
            )
        })

        return (
            <div>
                <div className="questionBloc">
                    <div className="questionText">
                        <p>{this.props.question.questionInput}</p>
                    </div>
                    <hr/>
                    {awnsers}
                </div>
                <div  style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                    <div onClick={this.handleSaveQuestion}>
                        <Btn content="NEXT QUESTION" />
                    </div>
                </div>
            </div>
        )
    }
}