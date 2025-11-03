import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Add your seed data here
  // Example:
  // const user = await prisma.user.create({
  //   data: {
  //     email: "test@example.com",
  //     name: "Test User",
  //   },
  // });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

