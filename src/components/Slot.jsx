import React, { useState } from 'react';

import BookingModal from './BookingModal';

export default function Slot(props) {
	const [ modalShow, setModalShow ] = useState(false);

	const backgroundColor = props.booking.length ? props.booking[0].color : 'aliceblue';

	const handleEdit = () => {
		setModalShow(true);
	};

	const handleDelete = () => {
		const bookingsCopy = [ ...props.appointments ];

		const filtered = bookingsCopy.filter((booking) => {
			return booking.id !== props.booking[0].id;
		});

		props.setState({ ...props.state, appointments: filtered });
	};

	const renderSlotButtons = () => {
		if (props.booking[0] !== undefined && !props.booking[0].bookingHead) {
			return '';
		}
		else if (!props.booking.length) {
			return <i onClick={() => props.setModalShow(true)} className="fa fa-plus" aria-hidden="true" />;
		}
	};

	return (
		<div className="slot">
			<div
				style={{
					height          : '60px',
					width           : '150px',
					position        : 'absolute',
					backgroundColor : backgroundColor
				}}
				className="d-flex justify-contents-center"
			>
				{props.booking.length && props.booking[0].bookingHead ? (
					<div className="d-flex align-items-center flex-column booking-details-container">
						<div className="booking-details">
							<p className="m-1">Task: {props.booking[0].task}</p>
							<p className="m-1">Location: {props.booking[0].location}</p>
						</div>
						<div className="d-flex justify-flex-around align-items-center">
							<i onClick={handleEdit} className="fa fa-pencil-square-o m-1" aria-hidden="true" />
							<i onClick={handleDelete} className="fa fa-trash m-1" aria-hidden="true" />
						</div>
					</div>
				) : (
					''
				)}

				{renderSlotButtons()}
			</div>
			<BookingModal
				booking={props.booking[0]}
				setModalShow={setModalShow}
				modalShow={modalShow}
				appointments={props.appointments}
				setState={props.setState}
				edit={props.booking[0] ? true : false}
				state={props.state}
			/>
		</div>
	);
}
