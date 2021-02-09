import React from "react";
import "../../scss/components/generic/form-component.scss";
import "../../scss/components/quizz/quizz-form-component.scss";
import Btn from "../btn";
import axios from "../../_helpers/axios"

export default class QuizzForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            title: "",
            description: "",
            playerId: "",
            error: {
                state:"false",
                description : ""
            }
        }
    }

    toggle() {
        this.setState(state => ({
          active: !state.active
        }));
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleForm = (e) => {
        e.preventDefault()
        const {title, description} = this.state
        const playerId = JSON.parse(localStorage.getItem('player')).player.id
        axios.post("/quizz/create", {title, description, playerId})
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    this.props.history.push("/")    
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
                <div onClick={this.toggle.bind(this)}>
                    <Btn content={'Create quizz'} slug={null} />
                </div>
                <div className={this.state.active ? 'quizz-from-component active ' : 'quizz-form-component'}>
                    <form className={'contain'}>
                    <h3 style={{ fontSize: "20px", color: "#500ad2" }}>Create your quizz</h3>
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
           </div>
        )
    }
}