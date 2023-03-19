import { error, json } from '@sveltejs/kit';
import * as d3 from 'd3';

const parseDate = d3.timeParse('%d-%b-%y');

/** @param {string | undefined} string */
function parseNumber(string = '') {
	const parsed = parseInt(string);
	if (isNaN(parsed)) {
		return null;
	}
	return parsed;
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
	const response = await fetch('/data/voyages.csv', { headers: { Accept: 'text/csv' } });

	if (!response.ok) {
		throw error(500, 'Failed to fetch data.');
	}

	const data = d3.csvParse(await response.text(), (d) => ({
		status: d['Status'],
		sequence: parseNumber(d['Outbound Sequence']),
		departure_port: d['Departure port'],
		vessel_name: d['Vessel name'],
		vessel_id: d['IMO'],
		destination_country: d['Country'],
		commodity: d['Commodity'],
		tonnage: parseNumber(d['Tonnage']?.replace(',', '')),
		departure_date: d['Departure'] ? parseDate(d['Departure']) : null,
		inspection_date: d['Inspection İstanbul'] ? parseDate(d['Inspection İstanbul']) : null,
		income_destination_country: d['Income group'],
		flag: d['Flag'],
		destination_wb_region: d['World Bank region'],
		destination_un_region: d['UN region'],
		development_category: d['Development category']
	}));

	return json(data);
}
