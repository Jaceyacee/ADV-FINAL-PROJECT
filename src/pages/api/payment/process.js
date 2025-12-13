import db from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const {
            username,
            user_id,
            amount,
            method,
            reservation_id,
            payment_details
        } = req.body;

        // BASIC VALIDATION
        if (!username || !user_id || !amount || amount <= 0 || !method) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Additional validation depending on method
        const errors = [];

        if (method === "credit_card") {
            if (!payment_details.cardNumber) errors.push("Card number required");
            if (!payment_details.cardName) errors.push("Card name required");
            if (!payment_details.cardExpiry) errors.push("Expiry required");
            if (!payment_details.cardCVC) errors.push("CVC required");
        }

        if (method === "gcash") {
            if (!payment_details.gcashNumber) errors.push("GCash number required");
        }

        if (method === "paypal") {
            if (!payment_details.paypalEmail) errors.push("PayPal email required");
        }

        if (method === "bank_transfer") {
            if (!payment_details.bankName) errors.push("Bank name required");
            if (!payment_details.accountNumber) errors.push("Account number required");
        }

        if (errors.length > 0) {
            return res.status(400).json({ success: false, message: errors.join(", ") });
        }

        // CREATE TRANSACTION ID
        const transaction_id = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        // INSERT PAYMENT
        const result = await db`
            INSERT INTO payments 
            (username, user_id, amount, method, transaction_id, status, created_at)
            VALUES (${username}, ${user_id}, ${amount}, ${method}, ${transaction_id}, 'completed', NOW())
            RETURNING payment_id
        `;

        const payment_id = result[0].payment_id;

        // DELETE RESERVATION
        if (reservation_id) {
            await db`
                DELETE FROM order_reservations
                WHERE reservation_id = ${reservation_id}
            `;
        }

        return res.status(200).json({
            success: true,
            message: "Payment successful",
            payment_id,
            transaction_id
        });
        
    } catch (err) {
        console.error("Payment error:", err);
        return res.status(500).json({ success: false, message: "Payment failed" });
    }
}
