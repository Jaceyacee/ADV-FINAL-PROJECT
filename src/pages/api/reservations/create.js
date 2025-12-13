import sql from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { name, guests, date, time, table, notes } = req.body;

        // Validate required fields
        if (!name || !guests || !date || !time || !table) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        // Insert reservation into Neon WITHOUT user_id
        const result = await sql`
            INSERT INTO reservations (name, guests, date, time, table_name, notes)
            VALUES (${name}, ${guests}, ${date}, ${time}, ${table}, ${notes || null})
            RETURNING *
        `;

        return res.status(201).json({
            message: "Reservation created successfully",
            reservation: result[0]
        });

    } catch (err) {
        console.error("Reservation Create Error:", err);
        return res.status(500).json({
            message: "Failed to create reservation",
            error: err.message
        });
    }
}
