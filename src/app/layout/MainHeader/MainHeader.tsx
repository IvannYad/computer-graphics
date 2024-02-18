import FRONTEND_ROUTES from "../../common/constants/frontend-routes.constants"
import "./MainHeader.scss"

export default function MainHeader(){
    return (
        <header>
            <a href={FRONTEND_ROUTES.BASE} >Laboratory works on Computer Graphics</a>
        </header>
    )   
}