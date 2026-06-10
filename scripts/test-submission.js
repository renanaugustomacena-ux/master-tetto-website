const url = 'https://formspree.io/f/mbdejved';
const data = new URLSearchParams();
data.append('nome', 'Test Automatica');
data.append('telefono', '1234567890');
data.append('email', 'test@test.it');
data.append('messaggio', 'Questo è un test automatico per verificare il form.');
data.append('privacy', 'on');

async function testSubmission() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' },
    });
    
    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

testSubmission();
