import { connString } from '@/lib/db';
import { User } from "@/lib/model/user"
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

mongoose.connect(connString);

export async function POST(request) {
    try {

        const req = await request.json();
        const { email, password } = req;

        //check if user exist
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error : "User does not exist"}, {status:400})
        }
        
        //check if password is correct
        const validPassword = await bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return NextResponse.json({error: "Invalid Password"}, {status:400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
        
        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })
        
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    }catch(error) {
        return NextResponse.json({error: error.message},{ status:500 })
    }
}