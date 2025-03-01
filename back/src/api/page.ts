import { Request, Response, Router } from 'express';

import { getRandomPageTitle, getPageContent } from '../utils/page';
import { splitString } from '../utils/split';
import { setCache, getCache } from '../redis';

const router = Router();

router.get('/random', async (req: Request, res: Response) => {
    const title = await getRandomPageTitle();
    const content = await getPageContent(title);

    if (!content) {
        res.status(400).json({ error: 'Page have no content' });
        return
    }

    const words = splitString(content);
    console.log(words);
    const key = title;
    await setCache(key, words);

    const cachedWords = await getCache(key);
    console.log('Words:', cachedWords);

    res.json({
      title: title,
      content: content
    });
});

export default router;