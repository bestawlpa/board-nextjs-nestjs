import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const token = await getToken({ req });
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url)); // รีไดเรกต์ไปยังหน้า login หากไม่มี token
    }
    return NextResponse.next(); // อนุญาตให้เข้าถึงหากมี token
}

export const config = {
    matcher: ['/protected/:path*', '/'], // กำหนดหน้าที่จะใช้ middleware
};
