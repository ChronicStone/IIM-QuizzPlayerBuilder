import React from "react"
import api from "../../_helpers/axios"
import "../../scss/views/quizz-editor.scss"
import Btn from "../../components/btn"
import Toast from "../../components/toast"
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
            selectedQuestionId: 0
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
                            {this.state.questions.map((question, key) => {
                                return (
                                    <div onClick={() => { this.setState({ activeQuestionId: Number(question.id) }) }} className={`questionNavItem ${question.notSaved ? 'notSaved' : ''}`} key={key}>
                                        <input readOnly={true} checked={this.state.activeQuestionId === question.id} type='radio' name="activeQuestion" value={question.id} />
                                        <span>{question.questionInput}</span>
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