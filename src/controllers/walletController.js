const User= require('../models/User');
const Transaction= require('../models/Transaction');
const bcrypt= require('bcrypt');


//@desc pay bill using wallet
// @route POST /api/wallet/paybill
// @access private
const payBill= async (req, res) => {
    try{
        const {billerName, amount, mpin}= req.body;
        
        if (!mpin) {
            return res.status(400).json({ error: 'Mpin is required' });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: 'Amount must be greater than 0' });
        }

        const user= await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMpinMatch= await bcrypt.compare(mpin, user.mpin);
        if (!isMpinMatch) {
            return res.status(400).json({ error: 'Invalid MPIN' });
        }

        if (user.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        user.balance -= amount;
        await user.save();

        const transaction= await Transaction.create({
            sender: user._id,
            receiver: null,
            amount,
            billerName,
            types: 'billPayment',
            status: "success"
        });

        res.status(200).json({ message: 'Bill payment successful', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }



const getWalletBalance= async(req, res) => {
    try{
        const user= await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({error: 'User not found'});
        }
        res.status(200).json({balance: user.balance})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports= {payBill, getWalletBalance};

