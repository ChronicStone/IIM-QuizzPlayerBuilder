import React from "react";
import "../../scss/components/user/login-component.scss";
import "../../scss/components/generic/form-component.scss";
import TextInput from "../textInput";
import Btn from "../btn";
import axios from "axios"
import md5 from "md5";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            error: {
                state: false,
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
        const username = this.state.username
        const password = md5(this.state.password)
        axios.post(`${process.env.REACT_APP_QUIZZ_API}/player/auth`, { username, password })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    localStorage.setItem('player', JSON.stringify({ accessToken: res.data.accessToken, player: res.data.player }))
                    this.props.history.push('/quizz/list')
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
            <div className={'contain'}>
                <h3 style={{ fontSize: "20px", color: "#500ad2" }}>Log-in form</h3>
                <form className={'form-component'}>
                    <input ref={(ref) => this.username = ref}
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        className={"text-input-component"}
                        placeholder="Username"
                        required
                    />
                    <input ref={(ref) => this.mdp = ref}
                        name="password"
                        value={this.state.mdp}
                        onChange={this.onChange}
                        type="password"
                        className={"text-input-component"}
                        placeholder='Password'
                        required
                    />

                    <div onClick={this.handleForm.bind(this)}>
                        <Btn content="Login" slug={null} />
                    </div>

                    {!this.state.error.state ? '' :
                        <div className={"error-form"}>
                          <p>  {this.state.error.description}</p>
                        </div>
                    }
                </form>
            </div>
        )
    }
}