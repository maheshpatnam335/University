import React, { Fragment } from 'react'
import Tabs, { TabPane } from 'rc-tabs'
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import TabContent from "rc-tabs/lib/TabContent";
import PageHeader from '../../Components/PageHeader';
import { Card, CardBody } from 'reactstrap';
import CulturalEvents from './CulturalEvents';
import TechnicalEvents from './TechnicalEvents';
import FunEvents from './FunEvents';
import LiteraryEvents from './LiteraryFest';

function Events() {
    var callback = function (key) { };
    return (
        <Fragment>
            <PageHeader header="Events" />
            <Card className="fantasy">
                <CardBody >
                    <Tabs defaultActiveKey="1"
                        onChange={callback}
                        renderTabBar={() => <ScrollableInkTabBar />}
                        renderTabContent={() => <TabContent />}
                    >
                        <TabPane tab={<h4 className='text-decoration'>Cultural</h4>} key={'1'}><CulturalEvents /></TabPane>
                        <TabPane tab={<h4>Technical</h4>} key={'2'}><TechnicalEvents/></TabPane>
                        <TabPane tab={<h4>Fun</h4>} key={'3'}><FunEvents/></TabPane>
                        <TabPane tab={<h4>Literary</h4>} key={'4'}><LiteraryEvents/></TabPane>
                    </Tabs>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default Events