import { error } from '@sveltejs/kit';
import RowsSchema from '$lib/schemas/rows';

export async function load({ fetch }) {
	const response = await fetch('/api/data');

	if (!response.ok) {
		throw error(500, 'Failed to fetch data.');
	}

	const result = RowsSchema.safeParse(await response.json());

	if (!result.success) {
		throw error(500, 'Rows validation failed.');
	}

	const voyages = result.data;

	return { voyages };
}
