'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_jwt_secret';

// Login Action
export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { user: null, token: null, isAuthenticated: false, message: 'User not found' };
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return { user: null, token: null, isAuthenticated: false, message: 'User not found' };
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

  return { user, token, message: 'success', isAuthenticated: true };
}

// Register Action
export async function register(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
  
    if (existingUser) {
      return { ok: false, msg: 'User already exists' };
    }
  
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  
    const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' });
  
    return { ok: true, msg: 'User created successfully', user: newUser, token };
  }
  
