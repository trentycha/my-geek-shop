import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Durand',
        firstname: 'Michel',
        mail: 'michel@gmail.com',
        password: '123456',
        phone: '0644125414',
        address: '14 avenue du jeune cheval, 33600 Pessac'
      },
      {
        name: 'Pallaro',
        firstname: 'Thomas',
        mail: 'thom.palla@gmail.com',
        password: '123456',
        phone: '0658629208',
        address: '5 Place Vincent Van Gogh'
      }
    ],
    skipDuplicates: true,
  });
  console.log('Created users:', users);

  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Figurine Totoro',
        price: 39.99,
        category: 'Ghibli',
        description: 'Figurine Totoro, issu du Ghibli \'Mon Voisin Totoro\'. Taille : 20cm. Poids : 2kg',
        stock: 6,
        weigth: 2.0,
        height: 20.0,
        material: 'PVC',
        brand: 'Studio Ghibli'
      },
      {
        name: 'Sabre Laser',
        price: 69.99,
        category: 'Star Wars',
        description: 'Sabre laser réaliste issu de la Licence Star Wars. S\'illumine et fais du bruit, comme si vous étiez dans les étoiles. Fonctionne avec piles.',
        stock: 9,
        weigth: 0.5,
        height: 100.0,
        material: 'Aluminium',
        brand: 'Warner Bros'
      }
    ],
    skipDuplicates: true,
  });
  console.log('Created products:', products);

  const card1 = await prisma.card.create({
    data: { userId: 1, productId: 1 }
  });
  console.log('Created card 1:', card1);

  const card2 = await prisma.card.create({
    data: { userId: 2, productId: 2 }
  });
  console.log('Created card 2:', card2);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });