import React from "react";
import "../../scss/components/generic/form-component.scss";
import "../../scss/components/quizz/quizz-form-component.scss";
import Btn from "../btn";
import api from "../../_helpers/axios"

export default class QuizzForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            title: "",
            description: "",
            playerId: "",
            error: {
                state: "false",
                description: ""
            }
        }
    }

    componentDidMount() {
        console.log(this)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleForm = (e) => {
        e.preventDefault()
        const { title, description } = this.state
        api.post("/quizz/create", { title, description })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    this.props.history.push(`/quizz/editor/${res.data.data.id}`)
                }
                else {
                    this.setState({
                        error: {
                            state: true,
                            description: "invalid credentials"
                        }
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className={"create-quizz-component"}>
                {!this.props.active ? '' :
                    <div className={!this.props.active ? 'quizz-from-component active ' : 'quizz-form-component'}>
                        <form className={'contain'} style={{position: "relative"}}>
                            <svg onClick={this.props.closePopup} className="closeIcon" height="329pt" viewBox="0 0 329.26933 329" width="329pt" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>                            <h3 style={{ fontSize: "20px", color: "#500ad2" }}>Create your quizz</h3>
                            <input
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                                type="text"
                                className={"text-input-component"}
                                placeholder="Title"
                                required
                            />
                            <textarea
                                name="description"
                                cols="10"
                                row="10"
                                value={this.state.description}
                                onChange={this.onChange}
                                type="description"
                                className={"text-input-component"}
                                placeholder='Description'
                                required
                            />

                            <div onClick={this.handleForm.bind(this)}>
                                <Btn content="Create" slug={null} />
                            </div>

                            {!this.state.error.state ? '' :
                                <div className={'error-form'}>
                                    <p>{this.state.error.description}</p>
                                </div>
                            }
                        </form>
                    </div>

                }
            </div>
        )
    }
}