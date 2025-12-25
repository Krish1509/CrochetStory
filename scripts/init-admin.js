import dbConnect from '../lib/db';
import Admin from '../models/Admin';
import { hashPassword } from '../lib/auth';

async function initAdmin() {
  try {
    await dbConnect();
    
    const username = process.argv[2] || 'admin';
    const password = process.argv[3] || 'admin123';

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    const passwordHash = await hashPassword(password);
    await Admin.create({ username, passwordHash });

    console.log('Admin created successfully!');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

initAdmin();

