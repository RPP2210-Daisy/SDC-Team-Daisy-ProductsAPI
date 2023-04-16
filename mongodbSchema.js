import mongoose from 'mongoose';
const { Schema } = mongoose;

const overviewSchema = new Schema ({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
})

const individualProductSchema = new Schema ({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Overview'
  },
  features: [
    {
      feature: String,
      value: String,
    }
  ],
})

const stylesSchema = new Schema ({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Overview'
  }
  results: [
    style_id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    photos: [
      {
        thumbnail_url: String,
        url: String,
      },
    ],
    skus: {
      sku_id: {
        quantity: Number,
        size: String
      }
    }
  ]
})

const Overview = mongoose.model('Overview', overviewSchema);
const IndividualProduct = mongoose.model('IndividualProduct', individualProductSchema);
const Styles = mongoose.model('Styles', stylesSchema);