import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const usserSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        require: true
    },
    last_name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        min: [18, 'must be older than 18 to buy in our store'],
        type: Number,
        default: 18
    },
    rol: {
        type: String,
        enum: ['admin', 'usser', 'premium'],
        default: 'usser'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
        require: true
    },
    last_session: {
        type: Date,
        require: true
    }
})
//maybe not needed here
// usserSchema.pre("findOne", function(){
//     this.populate("cart")
// })
usserSchema.plugin(mongoosePaginate)
const usserModel = model('ussers', usserSchema)
export default usserModel
