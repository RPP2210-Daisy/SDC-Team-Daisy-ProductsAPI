import mongoose from 'mongoose';
const { Schema } = mongoose;

const overviewSchema = new Schema ({
  product_id: Number,
  campus: { type: String, default: 'hr-rpp' },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
})

const individualProductSchema = new Schema ({
  overviewSchema,
  features: [
    {
      feature: String,
      value: String,
    }
  ],
})

const stylesSchema = new Schema ({
  product_id = //reference product id in OverviewSchema
  results: [
    style_id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    default?: Boolean,
    photos: [
      {
        thumbnail_url: String,
        url: String,
      },
    ],
    skus: {
    "2580526": {
        quantity: Number,
        "size": "XS"
      },
    "2580527": {
        "quantity": 16,
        "size": "S"
      },
    "2580528": {
        "quantity": 17,
        "size": "M"
      },
    "2580529": {
        "quantity": 10,
        "size": "L"
      },
    "2580530": {
        "quantity": 15,
        "size": "XL"
      },
    "2580531": {
        "quantity": 4,
        "size": "XL"
      }
    }
  ]
})

const relatedProductsSchema = new Schema({
  array: { type: [Number], unique: true, }
})

//mongoose Model