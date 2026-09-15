import { NextResponse } from 'next/server';
import { getSupabaseClientForSite } from '@/lib/supabase/multiClients';

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseClientForSite('idtpakistan');

    // Supabase table name check kar lena (jaise 'contact_messages_IDT' ya 'idt_contacts')
    const { data, error, count } = await supabase
      .from('contact_messages_IDT')
      .select('*', { count: 'exact' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      data: data || [], 
      count: count !== null ? count : (data ? data.length : 0) 
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}