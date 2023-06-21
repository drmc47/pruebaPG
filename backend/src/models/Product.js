const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const findOrCreate = require('mongoose-findorcreate');

const ProductsSchema = new Schema({
  name: { type: String, required: true, index: true, sparse: true },
  id: String,
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  image: String,

  categories: [
    {
      type: Schema.Types.ObjectId,

      ref: "categories",
    },
    { timestamps: true, versionKey: false },
  ],

  tokenId: String,

  address: String,

  reviews: String,

  createdInDB: {
    type: Boolean,
    default: true,
  },
  description: String,
  artistName: String,
  reviews: [],
});

// ProductsSchema.plugin(findOrCreate);

module.exports = mongoose.model("products", ProductsSchema);
