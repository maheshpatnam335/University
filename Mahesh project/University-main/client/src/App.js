import { HashRouter, Route, Switch } from "react-router-dom";
import SweetAlerts from "./Components/SweetAlert";
import Toast from "./Components/TestToast";
import Login from "./LoginComponents/Login";
import Register from "./LoginComponents/Register";
import Contact from "./Menu/Contact";
import Events from "./Menu/Events";
import Examination from "./Menu/Examination";
import Library from "./Menu/Library";
import Navbar from "./Menu/Navbar";
import Results from "./Menu/Results";
import Sports from "./Menu/Sports";
import Students from "./Menu/Students";
import Teachers from "./Menu/Teachers";

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/Register' exact component={Register} />
          {/* <Route path='/TestToast' exact component={Toast} /> */}
          {/* <Route path='/SweetAlert' exact component={SweetAlerts} /> */}
          <Route path='/Dashboard' exact component={Navbar} />
          <Route path='/Results' exact component={Results} />
          <Route path='/Students' exact component={Students} />
          <Route path='/Teachers' exact component={Teachers} />
          <Route path='/Library' exact component={Library} />
          <Route path='/Examination' exact component={Examination} />
          <Route path='/Events' exact component={Events} />
          <Route path='/Sports' exact component={Sports} />
          <Route path='/Contact' exact component={Contact} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
