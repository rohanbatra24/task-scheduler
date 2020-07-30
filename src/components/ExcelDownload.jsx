import React, { useState } from 'react';

import moment from 'moment';
import ReactExport from 'react-export-excel';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExcelDownload(props) {
	const [ interval, setInterval ] = useState(2);

	const excel = [];

	let currRowStart = 1;

	for (let i = 1; i <= 364; i += interval) {
		excel.push({
			TimeFrame : `Day ${currRowStart} - Day ${currRowStart + interval}`,
			PickUp    : 0,
			DropOff   : 0,
			Other     : 0
		});
		currRowStart += interval;
	}

	props.appointments.forEach((app) => {
		const position = (app.week - 1) * 7 + moment.weekdays().indexOf(app.day) + 1;

		if (app.bookingHead && app.driver === props.driver) {
			excel.forEach((row) => {
				const numbers = row.TimeFrame.match(/\d+/g).map(Number);

				if (position >= numbers[0] && position < numbers[1]) {
					if (app.task === 'Pick Up') {
						row.PickUp++;
					}
					else if (app.task === 'Drop Off') {
						row.DropOff++;
					}
					else if (app.task === 'Other') {
						row.Other++;
					}
				}
			});
		}
	});
	return (
		<div className="d-flex flex-column align-items-center">
			<DropdownButton
				className="p-2"
				id="dropdown-basic-button"
				title={`${interval} days`}
				onSelect={(e) => setInterval(parseInt(e))}
			>
				<Dropdown.Item eventKey="2">2 days</Dropdown.Item>
				<Dropdown.Item eventKey="4">4 days</Dropdown.Item>
				<Dropdown.Item eventKey="7">7 days</Dropdown.Item>
				<Dropdown.Item eventKey="14">14 days</Dropdown.Item>
				<Dropdown.Item eventKey="28">28 days</Dropdown.Item>
			</DropdownButton>
			<ExcelFile element={<button className="btn btn-info">Download Schedule</button>}>
				<ExcelSheet data={excel} name="Task Schedule for year">
					<ExcelColumn label="Time Frame" value="TimeFrame" />
					<ExcelColumn label="Pick Up" value="PickUp" />
					<ExcelColumn label="Drop Off" value="DropOff" />
					<ExcelColumn label="Other" value="Other" />
				</ExcelSheet>
			</ExcelFile>
		</div>
	);
}
