import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Test connection
    await db.$connect()
    console.log('Connected to database')
    
    // Count users
    const userCount = await db.user.count()
    console.log('User count:', userCount)
    
    return NextResponse.json({
      success: true,
      message: 'Database connected',
      userCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}