import './scss/helpers/_variables.scss'
import './scss/views/container-component.scss'
import './scss/components/generic/toast-component.scss'
import Routeur from "./routes/Routeur"
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken"


export default function App() {
  let history = useHistory();
  return (
   <div className="container">
     <div className="alerts" id="alerts">
			</div>
     <Routeur />
   </div>
  );
}