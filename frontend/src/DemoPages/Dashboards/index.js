import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import BasicDashboard from './Basic/';

const Dashboards = ({ match }) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={BasicDashboard} />
                </div>
            </div>
        </div>
    </Fragment>
);

export default Dashboards;