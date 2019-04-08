// Fetch beer count

$.ajax({
  url: 'https://snip.haqt.com/beers',
  dataType: 'jsonp',
  success: response => {
    document.querySelector('[data-value="beers"]').innerText = response;
  }
});

// Fetch game count

$.ajax({
  url: 'https://snip.haqt.com/games',
  dataType: 'jsonp',
  success: response => {
    document.querySelector('[data-value="games"]').innerText = response;
  }
});

// Fetch song count

$.ajax({
  url: 'https://snip.haqt.com/songs',
  dataType: 'jsonp',
  success: response => {
    document.querySelector('[data-value="songs"]').innerText = response;
  }
});

// Fetch repos count

$.ajax({
  url: 'https://snip.haqt.com/repos',
  dataType: 'jsonp',
  success: response => {
    document.querySelector('[data-value="repos"]').innerText = response;
  }
});
