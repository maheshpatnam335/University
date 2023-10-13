import React, { Component, Fragment } from 'react';
import MetisMenu from 'react-metismenu';
import { withRouter } from 'react-router-dom';
import { ComponentsNav } from './NavItems';

class Nav extends Component {
    state = {};
    render() {
        return (
            <Fragment>
                <MetisMenu content={ComponentsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
              </Fragment>
        );
    }
    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);