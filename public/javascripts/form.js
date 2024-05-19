document.getElementById('queryButton').addEventListener('click', () => {
    const fruit = document.getElementById('fruitSelect').value;
    const year = document.getElementById('yearSelect').value;

    fetch(`/${fruit}/${year}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('resultsTable').querySelector('tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(row => {
                const tr = document.createElement('tr');
                const tdDate = document.createElement('td');
                const tdPrice = document.createElement('td');

                tdDate.textContent = row.Date;
                tdPrice.textContent = row.TotalAveragePrice;

                tr.appendChild(tdDate);
                tr.appendChild(tdPrice);
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
