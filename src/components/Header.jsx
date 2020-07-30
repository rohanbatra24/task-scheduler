import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import ExcelDownload from './ExcelDownload';

export default function Header(props) {
	const handleWeekSelect = (e) => {
		props.setState({ ...props.state, week: e });
	};

	const weeks = [];

	for (let i = 1; i <= 52; i++) {
		weeks.push(
			<Dropdown.Item key={i} eventKey={i}>
				{i}
			</Dropdown.Item>
		);
	}

	const handleDriverSelect = (e) => {
		props.setState({ ...props.state, driver: e });
	};

	return (
		<header className="d-flex justify-content-around">
			<div className="driver-container d-flex flex-column align-items-center">
				<label>Driver</label>
				<DropdownButton
					className="p-2"
					id="dropdown-basic-button"
					title={props.state.driver}
					onSelect={handleDriverSelect}
				>
					<Dropdown.Item eventKey="Bob">Bob</Dropdown.Item>
					<Dropdown.Item eventKey="Sarah">Sarah</Dropdown.Item>
					<Dropdown.Item eventKey="James">James</Dropdown.Item>
				</DropdownButton>
			</div>
			<button className="btn btn-success btn-new-apt" onClick={() => props.setModalShow(true)}>
				New Appointment
			</button>
			<div className="week-dropdown d-flex flex-column align-items-center">
				<label>Week</label>
				<DropdownButton
					className="p-2"
					id="dropdown-basic-button"
					title={props.state.week}
					onSelect={handleWeekSelect}
				>
					{weeks}
				</DropdownButton>
			</div>

			<ExcelDownload appointments={props.state.appointments} driver={props.state.driver} />
		</header>
	);
}
