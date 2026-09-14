import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site') || 'ict';

    // Frontend ke mutabiq dynamic table mapping
    let tableName = 'ict_leads'; // Default ICT ke liye

    if (site === 'ict-business') {
      tableName = 'ictbusiness_leads';
    } else if (site === 'baco') {
      tableName = 'baco_applications';
    } else if (site === 'idt') {
      tableName = 'idt_leads'; // Agar IDT ki table ho
    }

    // .range(0, 9999) se 1000 ki limit khatam ho jaye gi aur saara data a jaye ga
    // ascending: true se data 1 se start ho kar 5904 tak seedha show hoga
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: true }) // Aap id ya created_at ke lihaz se order set kar sakte hain
      .range(0, 9999);

    if (error) {
      console.error(`Error fetching from ${tableName}:`, error.message);
      // Agar table mojood na ho ya koi error aaye toh app crash hone ki bajaye khali array bhej dega
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}