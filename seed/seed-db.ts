import { initialData } from './seed';
import prisma from '../lib/prisma';

async function main() {

    // 1. Borrar registros de pruebas
    await Promise.all([
        prisma.video.deleteMany(),
        prisma.user.deleteMany(),
    ])

    const { users, resources } = initialData

    const usersData = users.map(user => ({ ...user}))    
    
    // 2. Crear registros de pruebas
    // crear usuario unico
    const createdUser = await prisma.user.create({
        data: {
            name: 'Juna',
            email: 'juna@gmail.com',
            password: '$2b$10$0/kYONqk.8joIe3OVAFOYu6BIwF6URJhcfSK4LgilQHyk83hBWLom',
        }
    })

    // los videos tienen the foreign key userId lo necesito añadir para que  no falle
    const videosWithUserId = resources.map(video => ({
        ...video,
        userId: createdUser.id,
    }));

    // crear los demas usuarios y los videos con usuario inicial de prueba
    await prisma.user.createMany({ data: usersData })
    await prisma.video.createMany({
        data: videosWithUserId,
    });
    console.log('Seed executed correctly');
    
}

(() => {

    if (process.env.NODE_ENV === 'production') return;

    main();
})()