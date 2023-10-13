import cx from 'classnames';
import moment from 'moment';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ResizeDetector from 'react-resize-detector';
import { Redirect, withRouter } from 'react-router-dom';
import AppMain from '../../Layout/AppMain';



class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             logId: localStorage.getItem('user'),
             expiry: moment(localStorage.getItem('refreshTokenExpiry')).format('D'),
             todayDate: moment().format('D')
        };
    }
    onResize = (width) => this.setState({ width });

    render() {
        const { width } = this.state;

        let {
            enableFixedHeader,
            enableFixedSidebar,
            enableClosedSidebar,
            closedSmallerSidebar,
            enableMobileMenu,
        } = this.props;
        return (
            <Fragment>
                {/* {(this.state.logId != null && (this.state.expiry == this.state.todayDate)) ? */}
                 <div className={cx(
                    { 'fixed-header': enableFixedHeader },
                    { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
                    { 'closed-sidebar': enableClosedSidebar || width < 1250 },
                    { 'closed-sidebar-mobile': closedSmallerSidebar || width < 1250 },
                    { 'sidebar-mobile-open': enableMobileMenu },
                )}>
                    <AppMain />
                    <ResizeDetector handleWidth onResize={this.onResize} />
                </div> 
                 {/* : <>
                    {this.state.expiry != this.state.todayDate ? localStorage.removeItem('jwtToken') : ''}
                    <Redirect to='/Login' /></> */}
                {/* }  */}
            </Fragment>
        )
    }
}

const mapStateToProp = state => ({
    enableFixedHeader: state.ThemeOptions.enableFixedHeader,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,

});

export default withRouter(connect(mapStateToProp)(Main));