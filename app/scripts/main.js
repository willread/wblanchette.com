// Fetch beer count

$.ajax({
  url: 'https://protected-bastion-41335.herokuapp.com/beers',
  dataType: 'jsonp',
  success: response => {
    document.querySelector('[data-value="beers"]').innerText = response;
  }
});

// Fetch game count

$.ajax({
  url: 'https://protected-bastion-41335.herokuapp.com/games',
  dataType: 'jsonp',
  success: response => {
    document.querySelector('[data-value="games"]').innerText = response;
  }
});

// Fetch song count

$.ajax({
  url: 'https://protected-bastion-41335.herokuapp.com/songs',
  dataType: 'jsonp',
  success: response => {
    document.querySelector('[data-value="songs"]').innerText = response;
  }
});
