// app/api/ictbusinessuk/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site') || 'ictbusinessuk'; // Dynamic site parameter
    const type = searchParams.get('type'); // contact, customers, courses, orders, order-items, payments

    // Site ke mutabiq dynamic prefix (jaise ictbusinessuk_)
    const prefix = site; 

    let tableName = `${prefix}_contact`; // default

    if (type === 'contact') {
      tableName = `${prefix}_contact`;
    } else if (type === 'customers') {
      tableName = `${prefix}_customers`;
    } else if (type === 'courses') {
      tableName = `${prefix}_courses`;
    } else if (type === 'orders') {
      tableName = `${prefix}_orders`;
    } else if (type === 'order-items' || type === 'order_items') {
      tableName = `${prefix}_order_items`;
    } else if (type === 'payments') {
      tableName = `${prefix}_payments`;
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .range(0, 9999);

    if (error) {
      console.error(`Error fetching from ${tableName}:`, error.message);
      // Agar table mojood na ho toh empty array return karein taake dashboard crash na ho
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}