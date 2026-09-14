import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

const idtSupabaseUrl = process.env.NEXT_PUBLIC_IDT_SUPABASE_URL || '';
const idtSupabaseKey = process.env.IDT_SUPABASE_SERVICE_ROLE_KEY || '';
const idtSupabase = idtSupabaseUrl && idtSupabaseKey 
  ? createClient(idtSupabaseUrl, idtSupabaseKey, { auth: { persistSession: false } }) 
  : supabase;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site') || 'ict';

    let tableName = 'contact_messages';
    let activeClient = supabase;

    if (site === 'idt') {
      tableName = 'contact_messages_IDT';
      activeClient = idtSupabase;
    } else if (site === 'baco') {
      tableName = 'baco_contact';
    } else if (site === 'ict-business') {
       tableName = 'ictbusinessuk_contact'; // agar ict-business school ka alag ho
    } else if (site === 'ictbusinessuk') {
      tableName = 'ictbusinessuk_contact'; // <--- Yeh raha aapka ictbusinessuk ka real table!
    }

    const { data, error } = await activeClient
      .from(tableName)
      .select('*')
      .range(0, 9999);

    if (error) {
      console.error(`Error fetching from ${tableName}:`, error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    // Data mapping taake column names ka case/mismatch ka masla khatam ho jaye
    const formattedData = (data || []).map((item: any, index: number) => ({
      id: item.id || index + 1,
      name: item.name || item.Name || item.full_name || item['Full Name'] || 'N/A',
      email: item.email || item.Email || 'N/A',
      phone: item.phone || item.Phone || 'N/A',
      message: item.message || item.Message || item.subject || item.Subject || 'N/A',
      created_at: item.created_at || item.createdAt || item.date || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}