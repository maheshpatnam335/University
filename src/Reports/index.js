import { Route } from "react-router-dom";
import AppHeader from "../Layout/AppHeader";
import AppSidebar from "../Layout/AppSidebar";
import Reports from "./Reports";

const Index = ({match}) => {
    return <div>

        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`}  component={Reports} exact/> 
                </div>
            </div>
        </div>
    </div>
}
export default Index;