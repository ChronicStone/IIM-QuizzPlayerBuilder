import "../scss/components/generic/btn-component.scss"
import { HashLink as Link } from 'react-router-hash-link';

function Btn({content, inverse, slug}){
    return (
        <div>
            {slug !== null ? 
                <Link className={ inverse ? "main-btn-component inverse" : "main-btn-component"} to={slug}>
                  {content}
                </Link>
            :
                <button className={ inverse ? "main-btn-component inverse" : "main-btn-component"}>
                    {content}
                </button>
            }
        </div>
    )
}

export default Btn;