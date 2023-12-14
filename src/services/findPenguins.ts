import { penguinImages } from "@";

import Service from "@schemas/Service";
import Log from "@schemas/Log";

import { Level } from "@enums/level";


interface GoogleResult {
  kind: string;
  url: {
    type: string;
    template: string;
  };
  queries: Queries,
  context: {
    title: string;
  };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  spelling: {
    correctedQuery: string;
    htmlCorrectedQuery: string;
  };
  items: Item[]
}

interface Queries {
  request: unknown,
  nextPage: {
    title: string;
    totalResults: string;
    searchTerms: string;
    count: number;
    startIndex: number;
    inputEncoding: string;
    outputEncoding: string;
    safe: string;
    cx: string;
  }[]
}

interface Item {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime: string;
  image: {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  }
}

export default new Service({
  name: "Find Penguins",
  handler: async () => {
    const images: string[] = [];

    // repeat searching for images until we have until the &start parameter is 100 or greater 
    for (let i = 1; i < 200; i += 10) {
      const request = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}&q=penguin nature&searchType=image&start=${i}`);
      const response = await request.json() as GoogleResult;

      for (const item in response.items) 
        images.push(response.items[item].link);
    }

    penguinImages.splice(0, penguinImages.length);
    penguinImages.push(...images);

    Log.emit(`Found ${penguinImages.length} penguin images.`, Level.Debug);
  },
  options: {
    priority: 999,
    interval: 60_000 * 60 * 6,
    startImmediately: true,
    halt: true
  }
})