import './scss/helpers/_variables.scss'
import './scss/views/container-component.scss'
import Routeur from "./routes/Routeur"
import Header from "./components/header"
import { useHistory } from "react-router-dom";


export default function App() {
  let history = useHistory();
  return (
   <div className="container">
     <Routeur />
   </div>
  );
}