import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  try {
    // Read from the local prompts directory within the project
    const baseDir = path.join(process.cwd(), 'src', 'prompts');
    const fullPath = path.join(baseDir, filePath);

    // Security check: ensure the path is within the expected directory
    const resolvedPath = path.resolve(fullPath);
    const resolvedBase = path.resolve(baseDir);
    
    if (!resolvedPath.startsWith(resolvedBase)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 403 });
    }

    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const content = fs.readFileSync(resolvedPath, 'utf-8');
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}

