import db from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

    try {
        console.log('Feedback submission request:', req.body);

        const { userId, userName, type, message } = req.body;

        // Basic validation
        if (!userId || !userName || !type || !message) {
            console.log('Missing fields:', { userId, userName, type, message });
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (message.trim().length < 5) {
            return res.status(400).json({
                success: false,
                message: 'Feedback must be at least 5 characters long'
            });
        }

        // Insert into database using your Neon db connection
        const result = await db`
            INSERT INTO feedback (
                user_id, 
                username, 
                feedback_type, 
                message, 
                status, 
                created_at
            ) VALUES (
                ${userId}, 
                ${userName}, 
                ${type}, 
                ${message}, 
                'pending', 
                NOW()
            ) 
            RETURNING feedback_id
        `;

        console.log('Database insertion result:', result);

        if (!result || result.length === 0) {
            throw new Error('Failed to insert feedback');
        }

        const feedbackId = result[0].feedback_id;

        return res.status(200).json({
            success: true,
            message: 'Feedback submitted successfully',
            feedbackId: feedbackId,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in feedback submission:', error);
        
        return res.status(500).json({
            success: false,
            message: 'Failed to submit feedback. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}