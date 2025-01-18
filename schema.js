const mongoose =  require('mongoose')

const user = mongoose.Schema({
    FirstName : {
        type : String,
        require : true
    },

    SecondName : {
        type : String,
    },

    Email : {
        type : String,
        require : true ,
        uniue : true
    }
})

const xyz = mongoose.model('Users'.user)
module.exports = xyz