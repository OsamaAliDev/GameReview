var rowBody = document.getElementById("rowBody");
var btns = document.querySelectorAll(".nav-link");
var loading = document.getElementById("loading");

var categoryMap = {
    "MMORPG": "mmorpg",
    "Shooter": "shooter",
    "MOBA": "moba",
    "Anime": "anime",
    "Battle Royale": "battle-royale",
    "Strategy": "strategy",
    "Fantasy": "fantasy",
    "Sci-Fi": "sci-fi",
    "Card Games": "card",
    "Racing": "racing",
    "Fighting": "fighting",
    "Social": "social",
    "Sports": "sports"
};

async function getGame(category = '') {
    loading.classList.remove("d-none");

    var url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    if (category) {
        url += '?category=' + category;
    }

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ff1375acf2mshe4d3f4db13f591bp1ec9d7jsnb76cc39cb830',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        display(result);
    } catch (error) {
        console.error(error);
        rowBody.innerHTML = '<div class="col-12"><p class="text-center text-danger">error.</p></div>';
    } finally {
        loading.classList.add("d-none");
    }
}

getGame();

function display(arr) {
    if (!arr || arr.length === 0) {
        rowBody.innerHTML = '<div class="col-12"><p class="text-center">للعبه مش موجوده</p></div>';
        return;
    }

    var box = '';
    for (var i = 0; i < arr.length; i++) {
        box += `<div class="col">
  <div class="card h-100" data-id="${arr[i].id}">
    <img src="${arr[i].thumbnail}" class="card-img-top" alt="${arr[i].title}" />
    <div class="card-body">
      <h5 class="card-title">${arr[i].title}</h5>
      <p class="card-text text-muted">${arr[i].short_description}</p>
    </div>
  </div>
</div>`;
    }
    rowBody.innerHTML = box;
}

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) {
        e.preventDefault();
        var label = e.target.textContent.trim();
        if (!label) return;

        var apiValue = categoryMap[label] || label.toLowerCase();
        getGame(apiValue);

        for (var j = 0; j < btns.length; j++) {
            btns[j].classList.remove('active');
        }
        e.target.classList.add('active');
    });
}
