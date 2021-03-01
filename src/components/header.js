import React from "react"
import "../scss/components/generic/header-component.scss";

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
    function triggerRoute() {
        history.push(slug)
    }
    return (
        <div className={`menuItem ${slug === location.pathname ? 'active' : ''}`} onClick={triggerRoute}>{name}</div>

    )
}
export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageYOffset: 0,
            showHeader: true
        }
    }
    logout() {
        localStorage.clear()
        this.props.history.push("/login")
    }

    componentDidMount(){
        window.addEventListener('scroll', (e) => {
            if(this.state.pageYOffset > window.pageYOffset )  this.setState({showHeader: true})
            else this.setState({showHeader: false})
            this.setState({pageYOffset: window.pageYOffset})
        })

        window.addEventListener('storage', () => {
            if(!localStorage.getItem('player')) this.props.history.push('/login')
          })
    }

    render() {
        return (
            <div className={`header-component ${this.state.showHeader || this.state.pageYOffset === 0 ? '' : 'hide'}`}>
                <div className={`blocLeft`}>
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