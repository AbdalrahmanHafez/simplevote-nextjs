import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const setSession = async (payload: object) => {
  if (!JWT_SECRET_KEY)
    throw new Error("JWT_SECRET_KEY is missing in .env file.");

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1y" });

  return (await cookies()).set("session", token, {
    httpOnly: true, // Prevents client-side access
    secure: true,
    path: "/", // Accessible from all pages
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
};

export const getSessionData = async () => {
  if (!JWT_SECRET_KEY)
    throw new Error("JWT_SECRET_KEY is missing in .env file.");

  try {
    const token = (await cookies()).get("session")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET_KEY) as unknown;

    return decoded;
  } catch (error) {
    console.error("[INFO] Invalid JWT Token:", error);
    return null;
  }
};

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
