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

    let purchases = [];
    let sales = [];

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

        let totalProfit = 0;
        let totalAmount = 0;

        // Подсчет прибыли
        sales.forEach(sale => {
            const purchase = purchases.find(p => p.id === sale.purchaseId);
            if (purchase) {
                const purchaseAmount = purchase.amountUsd * purchase.exchangeRateUsd;
                const saleAmount = sale.saleAmountUsd * sale.saleRateUsd;
                const profit = saleAmount - purchaseAmount;
                totalProfit += profit;
                totalAmount += purchaseAmount;
            }
        });

        profitRub.textContent = totalProfit.toFixed(2);
        totalBank.textContent = (totalAmount + totalProfit).toFixed(2);
    });

    calcSpreadBtn.addEventListener('click', function () {
        purchaseForm.classList.add('hidden');
        statsContainer.classList.add('hidden');
        spreadContainer.classList.remove('hidden');
    });

    // Обработка изменения типа сделки
    dealTypeSelect.addEventListener('change', function () {
        const selectedDealType = dealTypeSelect.value;

        if (selectedDealType === 'buy') {
            buyFields.classList.remove('hidden');
            sellFields.classList.add('hidden');
        } else if (selectedDealType === 'sell') {
            sellFields.classList.remove('hidden');
            buyFields.classList.add('hidden');
        }
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
        const amountRubAfterCommission = amountRub * (1 - (commission / 100));
        const amountUsd = amountRubAfterCommission / exchangeRateUsd;

        const purchaseId = purchases.length ? purchases[purchases.length - 1].id + 1 : 1;
        purchases.push({
            id: purchaseId,
            amountRub: amountRubAfterCommission,
            exchangeRateUsd: exchangeRateUsd,
            amountUsd: amountUsd
        });

        alert(`Покупка добавлена!\nID Покупки: ${purchaseId}\nСумма в RUB после комиссии: ${amountRubAfterCommission.toFixed(2)}\nСумма в USD: ${amountUsd.toFixed(2)}`);
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

        const purchase = purchases.find(p => p.id === purchaseId);
        if (!purchase) {
            alert('Покупка с таким ID не найдена.');
            return;
        }

        const saleAmountRub = saleAmountUsd * saleRateUsd;
        sales.push({
            purchaseId: purchaseId,
            saleAmountUsd: saleAmountUsd,
            saleRateUsd: saleRateUsd
        });

        alert(`Продажа добавлена!\nСумма продажи в RUB: ${saleAmountRub.toFixed(2)}`);
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

        const purchase = purchases.find(p => p.id === purchaseSpreadId);
        if (!purchase) {
            alert('Покупка с таким ID не найдена.');
            return;
        }

        const purchaseAmountRub = purchase.amountUsd * purchase.exchangeRateUsd;
        const saleAmountRub = saleSpreadAmount * saleSpreadRate;
        const spreadRub = saleAmountRub - purchaseAmountRub;
        const spreadPercent = (spreadRub / purchaseAmountRub) * 100;

        spreadResult.innerHTML = `Спред: ${spreadRub.toFixed(2)} RUB (${spreadPercent.toFixed(2)}%)`;
    });

});
