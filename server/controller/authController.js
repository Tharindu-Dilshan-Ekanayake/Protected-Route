const {comparePassword} = require('../helper/authhelper');
const User = require('../model/user')
const jwt = require('jsonwebtoken');

//login end point
const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;

        //check if user exists
        const user =  await User.findOne({ email});
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        //compare password
        const match = await comparePassword(password, user.password);
        if(match) {
            jwt.sign({id: user._id, fname: user.fname, role: user.role, email: user.email}, process.env.REACT_APP_JWT_SECRET, {expiresIn: '1h'}, (err, token)=>{
                if(err) throw err;
                res.cookie('token', token).json(user);   
            })
        } else {
            return res.status(400).json({message: "Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

//get profile
const getprofile = async (req, res) => {
    const { token} = req.cookies;

    if(!token){
        return res.status(400).json({ error: "User not authenticated"});
    }

    jwt.verify(token, process.env.REACT_APP_JWT_SECRET,{}, (err,decode)=>{
        if(err){
            console.error("token verification error:", err);
            return res.status(401).json({error: "Token verification failed"});
        }

        //find user by id
        User.findById(decode.id)
            .then(user => {
                if(!user) {
                    return res.status(400).json({error: "User not found"});
                }

                //build user profile response
                const userProfile = {
                    fname: user.fname, 
                    email: user.email,
                    role: user.role
                };

                res.json(userProfile)
            })
            .catch(err => {
                console.error("User profile error", err);
                res.status(500).json({error: "Internal server error"});
            })
    })

}

//logout
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: "Logout successful"});
}


module.exports = {
    loginUser,
    getprofile,
    logout

}