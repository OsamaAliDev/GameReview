var rowBody = document.getElementById("rowBody");
var gameModalTitle = document.getElementById("gameModalTitle");
var gameModalBody = document.getElementById("gameModalBody");
var gameModal = new bootstrap.Modal(document.getElementById("gameModal"));

async function getGameDetails(id) {
    gameModalBody.innerHTML = '<p class="text-center">loading....</p>';
    gameModal.show();

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
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
        const game = await response.json();
        renderGameModal(game);
    } catch (error) {
        console.error(error);
        gameModalBody.innerHTML = '<p class="text-danger text-center">loading....</p>';
    }
}

function renderGameModal(game) {
    gameModalTitle.textContent = game.title;
    gameModalBody.innerHTML = `
    <img src="${game.thumbnail}" class="img-fluid mb-3" alt="${game.title}" />
    <p>${game.description || game.short_description}</p>
    <ul class="list-unstyled">
      <li><strong>Genre:</strong> ${game.genre}</li>
      <li><strong>Platform:</strong> ${game.platform}</li>
      <li><strong>Developer:</strong> ${game.developer}</li>
      <li><strong>Release Date:</strong> ${game.release_date}</li>
    </ul>
    <a href="${game.game_url}" target="_blank" class="btn btn-primary">Play Now</a>
  `;
}


rowBody.addEventListener("click", function (e) {
    var card = e.target.closest(".card");
    if (!card) return; 

    var id = card.getAttribute("data-id");
    getGameDetails(id);
});