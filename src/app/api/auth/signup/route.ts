import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    console.log("Signup API called")
    
    const body = await req.json()
    console.log("Request body:", { ...body, password: "[REDACTED]" })
    
    const { email, password, name } = body

    if (!email || !password) {
      console.log("Missing required fields")
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    console.log("Checking for existing user...")
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log("User already exists")
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      )
    }

    console.log("Hashing password...")
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log("Creating user...")
    const user = await db.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
      }
    })

    console.log("User created successfully:", user.id)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    )
  }
}