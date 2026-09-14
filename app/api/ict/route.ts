import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase/multiClients';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site') || 'ict';
    const type = searchParams.get('type'); // certificates, complaints, feedback, hard-copy, leads

    const supabase = getSupabaseAdminClient(site);

    let tableName = '';

    if (type === 'Certificates') {
      tableName = 'certificates';
    } else if (type === 'complaints') {
      tableName = 'complaints';
    } else if (type === 'feedback') {
      tableName = 'feedback_submissions';
    } else if (type === 'hard-copy' || type === 'hardCopy') {
      tableName = 'hard_copy_requests';
    } else if (type === 'leads' || type === 'ict-leads') {
      tableName = 'ict_leads';
    } else {
      return NextResponse.json({ success: true, data: [] });
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: false }); // ya created_at ke mutabiq

    if (error) {
      console.error(`Error fetching ${tableName}:`, error.message);
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}