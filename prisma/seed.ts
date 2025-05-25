import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required");
  }

  // 🔐 Admin user aanmaken (indien nog niet bestaat)
  let admin = await prisma.user.findUnique({ where: { email } });

  if (!admin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    admin = await prisma.user.create({
      data: {
        email,
        name: "Admin",
        hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("✅ Admin user created");
  } else {
    console.log("ℹ️ Admin user already exists");
  }

  // 📝 Blogpost toevoegen (indien nog niet bestaat)
  const slug = "ultieme-ontspanning-massagestoel";
  const existingPost = await prisma.post.findUnique({ where: { slug } });

  if (!existingPost) {
    await prisma.post.create({
      data: {
        title: "Ultieme ontspanning: waarom een massagestoel thuishoort in elk huis",
        slug,
        description: "Ontdek hoe een massagestoel bijdraagt aan jouw welzijn, dagelijkse ontspanning en fysieke gezondheid.",
        content: "<h1> test </h1> ",
        metaTitle: "Waarom een massagestoel jouw leven verandert | Relax-Time",
        metaDescription: "Lees hoe een massagestoel dagelijkse stress vermindert en bijdraagt aan herstel en ontspanning.",
        createdById: admin.id,
      },
    });

    console.log("✅ Blogpost created");
  } else {
    console.log("ℹ️ Blogpost already exists");
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
