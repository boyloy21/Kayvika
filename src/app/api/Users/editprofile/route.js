import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const { username, imagename } = await req.json();
    try {
        await connectMongoDB();
        
        // Save the result of findOneAndUpdate to a variable
        const result = await Users.findOneAndUpdate(
            { username }, 
            { profile: imagename }, 
            { new: true }
        );

        // Check if a result was found and updated
        if (!result) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Profile updated successfully', profile: result.profile }, { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Error updating profile image.' }, { status: 500 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    try {
        await connectMongoDB();
        const user = await Users.findOne({ username });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ profile: user.profile  }, { status: 200 });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ error: 'Error fetching profile image.' }, { status: 500 });
    }
}