import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  console.log('Body received:', body)

  const { data, error } = await supabase
    .from('doctors')
    .insert({
      name_en: body.name_en,
      title: body.title,
      specialties: body.specialties,
      department: body.department,
      email: body.email,
      extension: body.extension,
      phone: body.phone,
      image_url: body.image_url,
    })
    .select()

  if (error) {
    console.log('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}