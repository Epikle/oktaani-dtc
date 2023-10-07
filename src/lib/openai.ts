import OpenAI from 'openai';
import 'server-only';

if (process.env.OPENAI_API_KEY === undefined) {
  throw new Error('env OPENAI_API_KEY missing');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
