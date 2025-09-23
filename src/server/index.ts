import express from 'express';
import { assistantMessageHandler } from './api/assistant-message';

const app = express();
app.use(express.json());

app.post('/api/assistant-message', assistantMessageHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Assistant API server running on port ${PORT}`);
});
