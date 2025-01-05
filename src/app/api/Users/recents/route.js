import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/User";


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
  
    try {
        await connectMongoDB();
        // Find the user and retrieve only the last element in the friendsCalls array
        const user = await Users.findOne({ username });
  
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
            });
        }
        
        // Create a count of each friend call by username
        const friendsCallsCount = user.friendsCalls.reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {});

        return new Response(JSON.stringify(friendsCallsCount), { status: 200 });
    } catch (error) {
        console.error("Error fetching last friend call:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}
