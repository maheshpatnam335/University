import { Fragment } from "react";

const InputBox = (props) => {

    return <Fragment>
        <label>{props.label}</label>
        <input
            type={props.type ? props.type : "Text"}
            name={props.name}
            value={props.value}
            className='form-control'
            onChange={(e) => props.handleChange(e.target.name, e.target.value)}
            style={{ width: props.Width }}
            placeholder={props.placeholder ? props.placeholder : ''}
            disabled={props.disabled}
        />
    </Fragment>
}
export default InputBox;