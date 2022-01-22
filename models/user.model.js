const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
    name:{
        type: String, 
        required: true 
    },
    email:{ 
        type: String, 
        required: true, 
        unique: true     
        // เช็ค email ที่ซ้ำ
    },  
    password:{ 
        type: String, 
        required: true 
    },
    quote: { 
        type: String 
    },
    date: {
		type: Date,
		default: Date.now
	}
    },
    {timestamps: true}
    // { collation: 'user-data' }
)


const model = mongoose.model('UserData', User )
module.exports = model