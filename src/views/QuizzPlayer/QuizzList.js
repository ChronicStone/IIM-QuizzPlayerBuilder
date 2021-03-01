import React from "react"
import QuizzCardList from "../../components/QuizzPlayer/QuizzCardList";
import QuizzForm from "../../components/QuizzEditor/QuizzForm";

export default class QuizzList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            titleFilter: ""
        }

    }
    componentDidMount() {
        if(!localStorage.getItem('player')) this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <div style={{marginTop: '-50px', marginBottom: "20px", background: "#500ad2", padding: "1.2em", borderRadius: '15px', boxShadow: "3px 3px 20px rgba(0,0,0,.1)"}}>
                    <div style={{padding: "1em", borderRadius: '10px', boxShadow: "3px 3px 20px rgba(0,0,0,.1)", background: "#fff", color: "#500ad2"}}>
                        <h2 style={{padding: 0, margin: 0, color: "#500ad2", fontSize: "25px"}}>Welcome to the Quizz section !</h2>
                   </div>
                   <h3 style={{margin: 0, marginTop: "10px", marginLeft: ".5em", color: "#fff", fontSize: "21px"}}>From here, you will be able to play quizz created by other players. </h3>
                </div>
                <div style={{background: "#500ad2", padding: "1.2em", borderRadius: '15px', boxShadow: "3px 3px 20px rgba(0,0,0,.1)"}}>
                    <div style={{marginBottom: "20px", padding: "1em", borderRadius: '10px', boxShadow: "3px 3px 20px rgba(0,0,0,.1)", background: "#fff", color: "#500ad2"}}>
                        <input ref={(ref) => this.titleFilter = ref} 
                            style={{width: "auto"}}
                            name="title"
                            value={this.state.titleFilter}
                            onChange={(e) => {this.setState({titleFilter: e.target.value})}}
                            type="text"
                            className={"text-input-component"}
                            placeholder='Search quizz'
                            required 
                        />
                    </div>
                    <QuizzCardList history={this.props.history} searchFilter={this.state.titleFilter}/>
                </div>
            </div>
        )
    }
}