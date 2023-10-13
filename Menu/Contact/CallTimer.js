import React,{useState, useRef, useEffect} from 'react'

const CallTimer=()=>{
    const Ref = useRef(null);
	const [timer, setTimer] = useState('00:00:00');
    const getTime = (e) => {
		const total = Date.parse(new Date())-Date.parse(e) ;
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / 1000 / 60 / 60) % 24);
		return {
			total, hours, minutes, seconds
		};
	}
	const startTimer = (e) => {
		let { total, hours, minutes, seconds }
					= getTime(e);
		if (total) {
			setTimer(
				(hours > 9 ? hours : '0' + hours) + ':' +
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}
	}
	const Timer = (e) => {
		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000)
		Ref.current = id;
	}
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds());
        return deadline;
    }
	useEffect(() => {
		Timer(getDeadTime());
	}, []);
	return (
		<div>
			<h3>{timer}</h3>
		</div>
	)

}
export default CallTimer;