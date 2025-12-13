import db from "@/lib/db";

export default async function handler(req, res) {
    // GET: fetch all reservations for a user
    if (req.method === "GET") {
        try {
            const { user_id } = req.query;

            const rows = await db`
                SELECT * 
                FROM order_reservations
                WHERE user_id = ${user_id}
                ORDER BY created_at DESC
            `;

            return res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch reservations" });
        }
    }

    // POST: create reservations
    if (req.method === "POST") {
        try {
            const { user_id, username, reserve_date, reserve_time, note, items } = req.body;

            if (!items || items.length === 0) {
                return res.status(400).json({ message: "No items provided" });
            }

            for (const item of items) {
                await db`
                    INSERT INTO order_reservations 
                        (user_id, username, item_name, price, quantity, reserve_date, reserve_time, note, created_at)
                    VALUES 
                        (${user_id}, ${username}, ${item.item_name}, ${item.price}, ${item.quantity}, 
                         ${reserve_date}, ${reserve_time}, ${note}, NOW())
                `;
            }

            return res.status(200).json({ message: "Reservation saved" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to save reservation" });
        }
    }

    // DELETE: remove reservation
    if (req.method === "DELETE") {
        try {
            const { reservation_id } = req.query;

            await db`
                DELETE FROM order_reservations 
                WHERE id = ${reservation_id}
            `;

            return res.status(200).json({ message: "Reservation deleted" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete reservation" });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}
