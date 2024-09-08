document.addEventListener('DOMContentLoaded', function () {
    const addDealBtn = document.getElementById('addDealBtn');
    const viewStatsBtn = document.getElementById('viewStatsBtn');
    const calcSpreadBtn = document.getElementById('calcSpreadBtn');

    const purchaseForm = document.getElementById('purchaseForm');
    const statsContainer = document.getElementById('statsContainer');
    const spreadContainer = document.getElementById('spreadContainer');

    const dealTypeSelect = document.getElementById('dealType');
    const buyFields = document.getElementById('buyFields');
    const sellFields = document.getElementById('sellFields');

    const addPurchaseBtn = document.getElementById('addPurchaseBtn');
    const addSaleBtn = document.getElementById('addSaleBtn');

    const profitRub = document.getElementById('profitRub');
    const totalBank = document.getElementById('totalBank');

    const calcSpreadResultBtn = document.getElementById('calcSpreadResultBtn');
    const spreadResult = document.getElementById('spreadResult');

    // Обработка кнопок действий
    addDealBtn.addEventListener('click', function () {
        purchaseForm.classList.remove('hidden');
        statsContainer.classList.add('hidden');
        spreadContainer.classList.add('hidden');
    });

    viewStatsBtn.addEventListener('click', function () {
        purchaseForm.classList.add('hidden');
        statsContainer.classList.remove('hidden');
        spreadContainer.classList.add('hidden');

        // Заглушка для демонстрации статистики
        // Реальная статистика будет обновляться динамически
        profitRub.textContent = '15000';
        totalBank.textContent = '50000';
    });

    calcSpreadBtn.addEventListener('click', function () {
        purchaseForm.classList.add('hidden');
        statsContainer.classList.add('hidden');
        spreadContainer.classList.remove('hidden');
    });

    // Обработка покупки
    addPurchaseBtn.addEventListener('click', function () {
        const amountRub = parseFloat(document.getElementById('amountRub').value);
        const commission = parseFloat(document.getElementById('commission').value);
        const exchangeRateUsd = parseFloat(document.getElementById('exchangeRateUsd').value);

        if (isNaN(amountRub) || isNaN(commission) || isNaN(exchangeRateUsd)) {
            alert('Пожалуйста, введите корректные значения.');
            return;
        }

        // Расчет суммы с учетом комиссии
        const amountRubAfterCommission = amountRub - (amountRub * commission / 100);
        const amountUsd = amountRubAfterCommission / exchangeRateUsd;

        alert(`Покупка завершена!\nСумма в RUB после комиссии: ${amountRubAfterCommission.toFixed(2)}\nСумма в USD: ${amountUsd.toFixed(2)}`);
    });

    // Обработка продажи
    addSaleBtn.addEventListener('click', function () {
        const purchaseId = parseInt(document.getElementById('purchaseId').value);
        const saleAmountUsd = parseFloat(document.getElementById('saleAmountUsd').value);
        const saleRateUsd = parseFloat(document.getElementById('saleRateUsd').value);

        if (isNaN(purchaseId) || isNaN(saleAmountUsd) || isNaN(saleRateUsd)) {
            alert('Пожалуйста, введите корректные значения.');
            return;
        }

        // Рассчитываем сумму продажи в RUB
        const saleAmountRub = saleAmountUsd * saleRateUsd;

        alert(`Продажа завершена!\nСумма продажи в RUB: ${saleAmountRub.toFixed(2)}`);
    });

    // Обработка расчета спреда
    calcSpreadResultBtn.addEventListener('click', function () {
        const purchaseSpreadId = parseInt(document.getElementById('purchaseSpreadId').value);
        const saleSpreadAmount = parseFloat(document.getElementById('saleSpreadAmount').value);
        const saleSpreadRate = parseFloat(document.getElementById('saleSpreadRate').value);

        if (isNaN(purchaseSpreadId) || isNaN(saleSpreadAmount) || isNaN(saleSpreadRate)) {
            alert('Пожалуйста, введите корректные значения.');
            return;
        }

        // Пример расчета спреда (в реальном приложении будет интеграция с базой данных)
        const purchaseAmountRub = 10000; // Замените на реальный запрос из базы данных
        const saleAmountRub = saleSpreadAmount * saleSpreadRate;
        const spreadRub = saleAmountRub - purchaseAmountRub;
        const spreadPercent = (spreadRub / purchaseAmountRub) * 100;

        spreadResult.innerHTML = `Спред: ${spreadRub.toFixed(2)} RUB (${spreadPercent.toFixed(2)}%)`;
    });

});
