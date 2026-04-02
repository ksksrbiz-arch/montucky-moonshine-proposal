import { readFileSync } from 'fs';
import { createHash } from 'crypto';

const SITE_ID = '234b1eef-8dd1-4d7b-9638-437a9109b184';
const PROXY_PATH = process.argv[2];

// Calculate SHA1 for each file
function sha1(filepath) {
  const content = readFileSync(filepath);
  return createHash('sha1').update(content).digest('hex');
}

const files = {
  '/index.html': sha1('index.html'),
  '/netlify.toml': sha1('netlify.toml'),
  '/README.md': sha1('README.md'),
};

console.log('File hashes:', files);

async function deploy() {
  // Step 1: Create deploy with file digests
  const createResp = await fetch(`${PROXY_PATH}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'X-Netlify-Api-Path': `/api/v1/sites/${SITE_ID}/deploys`
    },
    body: JSON.stringify({ files })
  });
  
  if (!createResp.ok) {
    console.log('Create deploy failed:', createResp.status, await createResp.text());
    
    // Try alternative: direct API call
    console.log('\nTrying direct API...');
    const directResp = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ files })
    });
    console.log('Direct status:', directResp.status);
    const directBody = await directResp.text();
    console.log('Direct body:', directBody.substring(0, 500));
    return;
  }
  
  const deployData = await createResp.json();
  console.log('Deploy created:', deployData);
}

deploy().catch(e => console.error('Error:', e.message));
