'use server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_jwt_secret';

// Login Action
export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { user: null, token: null, isAuthenticated: false, message: 'Invalid credentials' };
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return { user: null, token: null, isAuthenticated: false, message: 'Invalid credentials' };
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  await prisma.user.update({
    where: { id: user.id },
    data: { token },
  });

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

    await prisma.user.update({
      where: { id: newUser.id },
      data: { token }, // Store the token in the database
    });
  
    return { ok: true, msg: 'User created successfully', user: newUser, token };
  }
  


/**
 * Validates a token and returns the corresponding user if it is valid.
 *
 * @param token - The token to validate
 *
 * @returns An object containing a boolean indicating if the token is valid and
 * the corresponding user if it is. If the token is invalid, it returns an
 * object with isAuthenticated set to false.
 * @example
 * const result = await validateToken('some token');
 * if (result.isAuthenticated) {
 *   console.log(result.user);
 * }
 */
  export async function validateTokenAction(token: string) {
    console.log('token ON ACTION', token);
    
    try {
      const decoded: any = jwt.verify(token, SECRET_KEY);
  
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user || user.token !== token) {
        throw new Error('Invalid or expired token');
      }
  
      return {
        isAuthenticated: true,
        user: { id: user.id, name: user.name, email: user.email },
      };
    } catch (error) {
      return { isAuthenticated: false };
    }
  }

  /**
   * Logs out a user by removing their token from the database.
   *
   * @param userId - The id of the user to log out.
   */
  export async function logout(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { token: null },
    });
  }
  

  
