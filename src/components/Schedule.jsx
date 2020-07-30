import React, { useState } from 'react';
import Week from './Week';
import BookingModal from './BookingModal';
import Header from './Header';
import Ylabels from './Y-labels';
import './scheduler.css';

const appointments = require('../dummyData.js');

export default function TestCalendar2() {
	const [ state, setState ] = useState({
		week         : 1,
		driver       : 'Bob',
		appointments : appointments.default
	});

	const [ modalShow, setModalShow ] = useState(false);

	const getBookingsForWeek = (week, driver) => {
		const bookings = [];

		for (let booking of state.appointments) {
			if (parseInt(booking.week) === parseInt(week) && booking.driver === driver) {
				bookings.push(booking);
			}
		}

		return bookings;
	};

	return (
		<div className="d-flex justify-content-center flex-column">
			<Header state={state} setModalShow={setModalShow} setState={setState} />
			<div className="d-flex">
				<Ylabels />
				<BookingModal
					setState={setState}
					setModalShow={setModalShow}
					modalShow={modalShow}
					driver={state.driver}
					appointments={state.appointments}
					state={state}
				/>
				<div>
					<Week
						week={state.week}
						bookings={getBookingsForWeek(state.week, state.driver)}
						appointments={state.appointments}
						setState={setState}
						state={state}
						setModalShow={setModalShow}
						modalShow={modalShow}
					/>
				</div>
			</div>
		</div>
	);
}
