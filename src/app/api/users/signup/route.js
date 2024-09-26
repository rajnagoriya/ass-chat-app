import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { sendOTPEmail } from "../../../../helpers/sendOtp.js";
const prisma = new PrismaClient();


export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });

    if(user?.isVerified){
      return NextResponse.json({ error: "user already exist!!!" }, { status: 400 });
    }

    // If user exists and is not verified, resend OTP
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

    // If user doesn't exist, create new user with hashed password and OTP
    if (!user) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const otp = crypto.randomInt(100000, 999999).toString(); // Generate OTP
      const expiryTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

      // Create user with OTP
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          verifyToken: otp,
          verifyTokenExpiry: expiryTime,
        },
      });

      // Send OTP email
      await sendOTPEmail(email, otp);

      return NextResponse.json({
        message: "OTP sent to your registered email.",
        success: true,
      });
    }

    return NextResponse.json({
      message: "User already exists please login",
      success: true,
    });

  } catch (error) {
    console.log('Error in POST handler:', error);
    return NextResponse.json({
      message: "Error sending OTP to your registered email",
      success: false,
      error: error.message,
    });
  }
}



















// import { generateToken } from "../../../../helpers/jwt.js";
// import { PrismaClient } from '@prisma/client';
// import bcryptjs from 'bcryptjs';
// import { NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function POST(request) {
//     try {
//         const reqBody = await request.json();
//         const { email, password } = reqBody;

//         if( !email || !password ){
//             return NextResponse.json({ error: "all fields required" }, { status: 400 });
//         }

//         // Check if user already exists
//         const user = await prisma.user.findUnique({
//             where: { email }
//         });

//         if (user) {
//             console.log("user exist !")
//             return NextResponse.json({ error: "User already exists" }, { status: 400 });
//         }

//         // Send verification email for otp
       

//         // Hash password
//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);

//         // Create new user
//         const newUser = await prisma.user.create({
//             data: {
//                 email,
//                 password: hashedPassword
//             }
//         });

//         console.log(newUser);
//         const token = await generateToken(newUser);

//         console.log(token);
//         return NextResponse.json({
//             message: "User created successfully",
//             success: true,
//             token
//         });

//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     } finally {
//         await prisma.$disconnect(); // Close Prisma connection after operation
//     }
// }
