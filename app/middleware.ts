import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; // Ensure your Prisma client is imported

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key"; // Replace with your actual secret key

export async function privateMiddleware(request: NextRequest) {

    console.log("Private Middleware");
    
  // Fetch authToken and userId from cookies
//   const authToken = request.cookies.get("videos_token")?.value;
//   const userId = request.cookies.get("userId")?.value;

  const authToken = localStorage.getItem("videos_token");
  const userId = localStorage.getItem("userId");

  // Redirect to login if no token or userId is found
  if (!authToken || !userId) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // Validate the token and user
    const decoded: any = jwt.verify(authToken, SECRET_KEY);

    if (decoded.id !== userId) {
      throw new Error("Token and userId mismatch");
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.token !== authToken) {
      throw new Error("Invalid or expired token");
    }

    // If everything is valid, proceed with the request
    return NextResponse.next();
  } catch (error: any) {
    console.error("Authentication Error:", error.message);
    // Redirect to login if validation fails
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// Apply the middleware to specific routes
export const config = {
    matcher: [
      "/:id*/videos",  // Protect /{userId}/videos route
      "/:id*/uploads", // Protect /{userId}/uploads route
    ],
  };
