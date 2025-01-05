import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ message: "Text is required" }), { status: 400 });
    }

    const url = "https://api.play.ht/api/v2/tts/stream";
    const options = {
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "content-type": "application/json",
        "X-USER-ID": '6STQvQD4W5YZZgpyNtU3v6n6gfs2',
        AUTHORIZATION: 'dd14213923da4048b6fd957dbb2fd054',
      },
      body: JSON.stringify({
        voice_engine: 'Play3.0',
        text,
        voice: "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
        output_format: "mp3",
        sample_rate: "44100",
        speed: 1,
      }),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error from PlayHT API: ${response.statusText}`);
    }

    const filePath = path.join(process.cwd(), 'public', 'audio.mp3');
    const fileStream = fs.createWriteStream(filePath);

    response.body.pipe(fileStream);

    await new Promise((resolve, reject) => {
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
    });

    return new Response(JSON.stringify({ audioUrl: '/audio.mp3' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error generating audio:', error);
    return new Response(JSON.stringify({ message: 'Failed to generate audio' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
