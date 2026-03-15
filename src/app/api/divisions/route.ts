import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const departmentId = searchParams.get('department_id')

  let query = supabase.from('divisions').select('*').order('created_at', { ascending: true })

  if (departmentId) {
    query = query.eq('department_id', departmentId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  console.log('Division body:', body)

  const { data, error } = await supabase
    .from('divisions')
    .insert(body)
    .select()

  if (error) {
    console.log('Division error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}