const User= require('../models/User');
const jwt= require('jsonwebtoken');
const Transaction= require('../models/Transaction');
const bcrypt= require('bcrypt');

// @desc  send money
// @route POST /api/transaction/send
// @access private
const sendMoney= async (req, res) => {
    try {
        const {receiverNumber, amount, mpin}= req.body;
        if(!mpin){
            return res.status(400).json({error: 'Mpin is required'});
        }
        if (amount<=0 ){
            return res.status(400).json({error: 'Amount must be greater than 0'});
        }
        const sender= await User.findById(req.user.id);
        if(!sender){
            return res.status(400).json({error: 'Sender not found'});
        }
        const isMpinMatch= await bcrypt.compare(mpin, sender.mpin);
        if(!isMpinMatch){
            return res.status(400).json({error: 'Invalid MPIN'});
        }

        const reciever= await User.findOne({phone: receiverNumber});
        if(!reciever){
            return res.status(400).json({error: 'Receiver not found'});
        }
        if(sender.balance < amount){
            return res.status(400).json({error: 'Insufficient balance'});
        }


        sender.balance -= amount;
        reciever.balance += amount;

        await sender.save();
        await reciever.save();

        const transaction= await Transaction.create({
            sender: sender._id,
            receiver: reciever._id,
            amount,
            billerName: 'Paytm',
            types: 'transfer',
            status: 'success'
        });

        res.status(200).json({message: 'Money sent successfully', transaction});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


const getTransactionHistory= async(req, res) => {
    try{
        const userId= req.user.id;
        const transactions= await Transaction.find({$or: [{sender: userId}, {receiver: userId}]}).populate('sender', 'name phone email').populate('receiver', 'name phone email').sort({createdAt: -1});
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


//@desc deposit money
// @route POST /api/transaction/deposit
// @access private
const depositMoney= async (req, res) => {
    try{
        const {amount, mpin}= req.body;
        if(!mpin){
            return res.status(400).json({error: 'Mpin is required'});
        }
        if (amount<=0 ){
            return res.status(400).json({error: 'Amount must be greater than 0'});
        }
        const user= await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({error: 'User not found'});
        }
        const isMpinMatch= await bcrypt.compare(mpin, user.mpin);
        if(!isMpinMatch){
            return res.status(400).json({error: 'Invalid MPIN'});
        }

        user.balance += amount;
        await user.save();

        const transaction= await Transaction.create({
            sender: null,
            receiver: user._id,
            amount,
            billerName: 'Paytm',
            types: 'deposit',
            status: 'success'
        });

        res.status(200).json({message: 'Money deposited successfully', transaction});
    } catch (error) {
        res.status(500).json({error: error.message});
    }

}
        

module.exports= {
    sendMoney,
    getTransactionHistory,
    depositMoney
}

        

