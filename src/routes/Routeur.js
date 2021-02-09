import React from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";

import Header from "../components/header"
import index from "../views/index";
import login from "../views/Login";
import QuizzList from "../views/QuizzPlayer/QuizzList.js";
import QuizzDetails from "../views/QuizzPlayer/QuizzDetails.js";
import QuizzPlayer from "../views/QuizzPlayer/QuizzPlayer.js";
import QuizzResults from "../views/QuizzPlayer/QuizzResults.js";
import PlayerProfile from "../views/PlayerProfile.js";
import QuizzEditorList from "../views/QuizzEditor/QuizzList.js";
import QuizzEditor from "../views/QuizzEditor/QuizzEditor.js";

const Error404 = () => {
  return (
      <div style={{top: 0, left: 0, position: "fixed", width: "100%", height: "100vh", display: "grid", placeItems: "center", zIndex: -100}}>
          <img style={{height: "500px"}} src={window.location.origin + '/404.svg'} alt="err404"/>
      </div>
  )
}

export default class Routeur extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.history)
  }

  render() {
    const HeaderWithRouter = withRouter(Header);
    return (
      <BrowserRouter>
        <HeaderWithRouter/>
        <Switch>
          <Route exact path='/' component={withRouter(index)} />
          <Route exact path='/login' component={withRouter(login)} />
          <Route exact path='/quizz/list' component={withRouter(QuizzList)} />
          <Route exact path='/quizz/details/:quizzId' component={withRouter(QuizzDetails)} />
          <Route exact path='/quizz/player/:quizzId' component={withRouter(QuizzPlayer)} />
          <Route exact path='/quizz/results/:playerScoreId' component={withRouter(QuizzResults)} />
          <Route exact path='/player/profile/:playerId' component={withRouter(PlayerProfile)} />
          <Route exact path='/quizz/editor/' component={withRouter(QuizzEditorList)} />  
          <Route exact path='/quizz/editor/:quizzId' component={withRouter(QuizzEditor)} />  
          <Route path="*" component={Error404}/>
        </Switch>
      </BrowserRouter>
    )
  }
}