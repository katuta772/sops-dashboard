let static_dt_data = [
    {city: 'BUC', week: '2025-08-04', dt:35.3},
    {city: 'BUC', week: '2025-08-11', dt:30},
    {city: 'BUC', week: '2025-08-18', dt:30},
    {city: 'BUC', week: '2025-08-25', dt:30},
    {city: 'CLJ', week: '2025-08-04', dt:35.1},
    {city: 'CLJ', week: '2025-08-11', dt:30},
    {city: 'CLJ', week: '2025-08-18', dt:30},
    {city: 'CLJ', week: '2025-08-25', dt:30},
    {city: 'IAS', week: '2025-08-04', dt:34.0},
    {city: 'IAS', week: '2025-08-11', dt:30},
    {city: 'IAS', week: '2025-08-18', dt:30},
    {city: 'IAS', week: '2025-08-25', dt:30},
    {city: 'TIM', week: '2025-08-04', dt:36.4},
    {city: 'TIM', week: '2025-08-11', dt:30},
    {city: 'TIM', week: '2025-08-18', dt:30},
    {city: 'TIM', week: '2025-08-25', dt:30},
    {city: 'BRV', week: '2025-08-04', dt:35.4},
    {city: 'BRV', week: '2025-08-11', dt:30},
    {city: 'BRV', week: '2025-08-18', dt:30},
    {city: 'BRV', week: '2025-08-25', dt:30},
    {city: 'CTA', week: '2025-08-04', dt:38.1},
    {city: 'CTA', week: '2025-08-11', dt:30},
    {city: 'CTA', week: '2025-08-18', dt:30},
    {city: 'CTA', week: '2025-08-25', dt:30},
    {city: 'CRV', week: '2025-08-04', dt:36.8},
    {city: 'CRV', week: '2025-08-11', dt:30},
    {city: 'CRV', week: '2025-08-18', dt:30},
    {city: 'CRV', week: '2025-08-25', dt:30},
];

let static_targets = [
    {city: 'BUC', target:37.0},
    {city: 'CLJ', target:38.5},
    {city: 'IAS', target:35.0},
    {city: 'TIM', target:38.5},
    {city: 'BRV', target:34.5},
    {city: 'CTA', target:38.0},
    {city: 'CRV', target:36},
]

// Map week date -> table column index
const weekToCol = {
    '2025-08-04': 1, // W-1
    '2025-08-11': 2, // W-2
    '2025-08-18': 3, // W-3
    '2025-08-25': 4  // W-4
};

function populateTable() {
    // Create a quick lookup for targets
    let targetMap = {};
    static_targets.forEach(t => targetMap[t.city] = t.target);

    // Group data by city
    let cityMap = {};
    static_dt_data.forEach(item => {
        if (!cityMap[item.city]) {
            // col 0=city, col1-4=weeks, col5=action
            cityMap[item.city] = Array(6).fill("");
            cityMap[item.city][0] = item.city;
        }
        let colIndex = weekToCol[item.week];
        if (colIndex) {
            cityMap[item.city][colIndex] = item.dt;
        }
    });

    // Get table
    const table = document.querySelector(".table");

    // Remove existing rows except header
    table.querySelectorAll("tr:not(#table-header)").forEach(row => row.remove());

    // Insert rows
    Object.values(cityMap).forEach(rowData => {
        let city = rowData[0];
        let target = targetMap[city];

        // Check W-1 (index 1)
        let w1Value = rowData[1];
        let belowTarget = w1Value !== "" && w1Value < target;

        let actionText = belowTarget ? "Under Target, adjust" : "On Target";
        rowData[5] = actionText;

        let row = document.createElement("tr");
        rowData.forEach((cellData, idx) => {
            let cell = document.createElement("td");
            cell.textContent = cellData;

            // Apply color to W-1 column only
            if (idx === 1 && w1Value !== "") {
                cell.style.color = belowTarget ? "red" : "green";
                cell.style.fontWeight = "bold";
            }

            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

// Call after DOM ready
document.addEventListener('DOMContentLoaded', populateTable);
