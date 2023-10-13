import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./Test";
import { columns } from "./Item";

function Item(props) {

  const [loading, setLoading] = useState(true)
  const [state, setState] = useState([])
  useEffect(() => {
    axios.get(`https://localhost:44323/api/Scholarship/List`).then((res) => {
      setState(res.data)
    })
    setLoading(false)
  }, [])
  return loading ? <h1>Loading...</h1> : <Pagination columns={columns} data={state} />
}
export default Item;
