import { Fragment } from "react";
import { Route } from "react-router-dom";
import AppHeader from "../Layout/AppHeader";
import AppSidebar from "../Layout/AppSidebar";
import AttendanceList from "./Attendance/AttendanceList";
import CheckAttendance from "./Attendance/CheckAttendance";
import ImportAttendance from "./Attendance/ImportAttendance";
import Contact from "./Contact/Contact";
import Examination from "./Examination/Examination";
import Library from "./Library/Library";
import CheckResults from "./Results/CheckResults";
import ImportResults from "./Results/Results";
import CheckStatus from "./Scholarship/CheckStatus";
import ImportScholarship from "./Scholarship/ImportScholarship";
import Sports from "./Sports/Sports";
import AddStudent from "./Student/AddStudents";
import Main from "./Student/AddStudents";
import Import from "./Student/ImportStudents";
import Students from "./Student/Students";
import AddTeacher from "./Teacher/AddTeacher";
import ImportTeachers from "./Teacher/Import";
import Teachers from "./Teacher/Teachers";
import GetDataTable from "../Components/GetTableData"
import ImportBooks from "./Library/ImportBooks";
import Events from "./Events/Events";
import AddEvents from "./Events/AddEvents";
import Chat from "./Contact/Chat";
import PastEvents from "./Events/PastEvents";
import AddSports from "./Sports/AddSports";
import Loading from "./domain/Loading";

const Menu = ({ match }) => {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Route path={`${match.url}/Contact`} component={Contact} exact />
            <Route path={`${match.url}/Events/UpComingEvents`} component={Events} exact />
            <Route path={`${match.url}/Events/AddEvents`} component={AddEvents} exact />
            <Route path={`${match.url}/Events/PastEvents`} component={PastEvents} exact />
            <Route path={`${match.url}/Examination`} component={Examination} exact />
            <Route path={`${match.url}/Library`} component={Library} exact />
            <Route path={`${match.url}/Library/ImportBooks`} component={ImportBooks} exact />
            <Route path={`${match.url}/Results/ImportResults`} component={ImportResults} exact />
            <Route path={`${match.url}/Results/CheckResults`} component={CheckResults} exact />
            <Route path={`${match.url}/Sports`} component={Sports} exact />
            <Route path={`${match.url}/AddSports`} component={AddSports} exact />
            <Route path={`${match.url}/Students`} component={Students} exact />
            <Route path={`${match.url}/Student/AddStudent`} component={AddStudent} exact />
            <Route path={`${match.url}/Student/ImportStudents`} component={Import} exact />
            <Route path={`${match.url}/Toast`} component={Main} exact />
            <Route path={`${match.url}/Teachers`} component={Teachers} exact />
            <Route path={`${match.url}/Teachers/AddTeacher`} component={AddTeacher} exact />
            <Route path={`${match.url}/Teachers/ImportTeachers`} component={ImportTeachers} exact />
            <Route path={`${match.url}/ImportAttendance`} component={ImportAttendance} exact />
            <Route path={`${match.url}/CheckAttendance`} component={CheckAttendance} exact />
            <Route path={`${match.url}/AttendanceList`} component={AttendanceList} exact />
            <Route path={`${match.url}/ScholarShipStatus`} component={CheckStatus} exact />
            <Route path={`${match.url}/ImportScholarShip`} component={ImportScholarship} exact />
            <Route path={`${match.url}/Table`} component={GetDataTable} exact />
            <Route path={`${match.url}/Contact/Chat`} component={Chat} exact />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Menu;
