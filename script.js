document.getElementById('addDealBtn').addEventListener('click', function () {
    toggleVisibility('purchaseForm');
});

document.getElementById('viewStatsBtn').addEventListener('click', function () {
    toggleVisibility('statsContainer');
    updateStats();
});

document.getElementById('calcSpreadBtn').addEventListener('click', function () {
    toggleVisibility('spreadContainer');
});

document.getElementById('dealType').addEventListener('change', function () {
    const dealType = this.value;
    toggleDealFields(dealType);
});

document.getElementById('addPurchaseBtn').addEventListener('click', function () {
    const amountRub = parseFloat(document.getElementById('amountRub').value);
    const exchangeRateUsd = parseFloat(document.getElementById('exchangeRateUsd').value);
    if (isNaN(amountRub) || isNaN(exchangeRateUsd)) {
        alert('Введите корректные данные');
        return;
    }
    // Логика добавления покупки
    alert(`Покупка добавлена: ${amountRub} RUB по курсу ${exchangeRateUsd} USD`);
});

document.getElementById('addSaleBtn').addEventListener('click', function () {
    const purchaseId = parseInt(document.getElementById('purchaseId').value);
    const saleAmountUsd = parseFloat(document.getElementById('saleAmountUsd').value);
    const saleRateUsd = parseFloat(document.getElementById('saleRateUsd').value);
    if (isNaN(purchaseId) || isNaN(saleAmountUsd) || isNaN(saleRateUsd)) {
        alert('Введите корректные данные');
        return;
    }
    // Логика добавления продажи
    alert(`Продажа добавлена: ${saleAmountUsd} USD по курсу ${saleRateUsd}`);
});

document.getElementById('calcSpreadResultBtn').addEventListener('click', function () {
    const purchaseId = parseInt(document.getElementById('purchaseSpreadId').value);
    const saleAmountUsd = parseFloat(document.getElementById('saleSpreadAmount').value);
    const saleRateUsd = parseFloat(document.getElementById('saleSpreadRate').value);
    if (isNaN(purchaseId) || isNaN(saleAmountUsd) || isNaN(saleRateUsd)) {
        alert('Введите корректные данные');
        return;
    }
    // Логика расчета спреда
    const spreadRub = saleAmountUsd * saleRateUsd - 1000; // Пример расчета
    const spreadPercent = (spreadRub / 1000) * 100;
    document.getElementById('spreadResult').innerHTML = `Спред: ${spreadRub.toFixed(2)} RUB (${spreadPercent.toFixed(2)}%)`;
});

function toggleVisibility(id) {
    const elements = document.querySelectorAll('.form-container, .stats-container, .spread-container');
    elements.forEach(el => el.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function toggleDealFields(dealType) {
    document.getElementById('buyFields').classList.add('hidden');
    document.getElementById('sellFields').classList.add('hidden');
    if (dealType === 'buy') {
        document.getElementById('buyFields').classList.remove('hidden');
    } else if (dealType === 'sell') {
        document.getElementById('sellFields').classList.remove('hidden');
    }
}

function updateStats() {
    // Пример обновления статистики (заглушка)
    document.getElementById('profitRub').innerText = '5000';
    document.getElementById('totalBank').innerText = '15000';
}
