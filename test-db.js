const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🔍 Testing database connection...')
    console.log('📍 Using DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'MISSING!')
    
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
    
    const userCount = await prisma.user.count()
    console.log(`📊 Users in database: ${userCount}`)
    
    console.log('\n🔍 Testing table access...')
    const users = await prisma.user.findMany({ take: 1 })
    console.log('✅ Can read from users table')
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.error('\nFull error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()