const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) =>{
    const{name, email, password } = req.body

    if(!name || !email ||!password){
        res.status(400)
        throw new Error('please add fields')
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')

    }
    //hashed password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token:generatetoken(user._id),
    })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }

    res.json({message: 'Register user'})

})
const loginUser = asyncHandler(async (req, res) =>{
    const {email, password } = req.body

    const user =await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json ({
            _id: user.id,
        name: user.name,
        email: user.email,
        token:generatetoken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})
const getMe = asyncHandler(async(req, res) =>{
    const{_id,name, email} = await User.findById(req.user.id)
   res.status(200).json({
       id:_id,
       name,
       email,
   }) 
})
//generatetoken
const generatetoken= (id)=>{
    return jwt.sign({id }, process.env.JWT_SECRETE, {
        expiresIn: '30d',
    })
}

module.exports= {
    registerUser, 
    loginUser,
    getMe,
}