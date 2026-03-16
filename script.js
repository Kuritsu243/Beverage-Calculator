document.addEventListener('DOMContentLoaded', () => {
    // Inputs
    const inputs = {
        pack: document.getElementById('pack'),
        sizeCl: document.getElementById('sizeCl'),
        servingMl: document.getElementById('servingMl'),
        buyPrice: document.getElementById('buyPrice'),
        sellPrice: document.getElementById('sellPrice')
    };

    // Outputs
    const outputs = {
        servings: document.getElementById('res-servings'),
        cost: document.getElementById('res-cost'),
        profit: document.getElementById('res-profit'),
        margin: document.getElementById('res-margin'),
        primaryCard: document.getElementById('primary-profit-card'),

        // Scenarios
        s40Sell: document.getElementById('scen-sell-40'),
        s40Prof: document.getElementById('scen-prof-40'),
        s40Marg: document.getElementById('scen-marg-40'),

        s60Sell: document.getElementById('scen-sell-60'),
        s60Prof: document.getElementById('scen-prof-60'),
        s60Marg: document.getElementById('scen-marg-60')
    };

    function calculate() {
        // 1. Get Values
        const pack = parseFloat(inputs.pack.value) || 0;
        const sizeCl = parseFloat(inputs.sizeCl.value) || 0;
        const servingMl = parseFloat(inputs.servingMl.value) || 0;
        const buyPrice = parseFloat(inputs.buyPrice.value) || 0;
        const sellPrice = parseFloat(inputs.sellPrice.value) || 0;

        // Prevent division by zero errors
        if (servingMl === 0 || sellPrice === 0) return;

        // 2. Core Math
        const totalServings = (pack * (sizeCl * 10)) / servingMl;
        const costPerServing = totalServings > 0 ? (buyPrice / totalServings) : 0;
        const profitCash = sellPrice - costPerServing;
        const marginPct = (profitCash / sellPrice) * 100;

        // 3. Scenario Math
        const sell40 = sellPrice + 0.40;
        const prof40 = sell40 - costPerServing;
        const marg40 = (prof40 / sell40) * 100;

        const sell60 = sellPrice + 0.60;
        const prof60 = sell60 - costPerServing;
        const marg60 = (prof60 / sell60) * 100;

        // 4. Update DOM (Format to 2 decimal places)
        outputs.servings.textContent = Math.floor(totalServings); // Can't pour half a serving properly
        outputs.cost.textContent = `£${costPerServing.toFixed(2)}`;
        outputs.profit.textContent = `£${profitCash.toFixed(2)}`;
        outputs.margin.textContent = `${marginPct.toFixed(1)}%`;

        outputs.s40Sell.textContent = `£${sell40.toFixed(2)}`;
        outputs.s40Prof.textContent = `£${prof40.toFixed(2)}`;
        outputs.s40Marg.textContent = `${marg40.toFixed(1)}%`;

        outputs.s60Sell.textContent = `£${sell60.toFixed(2)}`;
        outputs.s60Prof.textContent = `£${prof60.toFixed(2)}`;
        outputs.s60Marg.textContent = `${marg60.toFixed(1)}%`;

        // 5. Update Colors
        outputs.primaryCard.classList.remove('status-good', 'status-warn', 'status-loss');

        if (profitCash < 0 || marginPct < 0) {
            outputs.primaryCard.classList.add('status-loss');
        } else if (marginPct <= 20) {
            outputs.primaryCard.classList.add('status-warn');
        } else {
            outputs.primaryCard.classList.add('status-good');
        }
    }

    // Add event listeners to all inputs to trigger calculation on typing
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', calculate);
    });

    // Run once on load to populate the initial formatting
    calculate();
});