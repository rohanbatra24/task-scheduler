import React from 'react';
import Slot from './Slot';
import moment from 'moment';

export default function Day(props) {
	const getBookingForSlot = (time) => {
		const bookings = [];

		for (let booking of props.bookings) {
			if (booking.start._d.toString() === time._d.toString()) {
				bookings.push(booking);
			}
		}

		return bookings;
	};

	const format = 'hh a';
	var hoursPerDay = 24;
	var time = [];

	for (let i = 1; i < hoursPerDay + 1; i++) {
		//fill in all of the hours
		const formattedTime = moment().startOf('day').subtract(1, 'hours').add(i, 'hours').format('h a'); //give the time in format
		time.push(formattedTime);
	}

	return (
		<div className="d-flex">
			<div className="days d-flex flex-column" day={props.day}>
				{time.map((time, i) => (
					<Slot
						key={i}
						time={time}
						booking={getBookingForSlot(moment(time, format))}
						appointments={props.appointments}
						setState={props.setState}
						state={props.state}
						setModalShow={props.setModalShow}
						modalShow={props.modalShow}
					/>
				))}
			</div>
		</div>
	);
}
