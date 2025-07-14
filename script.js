// === Sélecteurs principaux ===
const totalDiv = document.getElementById('total');
const modeRapideSwitch = document.getElementById('mode-rapide');
const modeText = document.getElementById('mode-text');

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
}

// === Mode rapide ON/OFF ===
modeRapideSwitch.addEventListener('change', () => {
    modeText.textContent = modeRapideSwitch.checked ? 'ON' : 'OFF';
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
