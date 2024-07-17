const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
  type: String,
  required: true
},
  email:{
    type: String,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  role:{
    type: Number,
    default: 0
  },
  cart:{
    type: Array,
    default: []
  }
},{
  Timestamp: true
})

module.exports = mongoose.model('Users',userSchema);
