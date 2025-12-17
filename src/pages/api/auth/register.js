import sql from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    

    try {
        const { name, email, password } = req.body;

        // Validate
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Check if email already exists
        const existing = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Insert new user
        await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashed})
        `;

        return res.status(201).json({ message: "Registration successful" });

    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({
            message: "Registration failed",
            error: err.message
        });
    }
}
