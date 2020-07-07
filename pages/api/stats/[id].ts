import fetch from 'isomorphic-unfetch';
import jsdom from 'jsdom';

const JSDOM = jsdom.JSDOM;
const fetchDelay = 1000 * 60 * 60; // Once an hour
const stats = {
  commits: { lastFetch: null, value: 0 },
  beers: { lastFetch: null, value: 0 },
  songs: { lastFetch: null, value: 0 },
  games: { lastFetch: null, value: 0 },
  books: { lastFetch: null, value: 0 }
};

async function getStat(id, url, callback) {
  const value = await fetch(url)
    .then(response => response.text())
    .then(html => {
      return callback(new JSDOM(html));
    });

  stats[id].value = value;
  return value;
}

export default async (req, res) => {
  const { query: { id } } = req;
  const now = (new Date()).getTime();

  if (!stats[id]) {
    res.status(404);
    return;
  }

  let value;
  const lastFetch = stats[id].lastFetch;

  if (!lastFetch || now - lastFetch > fetchDelay) {
    stats[id].lastFetch = now;

    switch(id) {
      case 'commits':
        value = await getStat('commits', 'https://github.com/willread', dom => {
          console.log('dom', dom);
          return dom.window.document
            .querySelector('.js-yearly-contributions h2')
            .innerHTML.replace(/[^0-9]/g, '');
        });
      break

      case 'beers':
        value = await getStat('beers', 'http://untappd.com/user/williamread', dom => {
          return dom.window.document
            .querySelector('.stats [data-href=":stats/beerhistory"]')
            .innerHTML.replace(/[^0-9]/g, '');
        });
      break;

      case 'songs':
        value = await getStat('songs', 'http://soundcloud.com/will_read', dom => {
          return dom.window.document
            .querySelector('[property="soundcloud:sound_count"]').content;
        });
      break;

      case 'games':
        value = await getStat('games', 'https://steamcommunity.com/id/mr-bill', dom => {
          return dom.window.document
            .querySelectorAll('.showcase_stat .value')[0]
            .innerHTML
            .replace(/[^0-9]/g, '');
        });
      break;

      case 'books':
        value = await getStat('books', 'https://www.goodreads.com/user/show/12302339-william', dom => {
          return dom.window.document
            .querySelector('a[href="/review/list/12302339?shelf=read"]')
            .innerHTML
            .replace(/[^0-9]/g, '');
        });
      break;
    }

    console.log(`Retrieving fresh value for ${id}`);
  } else {
    value = stats[id].value;
    console.log(`Returning value for ${id} from cache`);
  }

  res.status(200).json({ value });
}
