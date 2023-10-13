import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

const SearchInput = () => {
    const [query, setQuery] = useState("")
    const history = useHistory()

    function onChange(e) {
        setQuery(e.target.value)
    }

    useEffect(() => {
        const params = new URLSearchParams()
        if (query) {
            //Append Method
            params.append("Zest", query)
            params.append("Test", query)

            //Entries method
            for (const [key, value] of params.entries(key, value)) {
                console.log("Entries Method :" + key + ", " + value)
            }
            for (const entry of params.entries()) {
                console.log("Entries Method(k,v) :" + entry)
            }

            //ForEach method
            params.forEach((Key, value) => {
                console.log("Foreach Method: " + Key, value)
            });

            //get Method
            console.log("Get Method :" + params.get("Test"))

            //getAll method
            console.log("get All :" + params.getAll("Test"))

            //has method
            console.log("Has :" + params.has('Test'))

            //set Method
            params.set("Test", "Mahesh")
            console.log("After set:" + params.getAll("Test"))

            //Sort Method
            params.sort();
            console.log("After Sort :" + params.toString())
            //Tostring method
            console.log("To String :" + params.toString())

            //keys method
            for (const key of params.keys()) {
                console.log("Keys method :" + key)
            }

            //values Method
            for (const value of params.values()) {
                console.log("Values Method :" + value)
            }
            console.log([...params])
        } else {
            params.delete("name")
        }
        history.push({ search: params.toString() })
    }, [query, history])

    return <input type="text" value={query} onChange={onChange} />
}

export default SearchInput


