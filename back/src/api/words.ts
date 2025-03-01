import { Request, Response, Router } from 'express';

import { gloveModel } from '../utils/model';
import { cosineSimilarity } from '../utils/similarity';

const router = Router();

// API endpoint to get semantic similarity between two words
router.post('/similarity', (req: Request, res: Response) => {
  const { word1, word2 } = req.body;

  if (!word1 || !word2) {
    res.status(400).json({ error: "Both 'word1' and 'word2' are required!" });
    return;
  }

  // Check if both words are in the GloVe model
  if (!(word1 in gloveModel) || !(word2 in gloveModel)) {
    res.status(404).json({ error: "One or both words are not in the GloVe model!" });
    return;
  }

  // Get the word vectors
  const vector1 = gloveModel[word1];
  const vector2 = gloveModel[word2];

  // Calculate the cosine similarity between the two word vectors
  const similarity = cosineSimilarity(vector1, vector2);

  // Return the similarity score
  res.json({ word1, word2, similarity });
});

export default router;
