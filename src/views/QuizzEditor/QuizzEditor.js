import React from "react"
import api from "../../_helpers/axios"
import "../../scss/views/quizz-editor.scss"
import Btn from "../../components/btn"
import Toast from "../../components/toast"
import ConfirmPopup from "../../components/confirmPopup"
import QuestionForm from "../../components/QuizzEditor/QuestionForm"

const NewQuestionLayout = (quizzId) => {
    return {
        notSaved: true,
        quizzId: quizzId,
        id: -1,
        questionInput: "Your question input goes here ...",
        awnsers: [
            {
                awnserInput: "Your awnser goes here ...",
                isCorrectAwnser: true
            },
            {
                awnserInput: "Your awnser goes here ...",
                isCorrectAwnser: false
            },
            {
                awnserInput: "Your awnser goes here ...",
                isCorrectAwnser: false
            },
            {
                awnserInput: "Your awnser goes here ...",
                isCorrectAwnser: false
            }
        ]
    }
}
export default class QuizzEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quizzData: {},
            questions: [],
            selectedQuestionId: 0,
            delQuestPopup: {
                active: false,
                props: {}
            }
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('player')) this.props.history.push('/login')
        api.get(`/quizz/${this.props.match.params.quizzId}`)
            .then((response) => {
                if (response.data.success) {
                    if (response.data.data.creatorPlayerId != JSON.parse(localStorage.getItem('player')).player.id) this.props.history.push('/quizz/editor')
                    else {
                        this.setState({ quizzData: response.data.data, questions: response.data.data.questions })
                    }
                } else this.props.history.push('/quizz/editor')
            })
            .catch((err) => {
                console.error(err)
            })
    }

    reloadQuizzData() {
        api.get(`/quizz/${this.props.match.params.quizzId}`)
            .then((response) => {
                this.setState({ quizzData: response.data.data, questions: response.data.data.questions })
                this.setState({ activeQuestionId: null })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    saveNewQuestion(question) {
        console.log(this)
        api.post('/question/create', question)
            .then((response) => {
                if (response.data.success) {
                    Toast({
                        title: "Success",
                        text: "Question successfuly created.",
                        type: "success"
                    })
                    this.reloadQuizzData()
                }
                else Toast({
                    title: "Question not saved",
                    text: response.data.message,
                    type: "danger"
                })
            })
            .catch((err) => {
                console.error(err)
                Toast({
                    title: "Question not savec",
                    text: "An error has occured, please try again",
                    type: "danger"
                })
            })
    }

    displayActiveQuestion() {
        const question = this.state.questions.find((question) => question.id === this.state.activeQuestionId)
        console.log()
        if (question) return (<QuestionForm saveNewQuestion={this.saveNewQuestion.bind(this)} question={question} index={this.state.questions.indexOf(question)} />)
        else return (
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
                <img src={`${window.location.origin}/choose.svg`} />
            </div>
        )
    }

    insertNewQuestion() {
        if (this.state.questions.find((question) => question.notSaved === true)) {
            Toast({
                title: "Question not saved",
                text: "Please save your current question before creating a new one.",
                type: "danger"
            })
        }
        else {
            this.setState({ questions: [...this.state.questions, NewQuestionLayout(this.state.quizzData.id)], activeQuestionId: -1 })
        }
    }

    triggerDeleteQuestion(question) {
        console.log('triggered')
        if(question.notSaved) this.reloadQuizzData()
        else this.setState({
            delQuestPopup: {
                active: true,
                props: {
                    questionId: question.id
                }
            }
        })
    }

    confirmQuestionDelete(actionProps) {
        this.setState({ delQuestPopup: {active: false, props: {}}})
        api.delete(`/question/delete/${actionProps.questionId}`)
        .then((response) => {
            if(response.data.success) {
                this.reloadQuizzData()
                Toast({
                    title: "Operation successful",
                    text: "The question have been deleted",
                    type: "success"
                })
            } else Toast({
                title: "Operation failed",
                text: response.data.message || "An error has occured.",
                type: "danger"
            })
        })
        .catch((err) => {
            console.error(err)
            Toast({
                title: "Operation failed",
                text: err.data.message || "An error has occured.",
                type: "danger"
            })
        })
        
    }



    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="topNavMenu">
                    <div className="leftSide">
                        <div onClick={() => {this.props.history.push('/quizz/editor')}} className="main-btn-component inverse">🡐</div>
                        <span>|</span>
                        <div>{this.state.quizzData.title}</div>
                    </div>
                    <div className="rightSide">
                        <button onClick={() => {console.log('click')}} className="main-btn-component danger">DELETE QUIZZ</button>
                        <button onClick={() => {console.log('click')}} disabled={!this.state.questions.length ? true : false } className="main-btn-component">{ !this.state.quizzData.published ? 'PUBLISH' : 'PUBLISH'} QUIZZ</button>
                    </div>
                </div>
                <div className="mainLayout">
                    <div className="leftSection">
                        <div className="quizzHeadSection">
                            <div>QUESTIONS</div>
                            <div onClick={this.insertNewQuestion.bind(this)}><Btn content='+' /></div>
                        </div>
                        <div className="questionTimeLine">
                            {/* POPUP CONFIRMATION OF QUESTION SUPRESSION */}
                            <ConfirmPopup 
                                actionProps={this.state.delQuestPopup.props} 
                                acceptAction={this.confirmQuestionDelete.bind(this)} 
                                cancelAction={() => {this.setState({ delQuestPopup: {active: false, props: {}}})}} 
                                title="Please confirm your operation" message={`You are asking to delete a question from your quizz. Once deleted, a question can never be recovered.`} 
                                color="danger" 
                                active={this.state.delQuestPopup.active}/>
                            {this.state.questions.map((question, key) => {
                                return (
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                        <div onClick={() => { this.setState({ activeQuestionId: Number(question.id) }) }} className={`questionNavItem ${question.notSaved ? 'notSaved' : ''}`} key={key}>
                                            <input readOnly={true} checked={this.state.activeQuestionId === question.id} type='radio' name="activeQuestion" value={question.id} />
                                            <span>{question.questionInput}</span>
                                        </div>
                                        <svg onClick={() => {this.triggerDeleteQuestion(question)}} height="427pt" viewBox="-40 0 427 427.00131" width="427pt" xmlns="http://www.w3.org/2000/svg"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/></svg>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="rightSection">
                        {this.displayActiveQuestion()}
                    </div>
                </div>
            </div >
        )
    }
}