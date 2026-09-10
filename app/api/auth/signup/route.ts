// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log("================ SIGNUP ATTEMPT ================");
    console.log("📧 Email:", email);

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    // Supabase table ('multisite') mein naya user insert karna
    const { data, error } = await supabase
      .from('multisite')
      .insert([
        { 
          email: email, 
          role: 'user', // Default role for new signups
          token_snippet: 'signup_registered_' + Date.now().toString().slice(-6) 
        }
      ]);

    if (error) {
      console.error("🔥 Signup Database Error:", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    console.log("✅ SIGNUP SUCCESSFUL & SAVED TO DATABASE!");
    console.log("===============================================");

    return NextResponse.json({ success: true, message: 'Account created successfully' });
  } catch (err) {
    console.error("🔥 Signup Error:", err);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}