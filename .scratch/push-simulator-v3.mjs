import fs from 'node:fs';
import { execSync } from 'node:child_process';

const content = fs.readFileSync('D:/portfolio/.scratch/sunroom-simulator-v3.html');
const base64 = content.toString('base64');
const currentSha = execSync('gh api repos/smresponsibilities/productivity-caller-simulator/contents/index.html --jq .sha', { encoding: 'utf-8' }).trim();

const payload = {
  message: 'Update simulator: 1-to-1 default call UI and Sunroom cat companion after call',
  content: base64,
  sha: currentSha
};

fs.writeFileSync('D:/portfolio/.scratch/update_index_payload.json', JSON.stringify(payload));

try {
  const res = execSync('gh api -X PUT repos/smresponsibilities/productivity-caller-simulator/contents/index.html --input D:/portfolio/.scratch/update_index_payload.json', { encoding: 'utf-8' });
  console.log('index.html pushed successfully!');
} catch (e) {
  console.error('Push error:', e.message);
} finally {
  fs.unlinkSync('D:/portfolio/.scratch/update_index_payload.json');
}
