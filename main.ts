// news-image-20261124 entry: writes the finished front page (drawn in art/front-page.svg, rendered to entry.png) to the grader's output.
// Node 22, standard library only, no network. MAKEFUN_OUTPUT_DIR replaces /output when running locally.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1048576;
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const image = readFileSync(new URL('./entry.png', import.meta.url));
const isPng = image.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
if (!isPng || image.length > MAX_BYTES) throw new Error('entry.png is not a PNG within the size limit');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), image);
