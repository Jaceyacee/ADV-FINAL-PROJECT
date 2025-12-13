import db from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== "GET")
        return res.status(405).json({ message: "Method not allowed" });

    try {
        const { user_id } = req.query;

        const rows = await db`
            SELECT *
            FROM order_reservations
            WHERE user_id = ${user_id}
            ORDER BY created_at DESC
        `;

        // Group by reservation_id
        const grouped = {};

        for (const row of rows) {
            if (!grouped[row.reservation_id]) {
                grouped[row.reservation_id] = {
                    reservation_id: row.reservation_id,
                    user_id: row.user_id,
                    username: row.username,
                    reserve_date: row.reserve_date,
                    reserve_time: row.reserve_time,
                    note: row.note,
                    created_at: row.created_at,
                    items: []
                };
            }

            grouped[row.reservation_id].items.push({
                item_name: row.item_name,
                price: row.price,
                quantity: row.quantity
            });
        }

        return res.status(200).json(Object.values(grouped));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch reservations" });
    }
}
