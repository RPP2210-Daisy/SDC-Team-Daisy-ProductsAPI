const overviewSchema = new Schema ({
  id: SERIAL id,
  campus: hr-rpp
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  created_at: Date.now,
  updated_at: Date,
})

const individualProductSchema = new Schema ({
  all of items from overviewSchema
  features: [
    feature: String,
    value: String,
  ],
})

const stylesSchema = new Schema ({
  product_id = foreign key from overviewSchema
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
  [
    Number
  ]
})

//products/:product_id/related
// [
//   71698,
//   71699,
//   71704,
//   71703
// ]