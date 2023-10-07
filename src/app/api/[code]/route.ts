import { NextResponse } from 'next/server';
import { notFound } from 'next/navigation';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { db } from '@/lib/db';
import { openai } from '@/lib/openai';

function generatePrompt(code: string) {
  return `Please provide a brief explanation of the following car diagnostic trouble code. 
  If you don't know what it means or if the code is not a proper diagnostic trouble code, 
  please respond with 'no explanation found', don't try to make up an answer. 
  Code: ${code}`;
}

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  const { code } = params;

  const codeData = await db.dtc.findFirst({
    where: { codeTitle: code },
  });

  if (!codeData) return notFound();
  if (codeData.gptInfo) return NextResponse.json(codeData.gptInfo);

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    stream: true,
    messages: [
      {
        role: 'user',
        content: generatePrompt(codeData.codeTitle),
      },
    ],
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await db.dtc.update({
        where: { codeTitle: codeData.codeTitle },
        data: {
          gptInfo: completion,
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
}
