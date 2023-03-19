import { z } from 'zod';

const RowSchema = z.object({
	status: z.string(),
	sequence: z.number(),
	departure_port: z.string(),
	vessel_name: z.string(),
	vessel_id: z.string(),
	destination_country: z.string(),
	commodity: z.string(),
	tonnage: z.number(),
	departure_date: z.string().datetime(),
	inspection_date: z.string().datetime().nullable(),
	income_destination_country: z.string(),
	flag: z.string(),
	destination_wb_region: z.string(),
	destination_un_region: z.string(),
	development_category: z.string()
});

export default z.array(RowSchema);
