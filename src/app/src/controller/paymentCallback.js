import crypto from "crypto";
import { verifyPaymentLogic } from "./verifyPayment.js";

const paymentCallback = async (req, res) => {
    try {
        // Razorpay sends data in body (x-www-form-urlencoded)
        // Express body-parser should handle this if configured, ensuring req.body is populated.

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        // Define frontend URL for redirection
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        // fallback to some default if env not set, but ideally should be set.

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            console.error("Payment callback missing details", req.body);
            return res.redirect(`${frontendUrl}/payment/status?status=failure&message=Payment details missing`);
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            console.error("Payment callback signature mismatch");
            return res.redirect(`${frontendUrl}/payment/status?status=failure&message=Invalid signature`);
        }

        try {
            const result = await verifyPaymentLogic(razorpay_order_id, razorpay_payment_id);
            // Verify logic might throw if payment not found, etc.

            if (result.success) {
                // Determine event slug if possible? 
                // We might need to fetch event slug if we want to redirect nicely, 
                // but verifyPaymentLogic returns basic info. 
                // Let's rely on the Payment model populating event.

                // We need to fetch the payment again or have verifyPaymentLogic return it to get the slug?
                // verifyPaymentLogic updates status.

                // Let's assume generic success page is fine, or pass the transaction ID.
                return res.redirect(`${frontendUrl}/payment/status?status=success&message=Payment successful&transactionId=${razorpay_payment_id}`);
            } else {
                return res.redirect(`${frontendUrl}/payment/status?status=failure&message=${result.message}`);
            }

        } catch (logicError) {
            console.error("Payment logic error during callback:", logicError);
            return res.redirect(`${frontendUrl}/payment/status?status=failure&message=Processing failed`);
        }

    } catch (error) {
        console.error("Payment Callback Error:", error);
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        return res.redirect(`${frontendUrl}/payment/status?status=failure&message=Server error`);
    }
};

export default paymentCallback;
