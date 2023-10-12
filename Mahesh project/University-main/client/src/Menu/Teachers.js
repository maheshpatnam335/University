import axios from "axios";
import { useEffect, useState } from "react";

const Teachers = () => {
    const [user, setUser] = useState(0);
    var logId = localStorage.getItem('login');
    useEffect(() => {
        axios.get(`https://localhost:44323/api/Register/Id?Id=${logId}`).then((res) => {
            setUser(res.data.roleId)
        })
    }, [])
    return <center>{user == 2 ? 
    <h1>Teachers</h1> 
    : <h1>You don't have permission for this page</h1>}</center>
}
export default Teachers;