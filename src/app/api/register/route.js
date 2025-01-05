import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { username, email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        const profile = "profile";
        await Users.create({ username, email, password: hashedPassword, profile });
        return NextResponse.json({message: "User registered successfully"},{status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}