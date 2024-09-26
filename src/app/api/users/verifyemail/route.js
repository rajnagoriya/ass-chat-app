import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        // Find user with matching token and non-expired token
        const user = await prisma.user.findFirst({
            where: {
                verifyToken: token,
                verifyTokenExpiry: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Update user to mark as verified and remove the token fields
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verifyToken: null,
                verifyTokenExpiry: null,
            },
        });

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
