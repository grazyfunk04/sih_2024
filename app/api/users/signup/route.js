import { connString } from '@/lib/db';
import { User } from "@/lib/model/user"
import { Profile } from '@/lib/model/profile';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import bycrypt from "bcryptjs";

export async function POST(request) {
    try{
        const req = await request.json();
        const { name, email, password } = req;
        await mongoose.connect(connString);
    
        let user = new User({
            name : name,
            email : email,
            password : bycrypt.hashSync(password, 8)
        });
        
        let profile = new Profile({
            name : name,
            email : email
        });
        const result1 = await user.save();
        const result2 = await profile.save();
        const result = await (result1 && result2);

        return NextResponse.json({result, success:true});
    }catch(error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}