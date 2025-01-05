import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/User";

export async function GET(req) {
  try {
    await connectMongoDB();
    
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const currentUser = searchParams.get('currentUser'); // Retrieve currentUser from the query params
    
    const query = currentUser ? { username: { $ne: currentUser } } : {};
    
    // Fetch usernames, excluding the current user if specified
    const users = await Users.find(query).select('username -_id');
    const usernames = users.map(user => user.username);

    return new Response(JSON.stringify({ usernames }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching usernames:', error);
    return new Response(JSON.stringify({ message: 'Error fetching usernames' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}