import { useEffect } from "react";

const PageHeader = (props) => {
    useEffect(() => {
        document.title = props.header;
    }, [props]);
    return <div
        style={{ fontFamily: 'verdana', fontSize: '20px', color: 'Highlight' }}
        className='pt-4 pb-4'>
        <strong>{props.header}</strong>
        <p className="invalid-feedback">{props.header}</p>
    </div>
}
export default PageHeader;