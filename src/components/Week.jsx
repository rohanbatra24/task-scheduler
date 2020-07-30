import React from 'react';

import moment from 'moment';

import Day from './Day';

export default function Week(props) {
	const getBookingsForDay = (day) => {
		const bookings = [];

		for (let booking of props.bookings) {
			if (booking.day === day) {
				bookings.push(booking);
			}
		}
		return bookings;
	};

	return (
		<div className="schedule d-flex">
			{moment.weekdays().map((day, i) => {
				return (
					<div key={i}>
						<h3>{day}</h3>
						<Day
							day={day}
							bookings={getBookingsForDay(day)}
							appointments={props.appointments}
							setState={props.setState}
							state={props.state}
							setModalShow={props.setModalShow}
						/>
					</div>
				);
			})}
		</div>
	);
}
