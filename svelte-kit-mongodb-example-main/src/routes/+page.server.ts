import { tutorials } from "$db/tutorials";
import type {PageServerLoad} from './$types'

function sort_data(data:any) {
	data.sort((a:any,b:any)=>b.score-a.score)
	return data;
}

export const load: PageServerLoad = async function() {
	const data = await tutorials.find().toArray()  
	  return {
		status: 200,
		body: { data: sort_data(data)},
	  };
	};