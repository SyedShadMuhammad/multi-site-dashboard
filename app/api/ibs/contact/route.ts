import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase/multiClients';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site') || 'ictbusinessschool';
    const supabase = getSupabaseAdminClient(site);

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}