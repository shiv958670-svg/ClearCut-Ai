import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a JPG or PNG image.' },
        { status: 400 }
      );
    }

    const maxSize = 12 * 1024 * 1024; // 12MB
    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 12MB.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.REMOVE_BG_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured.' },
        { status: 500 }
      );
    }

    const removeBgForm = new FormData();
    removeBgForm.append('image_file', imageFile);
    removeBgForm.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: removeBgForm,
    });

    if (!response.ok) {
      let errorMessage = 'Background removal failed.';
      try {
        const errorData = await response.json();
        if (errorData.errors && errorData.errors.length > 0) {
          errorMessage = errorData.errors[0].title || errorMessage;
        }
      } catch {}

      if (response.status === 402) {
        errorMessage = 'API credits exhausted. Please check your remove.bg account.';
      } else if (response.status === 403) {
        errorMessage = 'Invalid API key.';
      } else if (response.status === 429) {
        errorMessage = 'Too many requests. Please try again later.';
      }

      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const creditsCharged = response.headers.get('X-Credits-Charged') || '1';

    return NextResponse.json({
      success: true,
      image: `data:image/png;base64,${base64Image}`,
      creditsCharged,
    });
  } catch (error) {
    console.error('Remove BG API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
