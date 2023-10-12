import { Fragment } from "react"
import { Route } from "react-router-dom"
import AppHeader from "../Layout/AppHeader"
import AppSidebar from "../Layout/AppSidebar"
import Contact from "./Contact/Contact"
import Events from "./Events/Events"
import Examination from "./Examination/Examination"
import Library from "./Library/Library"
import Results from "./Results/Results"
import Sports from "./Sports/Sports"
import AddStudent from "./Student/AddStudents"
import Main from "./Student/AddStudents"
import Students from "./Student/Students"
import AddTeacher from "./Teacher/AddTeacher"
import Teachers from "./Teacher/Teachers"

const Menu = ({ match }) => {
    return <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/Contact`} component={Contact} exact />
                    <Route path={`${match.url}/Events`} component={Events} exact />
                    <Route path={`${match.url}/Examination`} component={Examination} exact />
                    <Route path={`${match.url}/Library`} component={Library} exact />
                    <Route path={`${match.url}/Results`} component={Results} exact />
                    <Route path={`${match.url}/Sports`} component={Sports} exact />
                    <Route path={`${match.url}/Students`} component={Students} exact />
                    <Route path={`${match.url}/Student/AddStudent`} component={AddStudent} exact />
                    <Route path={`${match.url}/Toast`} component={Main} exact />
                    <Route path={`${match.url}/Teachers`} component={Teachers} exact />
                    <Route path={`${match.url}/Teachers/AddTeacher`} component={AddTeacher} exact />
                </div>
            </div>
        </div>
    </Fragment>
}
export default Menu;