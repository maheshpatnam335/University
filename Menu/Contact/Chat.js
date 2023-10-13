import EmojiPicker from "emoji-picker-react";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlinePaperClip } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';
import { IoMdDoneAll, IoMdSend } from 'react-icons/io';
import { HiDocument } from 'react-icons/hi'
import { BiMap } from 'react-icons/bi'
import { FiMusic } from 'react-icons/fi'
import { BsCardImage, BsFillCameraFill, BsFillPersonFill } from 'react-icons/bs'
import { CardBody, Col, Input, Modal, ModalBody, Row } from "reactstrap";
import PageHeader from "../../Components/PageHeader";
import { GetMethod } from '../../Services/MainService';

export const Message_Box = []

const Chat = () => {
    const [msg, setMsg] = useState('');
    const [emoji, setEmoji] = useState(false);
    const [docs, setDocs] = useState(false);
    var logId = localStorage.getItem('login');
    const [user, setUser] = useState({});

    useEffect(() => {
        GetMethod(`https://localhost:44323/api/Register/Id?Id=${logId}`).then((res) => {
            setUser(res.data);
        })
    }, [Message_Box, msg])

    const handleChange = (value) => {
        setMsg(value)
    }

    const sendMessage = (e) => {
        const data = {
            img: e && e.target.files.length > 0 && URL.createObjectURL(e.target.files[0]),
            msg: msg,
            time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(Date.now())
        }
        Message_Box.push(data)
        setMsg('')
    }

    const EmojiClick = (events) => {
        setMsg(msg + events.emoji)
        setEmoji(false)
    }

    const toggle = () => setDocs(!docs)
    return <Fragment>
        <PageHeader header="Chat us" />
        <CardBody>
            <CardBody className="vam-cardbody">
                <div className="txt-rt" >
                    <div className='box1 sb2'>
                        <p> Hi {user.firstName + " " + user.lastName}</p>
                        <p>My name is Mahesh</p>
                        <p>How can i help you</p>
                        <p>{new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(Date.now())}</p>
                    </div>
                    {Message_Box.map((i, j) => {
                        return <div className='box sb1' >
                            {i.img ? <>
                                <p><img src={i.img} width={'200px'} height="250px" /></p>
                                <p className="pt-2">{i.time}</p>
                            </> :
                                <>
                                    {i.msg} <IoMdDoneAll color="blue" />
                                    <p className="pt-2">{i.time}</p>
                                </>}
                        </div>
                    })}
                </div>
                {emoji && <div><EmojiPicker onEmojiClick={(e) => EmojiClick(e)} /> </div>}
            </CardBody>
            <CardBody style={{ display: 'flex', width: '75%', backgroundColor: 'white', position: 'fixed', bottom: 0 }}>
                <GrEmoji size={'35'} onClick={() => setEmoji(!emoji)} />
                <Input type='text' className="msg-input"
                    onChange={(e) => handleChange(e.target.value)} placeholder="Type a message" value={msg}
                    onKeyPress={(e) => { e.key === 'Enter' && sendMessage() }} />
                <div className="icons-inline">
                    <AiOutlinePaperClip size={'35'} onClick={() => setDocs(!docs)} />
                    <input type='file' id='uploaddoc' style={{ display: 'none' }} onChange={(e) => sendMessage(e)} />
                    <label htmlFor='uploaddoc'><AiOutlineCamera size={'35'} title="Camera" /></label>
                </div>
                {msg != '' ? <IoMdSend size={'40'} className='pl-05' onClick={() => sendMessage()} title="Send" /> : ''}
            </CardBody>
        </CardBody>
        <Modal isOpen={docs} toggle={toggle} style={{ marginTop: '35%', marginLeft: '75%', width: '15%' }}>
            <ModalBody>
                <Row>
                    <Col><HiDocument size={'30'} /></Col>
                    <Col><BsCardImage size={'30'} /></Col>
                    <Col><BsFillCameraFill size={'30'} /></Col>
                </Row>
                <Row className="pt-4">
                    <Col><FiMusic size={'30'} /></Col>
                    <Col><BsFillPersonFill size={'30'} /></Col>
                    <Col><BiMap size={'30'} /></Col>
                </Row>
            </ModalBody>
        </Modal>
    </Fragment>
}
export default Chat;