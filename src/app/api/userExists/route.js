import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectMongoDB();
        const { email } = await request.json();
        
        // Find user by either email or username
        const user = await Users.findOne({ email }).select("_id");
        
        console.log("user", user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}