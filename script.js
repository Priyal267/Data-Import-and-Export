document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const dataTable = document.getElementById('dataTable').querySelector('tbody');
    const exportBtn = document.getElementById('exportBtn');
    const importFile = document.getElementById('importFile');
  
    const data = [];
  
    // Add data to the table
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
  
      if (name && email) {
        data.push({ name, email });
        updateTable();
        form.reset();
      }
    });
  
    // Update the table
    function updateTable() {
      dataTable.innerHTML = '';
      data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.name}</td>
          <td>${row.email}</td>
        `;
        dataTable.appendChild(tr);
      });
    }
  
    // Export to CSV
    exportBtn.addEventListener('click', () => {
      if (data.length === 0) {
        alert('No data to export!');
        return;
      }
  
      const csvRows = ['Name,Email'];
      data.forEach(row => {
        csvRows.push(`${row.name},${row.email}`);
      });
  
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  
    // Import CSV
    importFile.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        const rows = text.split('\n').slice(1);
  
        rows.forEach(row => {
          const [name, email] = row.split(',');
          if (name && email) {
            data.push({ name: name.trim(), email: email.trim() });
          }
        });
  
        updateTable();
      };
  
      reader.readAsText(file);
    });
  });
  