import React  from "react"
import "../../scss/components/quizz/quizz-card-component.scss"
import api from "../../_helpers/axios"
import Btn from "../btn"
import Tooltip from "../tooltip"

const QuizzCard = ({quizzData, history}) => {
    return (
        <div className="quizzCard" style={{background: "#fff"}}>   
            <div className="titleBloc">
                <h3 className="title">{quizzData.title}</h3>
                <Tooltip label={(<div style={{width: "100%", textAlign: "center"}}>Created by <span style={{fontWeight: "bold"}}>{quizzData.player.username}</span></div>)}>
                    <img onClick={() => {history.push(`/player/profile/${quizzData.player.id}`)}} className="avatar" src={process.env.REACT_APP_S3_BUCKET_URL + quizzData.player.avatar}/>
                </Tooltip>
            </div>
            <div>
            </div>
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
        console.log(this)
        this.setState({...this.state, isFetching: true});
        api.get('/quizz')
        .then(response => {
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
                        {this.state.quizzList.filter(quizz => quizz.title.toLowerCase().includes(this.props.searchFilter.toLowerCase())).map((quizz, key) => {
                            return (<QuizzCard history={this.props.history} key={key} quizzData={quizz}/>)
                        })}
                    </div>
                }    
            </div>
        );
    }
}

export default QuizzCardList;
