import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendOTPEmail } from "../../../../../helpers/sendOtp.js";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
        return NextResponse.json({ error: "faield to resend" }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });

    try {
        if (user && !user.isVerified) {
            const otp = crypto.randomInt(100000, 999999).toString(); // Generate OTP
            const expiryTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

            // Update the user's OTP
            await prisma.user.update({
                where: { email },
                data: {
                    verifyToken: otp,
                    verifyTokenExpiry: expiryTime,
                },
            });

            // Send OTP email
            await sendOTPEmail(email, otp);

            return NextResponse.json({
                message: "OTP sent to your registered email",
                success: true,
            });
        }
    } catch (error) {
        return NextResponse.json({
            message: "Error sending OTP to your registered email",
            success: false,
            error: error.message,
        });
    }
}