import {MongoClient} from 'mongodb';
// import { MONGO_URL } from '$env/static/private'; 
let DB_URI="mongodb+srv://baptistekela:baptistekela@bestscore.hp44zfq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(DB_URI)

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db('test')