import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/User";
import { NextResponse } from "next/server";


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    // if (!username) {
    //     return new Response('Username is required', { status: 400 });
    // }
    try {
        await connectMongoDB();
        const user = await Users.findOne({ username }); // Fetch only the `_id` field

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ id: user._id }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return new Response('Error fetching user ID', { status: 500 });
    }

    
}


