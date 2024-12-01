import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order from front end
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        console.log(newOrder)
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}})
        res.json({success:true, message: "Order places"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

// User order for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        res.json({success:false, message:"Error"})
    }
}

// list orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({success:true, data:orders})
    } catch (error) {
        res.json({success:false, message:"Error"})
    }
}

// Updating order status
const updateStatus = async (req,res) => {
    try {
        console.log(req.body);
        let payment = false
        if (req.body.status === "Payment Done") {
            payment = true
        }
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status, payment: payment})
        res.json({success:true, message:"Updated status"})
    } catch (error) {
        res.json({success:false, message:"Error"})
    }
}

export {placeOrder, userOrders, listOrders, updateStatus}