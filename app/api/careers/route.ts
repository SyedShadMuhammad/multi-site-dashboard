import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// Agar IDT ke liye alag database client hai toh usay bhi import karein (jaise baaki leads routes mein hota hai)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site') || 'baco';

    // Site ke mutabiq table ka naam select karna
    let tableName = 'baco_applications';
    if (site === 'ict') {
      tableName = 'ict_applications'; // Ya jo bhi ICT ki careers table ka naam ho
    } else if (site === 'idt') {
      tableName = 'idt_applications'; // Ya jo bhi IDT ki careers table ka naam ho
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .range(0, 9999);

    if (error) {
      console.error(`Error fetching from ${tableName}:`, error.message);
      // Agar us site ki table mojood nahi hai toh empty array return kar dein taake error na aaye
      return NextResponse.json({ success: true, data: [], message: `No table found for ${site}` });
    }

    const formattedData = (data || []).map((item: any, index: number) => ({
      id: item.id || index + 1,
      name: item['Full Name'] || item.full_name || item.name || 'N/A',
      email: item.Email || item.email || 'N/A',
      phone: item.Phone || item.phone || 'N/A',
      position: item.Position || item.position || 'N/A',
      experience: item['Years of Experience'] || item.years_of_experience || item.experience || 'N/A',
      cvUrl: item['CV URL'] || item.cv_url || item.resume || item.cv || '#',
      created_at: item.created_at || item.createdAt || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}