const mongoose = require('mongoose');

const uri = process.env.MONGO_URI

console.log(process.env.LANDON_NAME)
mongoose.connect(
    uri,
    {
        useNewUrlParser: true
    }
)
.then(e => console.log('MongoDB Ready!'))
.catch(console.error)

const {model, Schema} = require('mongoose')

const Userschema = new Schema({
    firstName: String,
    middleName: {
        type: String,
        default: ""
    },
    lastName: String,
    age: Number,
    email: {
        type: String,
        required: true
    }
})

let User = model('user', Userschema)

const handler = async (event) => {

  const users = await User.find()

  return {
    statusCode: 200,
    body: JSON.stringify(users),
  }

    
}

module.exports = { handler }