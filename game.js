import { createClient } from 'https://esm.sh/@base44/sdk';

const base44 = createClient({
  appId: "6a02d2983989447500838a5e",
  headers: { "api_key": "9cfe17cba67b408e943bd4056e593b9d" }
});

let health = 100;
let hits = 0;

window.triggerHit = async (type) => {
    if (health <= 0) return;

    health -= (type === 'slap' ? 5 : 10);
    hits++;

    // Visuals
    const img = document.getElementById('target-img');
    img.classList.add('hit-shake');
    document.getElementById('pop-text').style.display = 'block';
    
    setTimeout(() => {
        img.classList.remove('hit-shake');
        document.getElementById('pop-text').style.display = 'none';
    }, 150);

    updateUI();

    // Sync with Base44
    await base44.track("hit_event", { type, hits, health });
};

function updateUI() {
    document.getElementById('health').innerText = health < 0 ? 0 : health;
    document.getElementById('hits').innerText = hits;
    if (health <= 0) document.getElementById('target-img').src = "img/dead.png";
}

window.resetGame = () => {
    health = 100;
    hits = 0;
    document.getElementById('target-img').src = "img/man.png";
    updateUI();
};
