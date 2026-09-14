import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase/multiClients';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site') || 'bacoconsultants';
    const type = searchParams.get('type'); // 'applications' ya 'contact'

    const supabase = getSupabaseAdminClient(site);

    let tableName = '';

    if (type === 'applications' || type === 'baco_applications') {
      tableName = 'baco_applications';
    } else if (type === 'contact' || type === 'baco_contact') {
      tableName = 'baco_contact';
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Please provide a valid type (applications or contact)' 
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from(tableName)
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