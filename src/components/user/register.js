import React from "react";
import "../../scss/components/user/login-component.scss";
import "../../scss/components/generic/form-component.scss";
import "../../scss/components/generic/file-input-component.scss";
import Btn from "../btn";
import axios from "axios"
import md5 from "md5";

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            avatar: "",
            success: false,
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
        if (e.target.name !== 'avatar') this.setState({ [e.target.name]: e.target.value });
        else this.setState({ avatar: e.target.files[0] })
    }

    test(base) {
        console.log(base)
        this.setState = {
            avatar: base
        }
    }

    getBase64(file) {
        let reader = new FileReader();
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file)
        }
        else {
            this.setState({
                error: {
                    state: false,
                    description: "Avatar is not a valid file"
                }
            })
        }
        return new Promise((reslove, reject) => {
            reader.onload = () => reslove(reader.result);
            reader.onerror = (error) => reject(error);
        })
    }

    async handleForm(e) {
        e.preventDefault()
        const username = this.state.username
        const password = md5(this.state.password)
        let avatar = await this.getBase64(this.state.avatar);
        console.log({ username, password, avatar })
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }
        };
        axios.post(`${process.env.REACT_APP_QUIZZ_API}/player/create`, { username, password, avatar }, config)
            .then((res) => {
                console.log(res)
                if (res.data.success) this.setState({success: true})
                else this.setState({
                    error: {
                        state: true,
                        description: "Username not available"
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    showMissFields() {
        let fields = []
        if(!this.state.username) fields.push('Username')
        if(!this.state.password) fields.push('Password')
        if(!this.state.username) fields.push('Avatar')
        return fields.join(', ')
    }

    render() {
        return (
            <div className={'contain'}>
                <h3 style={{fontSize: "20px", color: "#500ad2"}}>Sign-in form</h3> 
                <form className={'form-component'}>
                    
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <input
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                            type="text"
                            className={"text-input-component"}
                            placeholder="Username"
                            required
                        />
                        <img style={{height: "30px", width: "30px", marginLeft: "10px"}} src={this.state.username === "" ? 'https://www.flaticon.com/svg/vstatic/svg/1828/1828843.svg?token=exp=1612789934~hmac=8c8ee0bc37b178912a1d39dd387a8b94' : 'https://www.flaticon.com/svg/vstatic/svg/845/845646.svg?token=exp=1612789916~hmac=1edce27864222e3bc7e693f559f95127'} alt="confirm icon" />
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <input
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            type="password"
                            className={"text-input-component"}
                            placeholder='Password'
                            required
                        />
                        <img style={{height: "30px", width: "30px", marginLeft: "10px"}} src={this.state.password === "" || this.state.password != this.state.confirmPassword ? 'https://www.flaticon.com/svg/vstatic/svg/1828/1828843.svg?token=exp=1612789934~hmac=8c8ee0bc37b178912a1d39dd387a8b94' : 'https://www.flaticon.com/svg/vstatic/svg/845/845646.svg?token=exp=1612789916~hmac=1edce27864222e3bc7e693f559f95127'} alt="confirm icon" />
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <input
                            name="confirmPassword"
                            value={this.state.passwordConfirm}
                            onChange={this.onChange}
                            type="password"
                            className={"text-input-component"}
                            placeholder='Confirm password'
                            required
                        />
                        <img style={{height: "30px", width: "30px", marginLeft: "10px"}} src={this.state.confirmPassword === "" || this.state.password != this.state.confirmPassword ? 'https://www.flaticon.com/svg/vstatic/svg/1828/1828843.svg?token=exp=1612789934~hmac=8c8ee0bc37b178912a1d39dd387a8b94' : 'https://www.flaticon.com/svg/vstatic/svg/845/845646.svg?token=exp=1612789916~hmac=1edce27864222e3bc7e693f559f95127'} alt="confirm icon" />
                    </div>

                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div className="box" style={{marginBottom: "10px"}}>
                            <input onChange={this.onChange} type="file" name="avatar" id="file-2" className="inputfile inputfile-2" data-multiple-caption="{count} files selected" multiple />
                            <label htmlFor="file-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> 
                                <span>{this.state.avatar ? this.state.avatar.name : 'Choose a file'}</span>
                            </label>
                        </div>
                        <img style={{height: "30px", width: "30px", marginLeft: "10px", marginBottom: "10px"}} src={!this.state.avatar ? 'https://www.flaticon.com/svg/vstatic/svg/1828/1828843.svg?token=exp=1612789934~hmac=8c8ee0bc37b178912a1d39dd387a8b94' : 'https://www.flaticon.com/svg/vstatic/svg/845/845646.svg?token=exp=1612789916~hmac=1edce27864222e3bc7e693f559f95127'}/>
                    </div>

                    

                    <div onClick={this.handleForm.bind(this)}>
                        <Btn content="Sign in" slug={null} />
                    </div>

                    {!this.state.error.state ? '' : 
                        <div style={{marginTop: "20px", color: "#fff", background: "#F5462E", padding: "1em", borderRadius: "7px"}}>
                            {this.state.error.description}
                        </div>
                    }

                    {!this.state.success ? '' : 
                        <div style={{marginTop: "20px", color: "#fff", background: "#24D642", padding: "1em", borderRadius: "7px"}}>
                            Account successfuly created !
                        </div>
                    }
                </form>
            </div>
        )
    }
}