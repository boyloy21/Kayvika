// src/app/api/Users/friends/route.js
import { connectMongoDB } from '@/lib/mongodb'; // Import your MongoDB connection
import Users from '@/models/User'; // Import your User model

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    try {
        await connectMongoDB(); // Connect to your MongoDB
        const user = await Users.findOne({ username }); // Find the user

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ friends: user.friends }), { status: 200 });
    } catch (error) {
        console.error('Error fetching friends:', error);
        return new Response(JSON.stringify({ message: 'Error fetching friends' }), { status: 500 });
    }
}
