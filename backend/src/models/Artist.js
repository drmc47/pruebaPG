const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BrandsSchema = new Schema({
	name: String,
	description: String,
	image: String
	// products: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'products',
	// 	},
	// ],
	// wallet: {
	// 	addressPublicKey: String,
	// 	addressPrivateKey: String
	// }
});


module.exports = mongoose.model('artists', BrandsSchema);