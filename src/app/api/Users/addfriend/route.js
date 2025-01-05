import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/User";

export async function PUT(request) {
    await connectMongoDB();

    try {
        const { username, friendUsername } = await request.json();

        // Update the user's friends array by pushing the new friend's username
        const user = await Users.findOneAndUpdate(
            { username }, // Find the user by username
            { $push: { friends: friendUsername } }, // Add friendUsername to friends array
            { new: true } // Return the updated document
          );

          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
        return res.status(200).json({ message: "Friend added successfully", user });
    } catch (error) {
        console.error("Error adding friend:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}


