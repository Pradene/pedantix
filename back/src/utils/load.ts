import * as path from 'path';
import * as fs from 'fs';

// Load the GloVe embeddings into memory
const loadGloveModel = (gloveFilePath: string) => {
  const gloveModel: { [word: string]: number[] } = {};
  const fileContent = fs.readFileSync(gloveFilePath, 'utf-8');
  const lines = fileContent.split('\n');

  lines.forEach(line => {
    const values = line.split(' ');
    const word = values[0];
    const vector = values.slice(1).map(Number);
    gloveModel[word] = vector;
  });

  console.log("GloVe model loaded successfully!");
  return gloveModel;
};

// Load the GloVe 50D model (adjust file path if needed)
export const gloveModel = loadGloveModel(path.resolve(__dirname, '../../glove.6B.50d.txt'));