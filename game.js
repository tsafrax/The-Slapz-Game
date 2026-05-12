import { createClient } from 'https://esm.sh/@base44/sdk';

// Initialize Base44 with your exact credentials
const base44 = createClient({
  appId: "6a02d2983989447500838a5e",
  headers: {
    "api_key": "9cfe17cba67b408e943bd4056e593b9d"
  }
});

let hits = 0;

window.triggerHit = async () => {
    hits++;
    document.getElementById('hits').innerText = hits;

    // Animation logic
    const img = document.getElementById('target-img');
    const pop = document.getElementById('pop-text');
    img.classList.add('hit-shake');
    pop.style.display = 'block';

    setTimeout(() => {
        img.classList.remove('hit-shake');
        pop.style.display = 'none';
    }, 150);

    // BASE44 INTEGRATION: Create a user record on every hit (or on game end)
    try {
        await base44.entities.User.create({
            full_name: "Mobile Player",
            email: `player_${Date.now()}@test.com`,
            role: "user"
        });
        console.log("Hit tracked in Base44!");
    } catch (err) {
        console.error("Base44 Error:", err);
    }
};

window.resetGame = () => {
    hits = 0;
    document.getElementById('hits').innerText = hits;
};
