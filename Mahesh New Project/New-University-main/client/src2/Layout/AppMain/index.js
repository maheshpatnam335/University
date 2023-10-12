import { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


// const Components = lazy(() => import('../../Components'));
const Menu = lazy(() => import('../../Menu'));
const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));


const AppMain = () => {
    return <Fragment>
        <Suspense fallback={
            <div className='loader-container'>
                <div className='loader-container inner'>
                    <h6>Please wait while we loading</h6>
                </div>
            </div>
        }>
            <Route path='/Menu' component={Menu} />
        </Suspense>
        <Suspense fallback={
            <div className="loader-container">
                <div className="loader-container-inner">
                    <h6 className="mt-3">
                        Please wait while we load all the Dashboards examples
                        <small>Because this is a demonstration, we load at once all the Dashboards examples. This wouldn't happen in a real live app!</small>
                    </h6>
                </div>
            </div>
        }>
            <Route path="/Dashboard" component={Dashboards} />
        </Suspense>
        <Route exact path="/" render={() => (
            <Redirect to="/Dashboard" />
        )} />
        <ToastContainer />
    </Fragment>
}
export default AppMain;