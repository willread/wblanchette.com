import fetch from 'isomorphic-unfetch';
import jsdom from 'jsdom';

const JSDOM = jsdom.JSDOM;
const fetchDelay = 1000 * 60 * 60; // Once an hour
const stats = {
  repos: 0
};
let lastFetch;

// url: 'http://untappd.com/user/williamread',
// expression: `document.querySelector('.stats [data-href=":stats/beerhistory"]').innerHTML.replace(/[^0-9]/g, '');`

function getStat(url, key, callback) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      const dom = new JSDOM(html);

      count = dom.window.document
        .querySelector("a[href='/willread?tab=repositories'] .Counter")
        .innerHTML.replace(/[^0-9]/g, '');

      console.log('Fetched updated repo count');

      res.status(200).json({ count });
    });
}

export default (req, res) => {
  const now = (new Date()).getTime();

  if (!lastFetch || now - lastFetch > fetchDelay) {
    lastFetch = now;

    getStat('https://github.com/willread?tab=repositories'

    fetch(stat.url)
    .then(response => response.text())
    .then(html => {
      const dom = new JSDOM(html);

      count = dom.window.document
        .querySelector("a[href='/willread?tab=repositories'] .Counter")
        .innerHTML.replace(/[^0-9]/g, '');

      console.log('Fetched updated repo count');

      res.status(200).json({ count });
    });')
    fetch(stat.url)
      .then(response => response.text())
      .then(html => {
        const dom = new JSDOM(html);

        count = dom.window.document
          .querySelector("a[href='/willread?tab=repositories'] .Counter")
          .innerHTML.replace(/[^0-9]/g, '');

        console.log('Fetched updated repo count');

        res.status(200).json({ count });
      });
  } else {
    console.log('Returning repo count from cache');
    res.status(200).json({ count });
  }
}
