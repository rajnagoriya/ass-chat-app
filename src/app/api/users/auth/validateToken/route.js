import { verifyToken } from '../../../../../helpers/jwt.js';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const authHeader = req.headers.get('authorization');  
    const token = authHeader && authHeader.split(' ')[1]; 
    
    if (!token) {
        return NextResponse.json({
            message: "Invalid token!!!",
            success: false,
        });
    }

    try {
        const decoded = verifyToken(token); 

        if (!decoded) {
            return NextResponse.json({
                message: "Session expired, please log in.",
                success: false,
            });
        }

        return NextResponse.json({
            message: "Token verified successfully",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Invalid or expired token.",
            success: false,
        });
    }
};
