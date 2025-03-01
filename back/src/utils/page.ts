import axios from "axios";

const URL: string = 'https://en.wikipedia.org/w/api.php';  	

interface RandomPageResponse {
  query: {
    random: Array<{
      id: number;
      ns: number;
      title: string;
    }>;
  };
};

export const getRandomPageTitle = async (): Promise<string> => {	
	const params = {
	  action: 'query',
	  list: 'random',
	  rnlimit: '1',
		rnnamespace: '0',
	  format: 'json',
	};

  const response = await axios.get<RandomPageResponse>(URL, { params });
  const title = response.data.query.random[0].title;
  return title;
};

interface PageContentResponse {
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        ns: number;
        title: string;
        extract?: string;
        missing?: boolean;
      };
    };
  };
};

export const getPageContent = async (title: string): Promise<string | undefined> => {
	const params = {
    action: 'query',
    prop: 'extracts',
    exintro: true,
    explaintext: true,
    titles: title,
    format: 'json',
  };

  const response = await axios.get<PageContentResponse>(URL, { params });
  const pages = response.data.query.pages;
	const pageId = Object.keys(pages)[0];
	const content = pages[pageId];

  return content.extract;
};