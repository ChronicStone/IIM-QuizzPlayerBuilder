import './scss/helpers/_variables.scss'
import './scss/views/container-component.scss'
import './scss/components/generic/toast-component.scss'
import Routeur from "./routes/Routeur"
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken"


export default function App() {
  let history = useHistory();
  if(localStorage.getItem('player')) {
    let decoded = jwt.decode(JSON.parse(localStorage.getItem('player')).accessToken)
    console.log(decoded)
    const timestampNow = Date.now()
    const timestampExp = decoded.exp * 1000
    const diff = timestampExp - timestampNow

    if (diff < 0) {
        localStorage.removeItem('player')
        history.push('/login')
    }
  }
  return (
   <div className="container">
     <div className="alerts" id="alerts">
			</div>
     <Routeur />
   </div>
  );
}