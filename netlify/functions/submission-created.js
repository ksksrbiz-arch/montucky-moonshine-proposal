// submission-created.js
// Netlify event function — runs after every Netlify Forms submission.
// Persists the raw payload into Netlify Blobs under the store
// "form-submissions", keyed by  <form_name>/<submission-id>.
//
// Store layout
//   form-submissions/
//     contact/<id>   → { id, form, submittedAt, data: { name, email, … } }
//     booking/<id>   → { id, form, submittedAt, data: { name, email, … } }

'use strict';

const { getStore } = require('@netlify/blobs');

// Lightweight collision-resistant ID: timestamp (ms) + 6 random hex bytes
function makeId() {
  const ts  = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 10);
  return `${ts}-${rnd}`;
}

exports.handler = async function handler(event) {
  let id       = makeId();
  let formName = 'unknown';

  try {
    const raw = JSON.parse(event.body || '{}');
    // Netlify wraps the submission in a `payload` key
    const payload = raw.payload || raw;

    // Prefer Netlify's own submission ID for natural idempotency
    id        = payload.id || makeId();
    formName  = (payload.form_name || 'unknown').toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const submittedAt = payload.created_at || new Date().toISOString();

    // Strip internal Netlify fields; keep only user-supplied data
    const data = Object.assign({}, payload.data || {});
    delete data.ip;
    delete data['bot-field'];

    const record = { id, form: formName, submittedAt, data };

    const store = getStore('form-submissions');
    await store.setJSON(`${formName}/${id}`, record, { metadata: { form: formName } });

    console.log(`[submission-created] stored ${formName}/${id}`);
    return { statusCode: 200 };
  } catch (err) {
    // Always return 200: Netlify retries on non-2xx, and the submission
    // is already saved by Netlify Forms — a retry would write a duplicate.
    // We log the error so it is visible in Netlify Function logs.
    console.error(`[submission-created] failed to store ${formName}/${id}:`, err.message || err);
    return { statusCode: 200 };
  }
};
