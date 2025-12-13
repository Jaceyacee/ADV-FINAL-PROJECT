import db from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { username, user_id, amount, method, reservation_id } = req.body;

        // BASIC VALIDATION - only essential fields
        if (!username || !user_id || !amount || amount <= 0 || !method) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
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
            transaction_id,
            method
        });
        
    } catch (err) {
        console.error("Payment error:", err);
        return res.status(500).json({ success: false, message: "Payment failed" });
    }
}