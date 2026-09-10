// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log("================ LOGIN ATTEMPT ================");
    console.log("📧 Email Entered:", email);

    const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';

    // 1. Default admin check
    if (email === 'admin@multisite.com' && password === 'admin123') {
      const token = jwt.sign({ email, role: "admin", loginTime: Date.now() }, secretKey, { expiresIn: '1d' });
      
      const cookieStore = await cookies();
      cookieStore.set({ name: 'auth_token', value: token, httpOnly: true, path: '/', maxAge: 86400, sameSite: 'lax' });

      return NextResponse.json({ success: true, message: 'Login successful' });
    }

    // 2. Supabase database check for registered users
    const { data: users, error } = await supabase
      .from('multisite')
      .select('*')
      .eq('email', email);

    if (error || !users || users.length === 0) {
      console.log("❌ LOGIN FAILED: Email not found in database");
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    const user = users[0];
    const token = jwt.sign({ email: user.email, role: user.role || 'user', loginTime: Date.now() }, secretKey, { expiresIn: '1d' });

    await supabase
      .from('multisite')
      .update({ token_snippet: token.substring(0, 20) + '...' })
      .eq('id', user.id);

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400,
      sameSite: 'lax',
    });

    console.log("✅ LOGIN SUCCESSFUL FOR:", email);
    console.log("===============================================");

    // Clean and correct return statement
    return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });

  } catch (err) {
    console.error("🔥 Login Error:", err);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}