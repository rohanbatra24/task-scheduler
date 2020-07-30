import React from 'react';
import moment from 'moment';

export default function Xlabels() {
	var hoursPerDay = 24;
	var time = [];

	for (let i = 1; i < hoursPerDay + 1; i++) {
		const formattedTime = moment().startOf('day').subtract(1, 'hours').add(i, 'hours').format('h a');
		time.push(formattedTime);
	}

	return (
		<div className="time">
			{time.map((time, i) => {
				return <span key={i}>{time}</span>;
			})}
		</div>
	);
}
