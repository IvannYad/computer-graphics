import FRONTEND_ROUTES from "../../common/constants/frontend-routes.constants"
import "./MainHeader.scss"

export default function MainHeader(){
    return (
        <header>
            <a href={FRONTEND_ROUTES.BASE} >Laboatory works on Computer Graphics</a>
            <i className="bi bi-list"></i>
        </header>
    )   
}