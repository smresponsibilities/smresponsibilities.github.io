import fs from 'node:fs';
import { execSync } from 'node:child_process';

const filePath = 'D:/productivity-caller/design_prototypes/sunroom/assets/cat-scene-states.png';
const base64 = fs.readFileSync(filePath).toString('base64');
console.log('Scene size:', fs.statSync(filePath).size);

const payload = {
  message: 'Add authentic Sunroom cat scene states asset',
  content: base64
};

fs.writeFileSync('D:/portfolio/.scratch/scene_payload.json', JSON.stringify(payload));

try {
  const res = execSync('gh api -X PUT repos/smresponsibilities/productivity-caller-simulator/contents/assets/cat-scene-states.png --input D:/portfolio/.scratch/scene_payload.json', { encoding: 'utf-8' });
  console.log('Uploaded cat-scene-states.png successfully');
} catch (e) {
  console.error('Upload failed:', e.message);
} finally {
  fs.unlinkSync('D:/portfolio/.scratch/scene_payload.json');
}
