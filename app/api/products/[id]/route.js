import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Product from '../../../../models/Product';
import { verifyToken } from '../../../../lib/auth';

async function isAuthenticated(request) {
  const token = request.cookies.get('adminToken')?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function PUT(request, { params }) {
  try {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { id } = params;
    const body = await request.json();
    const { name, description, price, category, images } = body;

    if (!name || !description || !price || !category || !images || images.length === 0) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, images },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { id } = params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

