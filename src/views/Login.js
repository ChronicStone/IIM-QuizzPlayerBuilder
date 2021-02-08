import React from "react";
import {Helmet} from "react-helmet";
import "../scss/helpers/reset.scss";
import LoginForm from "../components/user/login"
import RegisterForm from "../components/user/register"
import Btn from "../components/btn";


export default class Login extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
          active: true,
      }
    }
    
    toggle() {
      this.setState(state => ({
        active: !state.active
      }));
  }

  renderComponent(){
      if(this.state.active) {
       return (
        <div>
          <LoginForm history={this.props.history} />
            <div className="contain col">
              <p>Or</p>
              <div onClick={this.toggle.bind(this)}>
                <Btn content={'Sign in'} slug={null}  />
              </div>
            </div>
      </div>
       )
      }
      else{
        return (
       <div>
          <RegisterForm history={this.props.history} />
           <div className="contain col">
              <p>Or</p>
              <div onClick={this.toggle.bind(this)}>
                  <Btn content={'Login'} slug={null}  />
              </div>
            </div>
       </div>
        )
      }
    }
  render() {
    const active = this.state.active;
    return (
      <div className="login">
        <Helmet>
            <html lang="en" />
            <title>Quiz Paul Santamaria</title>
            <meta name="description" content="Here is the quizz of Paul Santamaria" />
            <meta name="theme-color" content="#fff" /> 
        </Helmet>
        <div>
         {this.renderComponent()}
        </div>
      </div>
    )
  }
}