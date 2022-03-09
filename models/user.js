const crypto = require('crypto');

const mongoose= require('mongoose');

const { v4 : uuidv4 } = require("uuid");


var userSchema = new mongoose.Schema({
    name:{
        type:String,
        reuiredd:true,
        maxlength:32,
        trim: true,
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    userinfo:{
        type: String,
        trim:true
    },
    encpassword:{
        type:String,
        trim:true,   
    },
    salt:String,
    role:{
        type: Number,
        default:0,
    },
    purchases:{
        type:Array,
        default:[]
    }
})

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv4();
        this.encpassword = this.securepassword(password);
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {


    authenticate:function(plainpassword){
        return this.securepassword(plainpassword) === this.encpassword

    },

    securepassword: function(plainpassword){
        if (!plainpassword) return "";

        try{
            return crypto.createHmac('sha256', this.salt).update(plainpassword).digest('hex');
        }catch(err){
            return ""
        }
    }
}

module.exports =  mongoose.model("User",userSchema);