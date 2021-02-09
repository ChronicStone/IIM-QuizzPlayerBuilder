import React  from "react"
import "../../scss/components/quizz/quizz-card-component.scss"
import api from "../../_helpers/axios"
import Btn from "../btn"

const QuizzCard = ({quizzData}) => {
    return (
        <div className="quizzCard" style={{background: "#fff"}}>   
            <h3 className="title">{quizzData.title}</h3>
            <hr style={{opacity: .3, backgroundColor: "lightgrey"}}/>
            <p className="description">{quizzData.description}</p>
            <hr style={{opacity: .3, backgroundColor: "lightgrey"}}/>
            <div style={{display:"flex", gap: "1em", justifyContent: "center", width: "100%"}}>
                <Btn style={{margin: "30px"}} content="PLAY QUIZZ" inverse={"True"}  slug={`/quizz/details/${quizzData.id}`}/>
                <Btn content="EDIT QUIZZ"  slug={`/quizz/editor/${quizzData.id}`}/>
            </div>
        </div>
    )
}

class QuizzCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzList: []
        }
    }

    componentDidMount() {
        if(!localStorage.getItem('player')) this.props.history.push('/login')
        else api.get(`/player-quizz/${JSON.parse(localStorage.getItem('player')).player.id}`)
        .then((response) => {
            this.setState({quizzList: response.data.data})
        })
        .catch((err) => {
            console.error(err)
        })
    }

    render() {
        return(
            <div>
                <div style={{display: "flex", flexDirection: "column", gap: "1.2em"}}>
                    {this.state.quizzList.filter(quizz => quizz.title.toLowerCase().includes(this.props.searchFilter.toLowerCase())).map((quizz, key) => {
                        return (<QuizzCard key={key} quizzData={quizz}/>)
                    })}
                </div>
            </div>
        );
    }
}

export default QuizzCardList;
