import { generateToken } from "../../../../../helpers/jwt.js";
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()

export async function POST(request) {
    const reqBody = await request.json();
    const { email, otp } = reqBody;

  // Check if email and OTP are provided
  if (!email || !otp) {
    return NextResponse.json({ error: "email/otp required" }, { status: 400 });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
        return NextResponse.json({ error: "user not found" }, { status: 400 });
    }

    // Check if the user is already verified
    if (user.isVerified) {
        return NextResponse.json({ error: "user already verified please login" }, { status: 400 });
    }

    // Check if the OTP matches and has not expired
    const currentTime = new Date()

    if (
      user.verifyToken !== otp || 
      !user.verifyTokenExpiry || 
      currentTime > user.verifyTokenExpiry
    ) {
        return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Update user: set isVerified to true, remove verifyToken and verifyTokenExpiry
    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      },
    })

    // You can generate a JWT token or send a success message
    const token = await generateToken(user);
    return NextResponse.json({
        message: 'User successfully verified',
        success: true,
        token
      });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
