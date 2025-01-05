import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(request) {
    await connectMongoDB();
    try {
        const { username, friendUsername } = await request.json();
        
        await Users.findOneAndUpdate(
        { username },
        { $push: { friendsCalls: friendUsername }},
        { new: true }
        );
        return NextResponse.json({ message: "Friend added successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error adding friend:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
  
    try {
        await connectMongoDB();
  
        if (!username) {
            return new Response(JSON.stringify({ message: "Username is required" }), {
                status: 400,
            });
        }
  
        // Find the user and retrieve only the last element in the friendsCalls array
        const user = await Users.findOne({ username }, { friendsCalls: { $slice: -1 } });
  
        if (user && user.friendsCalls.length > 0) {
            const lastFriendCall = user.friendsCalls[0];
            return new Response(JSON.stringify({ lastFriendCall }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ message: "No friends in friendsCalls" }), {
                status: 404,
            });
        }
    } catch (error) {
        console.error("Error fetching last friend call:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}
