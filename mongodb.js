var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/students', {
  useNewUrlParser: true
});

var Schema = mongoose.Schema;

//设计文档结构（表结构）
var stuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sex:{
    type: String,
    enum: ['男', '女'],
    default: '男',
    required: true
  },
  age:{
    type: Number,
    required: true,
  },
  hobbies:{
    type: String,
  }
});

module.exports = mongoose.model('Student', stuSchema);