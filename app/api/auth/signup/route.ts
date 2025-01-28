const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
export async function POST(req) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password ) {
    return new Response("Email, Password, and Phone number are required.", { status: 400 });
  }


  // Save the user to your database (replace with your DB logic)
  // Example: Prisma
  await prisma.user.create({
    data: { email, password },
  });

  return new Response("User created successfully!", { status: 201 });
}
