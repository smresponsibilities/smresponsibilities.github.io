import { z } from 'astro/zod';
import meData from '../data/me.json';
import { TYPES } from './types';

// me.json is a single object, not a content collection (BUILD.md §3) — validated
// here instead of via content.config.ts. A bad type value throws at build time.
const meSchema = z.object({
  name: z.string(),
  species: z.string().max(40),
  types: z.array(z.enum(TYPES)).min(1).max(2),
  github: z.string(),
  dexNo: z.number().int().positive(),
  status: z.enum(['CAUGHT', 'RELEASED', 'UNCAUGHT']),
  height: z.string(),
  weight: z.string(),
});

export const me = meSchema.parse(meData);
