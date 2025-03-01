import express from 'express';
import cors from 'cors';

import pageRoutes from './api/page';
import wordsRoutes from './api/words';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/page/', pageRoutes);
app.use('/api/words/', wordsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
