// js/api.js: data layer for Worksheet P10 (fetch + response.ok + JSON).
// The only file that calls fetch. Rendering stays in js/dom.js.

// The address is written once, here. A local file is used (allowed by the
// worksheet when a public API cannot be reached). To use a public API later,
// change this one line.
const URL = './news.json';

export async function fetchNews() {
  try {
    const response = await fetch(URL);
    console.log('status', response.status, 'ok', response.ok);

    // fetch does not reject on 404 / 500, so check response.ok first.
    if (!response.ok) throw new Error('status ' + response.status);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('failed to load', error.message);
    throw error;
  }
}
