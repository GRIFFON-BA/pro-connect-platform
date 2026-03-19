const CLOUD_NAME = 'JOUW_CLOUD_NAME_HIER';
const UPLOAD_PRESET = 'JOUW_UNSIGNED_PRESET_HIER';

const form = document.getElementById('upload-form');
const statusEl = document.getElementById('status');
const urlOutput = document.getElementById('url-output');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('image');
  const file = fileInput.files[0];

  if (!file) {
    statusEl.textContent = 'Kies eerst een bestand.';
    return;
  }

  statusEl.textContent = 'Bezig met uploaden...';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();

    if (data.error) {
      console.error(data.error);
      statusEl.textContent = 'Upload mislukt: ' + data.error.message;
      return;
    }

    const imageUrl = data.secure_url;
    statusEl.textContent = 'Upload gelukt!';
    urlOutput.textContent = `Afbeeldings-URL: ${imageUrl}`;

    console.log('Deze URL moet in projects.json:', imageUrl);

    // Hier kun je:
    // - de URL naar je backend sturen
    // - of hem handmatig kopiëren en in projects.json plakken
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Er ging iets mis bij het uploaden.';
  }
});
