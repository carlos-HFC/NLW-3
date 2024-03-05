import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.user.deleteMany();
  await prisma.orphanage.deleteMany();

  await Promise.all([
    prisma.orphanage.create({
      data: {
        name: "Orfanato Esperança",
        about: "Presta assistência a crianças de 6 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.",
        instructions: "Veja como se sentir a vontade e traga muito amor e paciência para dar.",
        openingHours: "Das 8h às 18h",
        openOnWeekends: true,
        whatsapp: "+5511992931142",
        latitude: -23.5505,
        longitude: -46.6333,
        aproved: true,
        images: {
          create: [
            { path: "https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg" },
            { path: "https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg" },
            { path: "https://images.pexels.com/photos/2406271/pexels-photo-2406271.jpeg" },
          ]
        }
      }
    }),
    prisma.orphanage.create({
      data: {
        name: "Casa dos Anjinhos",
        about: "Descubra como fazer a diferença na vida de crianças carentes em nosso orfanato.",
        instructions: "Todos são bem-vindos para espalhar alegria e amor para nossas crianças!",
        openingHours: "Das 9h às 18h",
        openOnWeekends: false,
        whatsapp: "+5511995938840",
        latitude: -23.5505,
        longitude: -46.6361,
        aproved: true,
        images: {
          create: [
            { path: "https://images.pexels.com/photos/8535230/pexels-photo-8535230.jpeg" },
            { path: "https://images.pexels.com/photos/8422104/pexels-photo-8422104.jpeg" },
          ]
        }
      }
    }),
    prisma.orphanage.create({
      data: {
        name: "Lar Acolhedor",
        about: "Saiba como contribuir para o bem-estar das crianças em nosso orfanato.",
        instructions: "Fiquem à vontade para conhecer e interagir com nossas crianças.",
        openingHours: "Das 10h às 18h",
        openOnWeekends: false,
        whatsapp: "+5511941287786",
        latitude: -23.5631,
        longitude: -46.6544,
        aproved: false,
        images: {
          create: [
            { path: "https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg" },
            { path: "https://images.pexels.com/photos/8087928/pexels-photo-8087928.jpeg" },
            { path: "https://images.pexels.com/photos/8535193/pexels-photo-8535193.jpeg" },
            { path: "https://images.pexels.com/photos/8422105/pexels-photo-8422105.jpeg" },
            { path: "https://images.pexels.com/photos/8554153/pexels-photo-8554153.jpeg" },
          ]
        }
      }
    }),
    prisma.orphanage.create({
      data: {
        name: "Abrigo dos Sonhos",
        about: "Descubra como podemos juntos proporcionar um futuro melhor para as crianças do nosso orfanato.",
        instructions: "Esteja preparado para interações breves e mantenha uma atitude respeitosa e compassiva.",
        openingHours: "Das 8h às 18h",
        openOnWeekends: false,
        whatsapp: "+5511978521184",
        latitude: -23.682,
        longitude: -46.5953,
        aproved: false,
        images: {
          create: [
            { path: "https://images.pexels.com/photos/8457969/pexels-photo-8457969.jpeg" },
            { path: "https://images.pexels.com/photos/8535169/pexels-photo-8535169.jpeg" },
            { path: "https://images.pexels.com/photos/8087973/pexels-photo-8087973.jpeg" },
            { path: "https://images.pexels.com/photos/5428267/pexels-photo-5428267.jpeg" },
          ]
        }
      }
    }),
  ]);

  await prisma.user.create({
    data: {
      email: "chfcchfc96@gmail.com",
      name: "Carlos",
      password: "$2b$10$cC5pYoa6Ne.Myx0KootR9ejBsbGm.DJEAkadn3T6tYuFjgnJ1AicK",
      superUser: true
    }
  });
}

main();