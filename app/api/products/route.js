import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Product from '../../../models/Product';
import { verifyToken } from '../../../lib/auth';

async function isAuthenticated(request) {
  const token = request.cookies.get('adminToken')?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { name, description, price, category, images } = body;

    if (!name || !description || !price || !category || !images || images.length === 0) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

