import React  from "react"
import "../../scss/components/quizz/quizz-card-component.scss"
import axios from "../../_helpers/axios"
import Btn from "../btn"


const QuizzCard = ({quizzData}) => {
    return (
        <div className="quizzCard" style={{background: "#fff"}}>   
            <h3 className="title">{quizzData.title}</h3>
            <hr style={{opacity: .3, backgroundColor: "lightgrey"}}/>
            <p className="description">{quizzData.description}</p>
            <div style={{display:"grid", placeItems: "center", width: "100%"}}>
                <Btn content="QUIZZ DETAILS"  slug={`/quizz/details/${quizzData.id}`}/>
            </div>
        </div>
    )
}

class QuizzCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            quizzList: []
        }
    }

    componentDidMount() {
        console.log("I will get called once the page gets loaded");
        this.setState({...this.state, isFetching: true});
        axios.get('/quizz')
        .then(response => {
            console.log(response)
            this.setState({quizzList: response.data.data, isFetching: false});
        }).catch((err) => {
            console.error(err)
            this.setState({...this.state, isFetching: false});
        })
    }

    render() {
        return(
            <div>
                {this.state.isFetching ? 
                    <p>'Fetching quizz list ...'</p> :
                    <div className="quizzListGrid">
                        {this.state.quizzList.map((quizz, key) => {
                            return (<QuizzCard key={key} quizzData={quizz}/>)
                        })}
                    </div>
                }    
            </div>
        );
    }
}

export default QuizzCardList;
