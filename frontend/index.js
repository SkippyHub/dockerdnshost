import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from frontend!');
});

app.get('/call-backend', async (req, res) => {
  try {
    const response = await fetch('http://backend.docker/api/test');
    const data = await response.json();
    res.json({
      frontend: 'Hello from frontend!',
      backend: data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to call backend',
      details: error.message
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
}); 