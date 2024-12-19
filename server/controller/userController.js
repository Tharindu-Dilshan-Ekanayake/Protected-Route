const User = require('../model/user')

//user register
const createuser =  async (req, res) =>{
    try {
        const {fname, email, password, role} = req.body;
        const user = new User({
            fname,
            email,
            password,
            role
        });
        const saveUser = await user.save();
        res.status(201).json({message: "User created successfully", data: saveUser});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//get users
const getusers = async (req, res) =>{
    try {
        const users = await User.find();
        res.status(201).json({data: users});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = { 
    createuser,
    getusers
}