
const PageHeader = (props) => {
    return <div style={{ fontFamily: 'verdana', fontSize: '20px', color: 'Highlight' }} className='pt-4 pb-4'>
        <strong>{props.header}</strong>
    </div>
}
export default PageHeader;