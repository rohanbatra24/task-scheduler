import React, { useState, Fragment } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import getRandomColor from '../helpers.js';

const uniqid = require('uniqid');

const format = 'hh a'; // format for momentJS time

export default function NewBookingModal(props) {
	const [ task, setTask ] = useState('Pick Up');
	const [ duration, setDuration ] = useState(1);
	const [ location, setLocation ] = useState('Warehouse');
	const [ time, setTime ] = useState('1 pm');
	const [ week, setWeek ] = useState(1);
	const [ day, setDay ] = useState('Monday');
	const [ driver, setDriver ] = useState('Bob');
	const [ overwriteMsg, setOverwriteMsg ] = useState(false);
	const [ overwriteId, setOverwriteId ] = useState('');
	const [ durationWarningMsg, setDurationWarningMsg ] = useState(false);
	const [ spilloverWarningMsg, setSpilloverWarningMsg ] = useState(false);

	const onBook = (time, week, day, task, duration, driver, location) => {
		const appointmentsCopy1 = [ ...props.appointments ];

		if (duration > 24) {
			setDurationWarningMsg(true);
			return;
		}

		if (moment(time, format).date() !== moment(time, format).add(duration - 1, 'hours').date()) {
			setSpilloverWarningMsg(true);
			return;
		}

		const filtered = props.edit
			? appointmentsCopy1.filter((booking) => {
					return props.booking.id !== booking.id;
				})
			: appointmentsCopy1;

		const color = getRandomColor();
		const id = uniqid(); //generate unique ID

		for (let booking of filtered) {
			if (
				booking.start.isBetween(
					moment(time, format),
					moment(time, format).add(duration, 'hours'),
					'hour',
					'[)'
				) &&
				parseInt(week) === parseInt(booking.week) &&
				driver === booking.driver &&
				day === booking.day
			) {
				setOverwriteId(booking.id);
				setOverwriteMsg(true);
				return;
			}
		}

		const newApt = {
			id          : id,
			week        : week,
			day         : day,
			start       : moment(time, format),
			end         : moment(time, format).add(duration, 'hours'),
			duration    : duration,
			driver      : driver,
			task        : task,
			color       : color,
			bookingHead : true,
			location    : location
		};

		const blockedSlots = [];

		for (let i = 1; i < duration; i++) {
			blockedSlots.push({
				id          : id,
				week        : week,
				day         : day,
				start       : moment(time, format).add(i, 'hours'),
				end         : moment(time, format).add(i + 1, 'hours'),
				duration    : 1,
				driver      : driver,
				task        : task,
				color       : color,
				bookingHead : false,
				location    : location
			});
		}

		const appointmentsCopy2 = [ ...filtered, newApt ].concat(blockedSlots);

		props.setState({ ...props.state, appointments: appointmentsCopy2 });
		props.setModalShow(false);
	};

	const confirmOverwriteBooking = (time, week, day, task, duration, driver, location) => {
		setOverwriteMsg(false);
		const appointmentsCopy = [ ...props.appointments ];

		const filtered = appointmentsCopy.filter((app) => {
			return app.id !== overwriteId;
		});

		const id = uniqid();
		const color = getRandomColor();

		const newApt = {
			id          : id,
			week        : week,
			day         : day,
			start       : moment(time, format),
			end         : moment(time, format).add(duration, 'hours'),
			duration    : duration,
			driver      : driver,
			task        : task,
			color       : color,
			bookingHead : true,
			location    : location
		};

		const blockedSlots = [];

		for (let i = 1; i < duration; i++) {
			blockedSlots.push({
				id          : id,
				week        : week,
				day         : day,
				start       : moment(time, format).add(i, 'hours'),
				end         : moment(time, format).add(i + 1, 'hours'),
				duration    : 1,
				driver      : driver,
				task        : task,
				color       : color,
				bookingHead : false,
				location    : location
			});
		}

		const appointments = [ ...filtered, newApt ].concat(blockedSlots);

		props.setState({ ...props.state, appointments: appointments });
		props.setModalShow(false);
	};

	return (
		<Modal
			show={props.modalShow}
			onHide={() => {
				setOverwriteMsg(false);
				setDurationWarningMsg(false);
				setSpilloverWarningMsg(false);
				props.setModalShow(false);
			}}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{props.edit ? 'Edit appointment' : 'Book a new appointment'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex flex-column">
				{overwriteMsg ? (
					<div className="warning">
						<p>Want to overwite existing booking?</p>
						<button
							onClick={() => confirmOverwriteBooking(time, week, day, task, duration, driver, location)}
						>
							Yes
						</button>
						<button onClick={() => setOverwriteMsg(false)}>No</button>
					</div>
				) : (
					''
				)}
				{durationWarningMsg ? (
					<div className="warning">
						<p>Task duration cannot be more than 24 hours</p>
					</div>
				) : (
					''
				)}
				{spilloverWarningMsg ? (
					<div className="warning">
						<p>Task cannot spill over to the next day</p>
					</div>
				) : (
					''
				)}
				{props.edit && (time === '' || day === '' || task === '' || duration === '' || location === '') ? (
					<div className="warning">
						<p>Please fill out all fields</p>
					</div>
				) : (
					''
				)}

				{!props.edit &&
				(time === '' ||
					day === '' ||
					task === '' ||
					duration === '' ||
					location === '' ||
					driver === '' ||
					week === '') ? (
					<div className="warning">
						<p>Please fill out all fields</p>
					</div>
				) : (
					''
				)}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onBook(time, week, day, task, duration, driver, location);
					}}
					className="d-flex flex-column"
				>
					{!props.edit ? (
						<Fragment>
							<label htmlFor="driver">Driver</label>
							<select onChange={(e) => setDriver(e.target.value)} value={driver}>
								<option value="Bob">Bob</option>
								<option value="Sarah">Sarah</option>
								<option value="James">James</option>
							</select>
						</Fragment>
					) : (
						''
					)}

					<label htmlFor="task">Task</label>
					<select onChange={(e) => setTask(e.target.value)} value={task}>
						<option value="Pick Up">Pick Up</option>
						<option value="Drop Off">Drop Off</option>
						<option value="Other">Other</option>
					</select>
					<label htmlFor="duration">Duration (in hours)</label>
					<input
						type="text"
						name="duration"
						id=""
						value={duration}
						onChange={(e) => setDuration(e.target.value)}
						placeholder="Example: 4"
					/>
					<label htmlFor="location">Location</label>
					<input
						type="text"
						name="location"
						id=""
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						placeholder="Location"
					/>
					<label htmlFor="time">Time (Format: 4 pm or 10 am)</label>
					<input
						type="text"
						name="time"
						id=""
						value={time}
						onChange={(e) => setTime(e.target.value)}
						placeholder="Time"
					/>
					<label htmlFor="day">Choose Day</label>
					<select onChange={(e) => setDay(e.target.value)} value={day}>
						{moment.weekdays().map((weekday) => <option value={weekday}>{weekday}</option>)}
					</select>

					{!props.edit && (
						<Fragment>
							<label htmlFor="week">Week (Example: 5)</label>
							<input
								type="text"
								name="week"
								id=""
								value={week}
								onChange={(e) => setWeek(e.target.value)}
								placeholder="Week"
							/>
						</Fragment>
					)}

					<button
						type="submit"
						disabled={time === '' || day === '' || task === '' || duration === '' || location === ''}
						className="mt-4"
					>
						Save
					</button>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => {
						setOverwriteMsg(false);
						setDurationWarningMsg(false);
						setSpilloverWarningMsg(false);
						props.setModalShow(false);
					}}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
