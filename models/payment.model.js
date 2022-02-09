const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  ussdCode: {
    type: String,
    default: '*805*',
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: String,
    trim: true,
    required: true,
  }
},
  {
    timestamps: true,
  },
);

const Payment = mongoose.model("payment", PaymentSchema);

module.exports = Payment;