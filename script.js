// === Phrases mascotte ===
const phrases50 = [
    "Allez mon poulet ! 💪",
    "Encore un effort ! 🐔",
    "T'es qu'à moitié cuit !",
    "Fais gonfler ces biceps !",
    "T’es pas en mode poulet rôti encore !",
    "Mange plus, gagne plus !",
    "C’est bien, mais pas assez !",
    "Je veux voir des muscles !",
    "Allez hop, encore un steak !",
    "Tu vas devenir une machine !",
    "Plus de brocoli, plus de poulet !",
    "Encore du quinoa !",
    "Mets le turbo !",
    "Mode Rapide ON !",
    "Encore quelques bouchées !",
    "C’est ça qu’on veut !",
    "Tu vas tout casser !",
    "Boom, encore un scoop !",
    "Fais pas ton poulet de batterie !",
    "Go go go !"
];

const phrases100 = [
    "Objectif PROTÉINE atteint ! 🎉",
    "T’es une bête ! 🐔💥",
    "Mon poulet musclé préféré !",
    "Muscles validés ! 💪",
    "Protéines max !",
    "T’es un monstre !",
    "C’est ça le body !",
    "Champion du shaker !",
    "Mister Biceps !",
    "Machine à œufs !",
    "Steak power !",
    "Shaker Master !",
    "Trop fort !",
    "Fier de toi !",
    "Prêt pour la salle !",
    "Prochain objectif : plus gros !",
    "Tu vas gonfler !",
    "Bombe de protéines !",
    "Je te muscle les ailes !",
    "Mission accomplie ! 🏆"
];

// === Sélecteurs principaux ===
const totalDiv = document.getElementById('total');
const modeRapideSwitch = document.getElementById('mode-rapide');
const modeText = document.getElementById('mode-text');
const mascotte = document.querySelector('.mascotte');
const mascotteBulle = mascotte.querySelector('.bulle');

// === Mettre à jour le total ===
function updateTotal() {
    let totalProtein = 0;
    const foodItems = document.querySelectorAll('.food-item');

    foodItems.forEach(item => {
        const quantityDiv = item.querySelector('.quantity');
        const unit = item.dataset.unit || 'g';
        let quantityText = quantityDiv.textContent.split(' ')[0];
        let count = unit === 'g' ? (parseInt(quantityText) || 0) / 10 : parseInt(quantityText) || 0;
        totalProtein += count * parseFloat(item.dataset.protein);
    });

    const objectif = 150;
    totalDiv.textContent = `Total protéines : ${totalProtein.toFixed(1)} g / ${objectif} g`;
    document.getElementById('progress').style.width = Math.min((totalProtein / objectif) * 100, 100) + '%';

    // === Mascotte logique ===
    if (totalProtein >= objectif * 0.5 && totalProtein < objectif) {
        if (!window.mascotte50Shown) {
            showMascotte(phrases50);
            window.mascotte50Shown = true;
        }
    } else if (totalProtein >= objectif) {
        if (!window.mascotte100Shown) {
            showMascotte(phrases100);
            window.mascotte100Shown = true;
        }
    } else {
        // Si on descend sous 50% on reset
        window.mascotte50Shown = false;
        window.mascotte100Shown = false;
    }
}

// === Fonction pour afficher la mascotte ===
function showMascotte(phrasesArray) {
    const phrase = phrasesArray[Math.floor(Math.random() * phrasesArray.length)];
    mascotteBulle.textContent = phrase;
    mascotte.style.display = "block";

    setTimeout(() => {
        mascotte.style.display = "none";
    }, 6000);
}

// === Mode rapide ON/OFF ===
modeRapideSwitch.addEventListener('change', () => {
    modeText.textContent = modeRapideSwitch.checked ? 'ON ⚡️' : 'OFF';
});

// === Boutons + et - ===
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const quantityDiv = btn.parentElement.querySelector('.quantity');
        const item = btn.closest('.food-item');
        const unit = item.dataset.unit || 'g';
        let quantityText = quantityDiv.textContent.split(' ')[0];
        let count = unit === 'g' ? (parseInt(quantityText) || 0) / 10 : parseInt(quantityText) || 0;
        let step = (unit === 'g' && modeRapideSwitch.checked) ? 10 : 1;

        if (btn.textContent.trim() === '+') {
            count += step;
        } else {
            count = Math.max(0, count - step);
        }

        quantityDiv.textContent = unit === 'g' ? `${count * 10} g` : `${count} ${unit}`;
        updateTotal();
    });
});

// === Réinitialiser ===
document.getElementById('reset-btn').addEventListener('click', () => {
    document.querySelectorAll('.food-item').forEach(item => {
        const quantityDiv = item.querySelector('.quantity');
        const unit = item.dataset.unit || 'g';
        quantityDiv.textContent = unit === 'g' ? '0 g' : `0 ${unit}`;
    });
    updateTotal();
});

// === Pop-up info ===
window.onload = () => {
    document.getElementById("modal-info").style.display = "flex";
    document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("modal-info").style.display = "none";
    });
};

// === Accordéon ===
document.querySelectorAll(".accordion").forEach(btn => {
    btn.addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});
