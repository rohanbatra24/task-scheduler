import moment from 'moment';
const format = 'hh a';

const data = [
	{
		id          : 8,
		week        : 1,
		day         : 'Tuesday',
		start       : moment('1 am', format),
		end         : moment('3 am', format),
		duration    : 2,
		driver      : 'Bob',
		task        : 'Other',
		location    : 'Home',
		color       : 'lightblue',
		bookingHead : true
	},
	{
		id          : 8,
		week        : 1,
		day         : 'Tuesday',
		start       : moment('2 am', format),
		end         : moment('3 am', format),
		duration    : 1,
		driver      : 'Bob',
		task        : 'Other',
		location    : 'Home',
		color       : 'lightblue',
		bookingHead : false
	},
	{
		id          : 1,
		week        : 1,
		day         : 'Thursday',
		start       : moment('3 am', format),
		end         : moment('5 am', format),
		duration    : 2,
		driver      : 'Bob',
		task        : 'Drop Off',
		location    : 'Factory',
		color       : 'indigo',
		bookingHead : true
	},
	{
		id          : 1,
		week        : 1,
		day         : 'Thursday',
		start       : moment('4 am', format),
		end         : moment('5 am', format),
		duration    : 1,
		driver      : 'Bob',
		task        : 'Drop Off',
		location    : 'Factory',
		color       : 'indigo',
		bookingHead : false
	},
	{
		id          : 10,
		week        : 1,
		day         : 'Monday',
		start       : moment('8 am', format),
		end         : moment('11 am', format),
		duration    : 3,
		driver      : 'Bob',
		task        : 'Drop Off',
		location    : 'Warehouse',
		color       : 'pink',
		bookingHead : true
	},
	{
		id          : 10,
		week        : 1,
		day         : 'Monday',
		start       : moment('9am', format),
		end         : moment('10 am', format),
		duration    : 1,
		driver      : 'Bob',
		task        : 'Drop Off',
		location    : 'Warehouse',
		color       : 'pink',
		bookingHead : false
	},
	{
		id          : 10,
		week        : 1,
		day         : 'Monday',
		start       : moment('10 am', format),
		end         : moment('11 am', format),
		duration    : 1,
		driver      : 'Bob',
		task        : 'Drop Off',
		location    : 'Warehouse',
		color       : 'pink',
		bookingHead : false
	},
	{
		id          : 2,
		week        : 1,
		day         : 'Sunday',
		start       : moment('12 pm', format),
		end         : moment('04', format),
		duration    : 1,
		driver      : 'Bob',
		task        : 'Pick Up',
		location    : 'Factory',
		color       : 'yellow',
		bookingHead : true
	},
	{
		id          : 3,
		week        : 1,
		day         : 'Saturday',
		start       : moment('10 am', format),
		end         : moment('10', format),
		duration    : 2,
		driver      : 'Bob',
		task        : 'Pick Up',
		location    : 'HQ',
		color       : 'green',
		bookingHead : true
	},
	{
		id          : 3,
		week        : 1,
		day         : 'Friday',
		start       : moment('8 pm', format),
		end         : moment('10', format),
		duration    : 7,
		driver      : 'Bob',
		task        : 'Pick Up',
		location    : 'Home',
		color       : 'purple',
		bookingHead : true
	}
];

export default data;
