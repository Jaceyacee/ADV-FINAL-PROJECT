import sql from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { name, seats, location } = req.body;

        // Validate required fields
        if (!name || !seats) {
            return res.status(400).json({ message: "Name and seats are required" });
        }

        // Insert table into database
        const result = await sql`
            INSERT INTO tables (name, seats, location)
            VALUES (${name}, ${seats}, ${location || null})
            RETURNING *
        `;

        return res.status(201).json({
            message: "Table added successfully",
            table: result[0],
        });
    } catch (err) {
        console.error("Add Table Error:", err);
        return res.status(500).json({
            message: "Failed to add table",
            error: err.message,
        });
    }
}
