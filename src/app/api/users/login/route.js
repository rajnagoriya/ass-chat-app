import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import { generateToken } from "../../../../helpers/jwt.js";

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request) {
    try {
    
        const reqBody = await request.json();
        const { email, password } = reqBody;
        // console.log(reqBody);

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        if(!user.isVerified){
            return NextResponse.json({ error: "email not verified please signup" }, { status: 400 });
        }
        

        // Create a JWT token
        const token = generateToken(user);

        // Create response and set token in cookies
        return NextResponse.json({
            message: "Login successful",
            success: true,
            token
        }); 
             
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma after the query
    }
}
