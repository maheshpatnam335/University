import cx from 'classnames';
import React, { Component, Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
    setEnableMobileMenu
} from '../../reducers/ThemeOptions';
import Nav from '../AppNav/VerticalNavWrapper';


class AppSidebar extends Component {
    state = {};
    toggleMobileSidebar = () => {
        let { enableMobileMenu, setEnableMobileMenu } = this.props;
        setEnableMobileMenu(!enableMobileMenu);
    }
    render() {
        let {
            backgroundColor,
            enableBackgroundImage,
            enableSidebarShadow,
            backgroundImage,
            backgroundImageOpacity,
        } = this.props;

        return (
            <Fragment>
                <div className="sidebar-mobile-overlay" onClick={this.toggleMobileSidebar} />
                <TransitionGroup>
                    <CSSTransition
                        component="div"
                        className={cx("app-sidebar", 
                        backgroundColor,
                         { 'sidebar-shadow': enableSidebarShadow })}
                        appear={true} timeout={1500} enter={false} exit={false}>
                        <div>
                            <PerfectScrollbar>
                                <div className="app-sidebar__inner">
                                    <Nav />
                                </div>
                            </PerfectScrollbar>
                            <div
                                className={cx("app-sidebar-bg", backgroundImageOpacity)}
                                style={{
                                    backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
                                }}>
                            </div>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
    enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    backgroundColor: state.ThemeOptions.backgroundColor,
    backgroundImage: state.ThemeOptions.backgroundImage,
    backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
});

const mapDispatchToProps = dispatch => ({

    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);