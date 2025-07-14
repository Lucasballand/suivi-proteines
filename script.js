const plusButtons = document.querySelectorAll('.btn:nth-child(3)');
const minusButtons = document.querySelectorAll('.btn:nth-child(1)');
const totalDiv = document.getElementById('total');
const modeRapideSwitch = document.getElementById('mode-rapide');
const modeText = document.getElementById('mode-text');

function updateTotal() {
    let totalProtein = 0;
    const foodItems = document.querySelectorAll('.food-item');

    foodItems.forEach(item => {
        const quantityDiv = item.querySelector('.quantity');
        const unit = item.dataset.unit || 'g';

        let quantityText = quantityDiv.textContent.split(' ')[0];
        let count;
        if (unit === 'g') {
            count = (parseInt(quantityText) || 0) / 10;
        } else {
            count = parseInt(quantityText) || 0;
        }

        const proteinPerStep = parseFloat(item.dataset.protein);
        totalProtein += count * proteinPerStep;
    });

    const objectif = 150;
    totalDiv.textContent = `Total protéines : ${totalProtein.toFixed(1)} g / ${objectif} g`;

    const progress = document.getElementById('progress');
    const progressPercent = Math.min((totalProtein / objectif) * 100, 100);
    progress.style.width = progressPercent + '%';
}

modeRapideSwitch.addEventListener('change', () => {
    modeText.textContent = modeRapideSwitch.checked ? 'ON' : 'OFF';
});

plusButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const quantityDiv = btn.parentElement.querySelector('.quantity');
        const item = btn.closest('.food-item');
        const unit = item.dataset.unit || 'g';

        let quantityText = quantityDiv.textContent.split(' ')[0];
        let count;
        if (unit === 'g') {
            count = (parseInt(quantityText) || 0) / 10;
        } else {
            count = parseInt(quantityText) || 0;
        }

        let step = 1;
        if (unit === 'g' && modeRapideSwitch.checked) step = 10;

        count += step;

        if (unit === 'g') {
            quantityDiv.textContent = `${count * 10} g`;
        } else {
            quantityDiv.textContent = `${count} ${unit}`;
        }

        updateTotal();
    });
});

minusButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const quantityDiv = btn.parentElement.querySelector('.quantity');
        const item = btn.closest('.food-item');
        const unit = item.dataset.unit || 'g';

        let quantityText = quantityDiv.textContent.split(' ')[0];
        let count;
        if (unit === 'g') {
            count = (parseInt(quantityText) || 0) / 10;
        } else {
            count = parseInt(quantityText) || 0;
        }

        let step = 1;
        if (unit === 'g' && modeRapideSwitch.checked) step = 10;

        count = Math.max(0, count - step);

        if (unit === 'g') {
            quantityDiv.textContent = `${count * 10} g`;
        } else {
            quantityDiv.textContent = `${count} ${unit}`;
        }

        updateTotal();
    });
});

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
        const quantityDiv = item.querySelector('.quantity');
        const unit = item.dataset.unit || 'g';
        quantityDiv.textContent = unit === 'g' ? '0 g' : `0 ${unit}`;
    });
    updateTotal();
});

window.onload = function () {
    document.getElementById("modal-info").style.display = "flex";

    document.getElementById("close-modal").addEventListener("click", function () {
        document.getElementById("modal-info").style.display = "none";
    });
};
