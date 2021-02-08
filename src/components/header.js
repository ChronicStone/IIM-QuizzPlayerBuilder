import React from "react"
import "../scss/components/generic/header-component.scss"
import { HashLink as Link } from 'react-router-hash-link';
import { BrowserRouter as Router } from "react-router-dom";
import Btn from "./btn"


const LogInOut = ({history}) => {
    function LogOut() {
        localStorage.removeItem('player')
        history.push('/')
    }

    function LogIn() {
        history.push('/login')
    }

    return (
        <div>
            {
                localStorage.getItem('player') ?
                <button className="main-btn-component inverse" inverse={"True"} onClick={LogOut}>Logout</button> : 
                <button className="main-btn-component" onClick={LogIn}>Login</button>

            }
        </div>
    )
}

const MenuItem = ({history, location, slug, name}) => {
    console.log({location})
    function triggerRoute() {
        history.push(slug)
    }
    return (
        <div class={`menuItem ${slug === location.pathname ? 'active' : ''}`} onClick={triggerRoute}>{name}</div>

    )
}
export default class Header extends React.Component {

    logout() {
        localStorage.clear()
        this.props.history.push("/login")
    }

    componentDidMount() {
        console.log(this)
    }

    render() {
        return (
            <div className="header-component">
                <div className="blocLeft">
                    <MenuItem history={this.props.history} location={this.props.location} slug={'/'} name="Home" />
                    <MenuItem history={this.props.history} location={this.props.location} slug={'/quizz/list'} name="Quizz list" />
                    <MenuItem history={this.props.history} location={this.props.location} slug={'/quizz/editor'} name="Quizz editor" />
                </div>
                <div className="rightBloc">
                    <LogInOut history={this.props.history} />
                </div>
            </div>
        )
    }
}