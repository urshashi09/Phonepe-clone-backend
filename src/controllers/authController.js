const User= require('../models/User');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');


const generateToken= (id) => {
    return jwt.sign({ _id: id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}
const registerUser= async (req, res) => {
    try {
        const {name, email, password, phone}= req.body;
        if(!name || !email || !password || !phone){
            return res.status(400).json({error: 'All fields are required'});
        }

        const sanitizedName= email.toLowerCase();
        const userExists= await User.findOne({$or: [{email: sanitizedName}, {phone}]});
        if(userExists){
            return res.status(400).json({error: 'User already exists'});
        }

        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        
        const upiId= `${sanitizedName.split('@')[0]}@phonepe`;

        const user= await User.create({
            name,
            email: sanitizedName,
            password: hashedPassword,
            phone,
            upiId
        });

        if(user){
            res.status(201).json({
                message: 'User registered successfully',
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                upiId: user.upiId,
                balance: user.balance,
                hashMpinSet: false,
                token: generateToken(user._id)
            });
        }

        
        
        

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const login= async (req, res) => {
    const {email, password}= req.body;

    if(!email || !password){
        return res.status(400).json({error: 'All fields are required'});
    }
    
    try {
        const user= await User.findOne({email});
        if(!user){
            return res.status(401).json({error: 'User not found'});
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({error: 'Invalid credentials'});
        }

        res.status(200).json({
            message: 'User logged in successfully',
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            upiId: user.upiId,
            balance: user.balance,
            hashMpinSet: !! user.mpin,
            token: generateToken(user._id)
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const setMpin= async (req, res) => {
    const {mpin}= req.body;
    if(!mpin || mpin.length !== 4){
        return res.status(400).json({error: 'Please enter a 4-digit MPIN'});
    }

    const salt= await bcrypt.genSalt(10);
    const hashedMpin= await bcrypt.hash(mpin, salt);

    try {
        const user= await User.findByIdAndUpdate(req.user.id, {mpin: hashedMpin}, {new: true});
        if(user){
            res.status(200).json({message: 'MPIN set successfully'});
        }
        else{
            res.status(404).json({error: 'User not found'});
        }
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


const getUser= async (req, res) => {
    try {
        const user= await User.findById(req.user._id).select('-password -mpin');
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({error: 'User not found'});
        }
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports= {
    registerUser,
    login,
    setMpin,
    getUser
};