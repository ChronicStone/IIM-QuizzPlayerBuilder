import React from "react"
import "../../scss/components/quizz/question-form-component.scss"

export default class QuestionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: props.question,
            change: false
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if(this.props.question.id != prevState.question.id){
           this.setState({question: this.props.question})
        }
    }

    handleChangeQuestionInput(e) {
        this.setState({question: {...this.state.question, questionInput: e.target.value}, change: true})
    }

    handleInputChange(key, e) {
        let awnsers = this.state.question.awnsers
        awnsers[key].awnserInput = e.target.value
        this.setState({question: {...this.state.question, awnsers: [...awnsers]}, change:true})
    }

    handleCorrectAwnserChange(key, e) {
        if(e.target.checked) {
            let awnsers = this.state.question.awnsers
            for(const itemKey in awnsers) awnsers[itemKey].isCorrectAwnser = false
            awnsers[key].isCorrectAwnser = true
            this.setState({question: {...this.state.question, awnsers: [...awnsers]}, change:true})
        }
    }

    handleQuestionSave() {
        this.props.saveNewQuestion(this.state.question)
    }

    handleQuestionUpdate() {
        this.props.updateQuestion(this.state.question)
    }

    render() {
        return (
            <div className="questionFormContainer">
                <div className="questionBloc">
                    <label>QUESTION INPUT :</label>
                    <div style={{borderBottom: "1px solid #fff", height: "0px", opacity: ".3"}}></div>
                    { this.props.question.notSaved ? 
                        <textarea
                            name="description"
                            cols="10"
                            row="10"
                            value={this.state.question.questionInput}
                            onChange={(e) => {this.handleChangeQuestionInput(e)}}
                            type="description"
                            className={"text-input-component"}
                            placeholder='Description'
                            required
                            style={{width: "98.5%"}}
                        /> 
                        : 
                        <textarea
                        name="description"
                            cols="10"
                            row="10"
                            value={this.state.question.questionInput}
                            onChange={(e) => {this.handleChangeQuestionInput(e)}}
                            type="description"
                            className={"text-input-component"}
                            placeholder='Description'
                            required
                            style={{width: "98.5%"}}
                        /> 
                    }
                </div>

                <div className="awnsersBloc">
                    <label>AWNSERS :</label>
                    <div style={{borderBottom: "1px solid #E1E8ED", height: "10px", opacity: "1"}}></div>
                    <div className="awnserItemList">
                        { this.props.question.awnsers.map((awnser, key) => {
                            return (
                                <div className="awnserItem" key={key}>
                                    <input checked={awnser.isCorrectAwnser} type='checkbox' name="correctAwnser"  value={key} onChange={(e) => {this.handleCorrectAwnserChange(key, e)}}/>   
                                    {!this.props.question.notSaved ? 
                                         <input
                                            name="awnser"
                                            value={awnser.awnserInput}
                                            onChange={(e) => this.handleInputChange(key, e)}
                                            type="text"
                                            className={"text-input-component"}
                                            placeholder="Your awnser ..."
                                            required
                                        />
                                    :
                                        <input
                                            name="awnser"
                                            value={awnser.awnserInput}
                                            onChange={(e) => this.handleInputChange(key, e)}
                                            type="text"
                                            className={"text-input-component"}
                                            placeholder="Your awnser ..."
                                            required
                                        />
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
                {!this.props.question.notSaved  ? 
                       <div className="actionsBloc">
                    <div onClick={this.handleQuestionUpdate.bind(this)} className="main-btn-component">Update question</div>
                </div> 
                
                :  <div className="actionsBloc">
                     <div onClick={this.handleQuestionSave.bind(this)} className="main-btn-component">Save question</div>
                    </div>
                }
                
            </div>
        )
    }
}