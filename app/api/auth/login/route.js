import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Admin from '../../../../models/Admin';
import { comparePassword, generateToken } from '../../../../lib/auth';

export async function POST(request) {
  try {
    await dbConnect();

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, admin.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken({ id: admin._id, username: admin.username });

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

