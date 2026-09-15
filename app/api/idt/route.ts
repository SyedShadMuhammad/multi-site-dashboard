import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const idtSupabaseUrl = process.env.NEXT_PUBLIC_IDT_SUPABASE_URL || '';
const idtKey = process.env.IDT_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_IDT_SUPABASE_ANON_KEY || '';

export async function GET() {
  try {
    const supabase = createClient(idtSupabaseUrl, idtKey);

    // Apni IDT ki table ka naam yahan likhein (jaise contact_messages_IDT)
    const { data, error } = await supabase
      .from('contact_messages_IDT')
      .select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server Error' }, { status: 500 });
  }
}