const form = document.getElementById('label-form');
let lastCalculationData = null;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const width = Number(document.getElementById('width').value);
  const height = Number(document.getElementById('height').value);
  const labelsPerRow = Number(document.getElementById('labelsPerRow').value);
  const rowsPerSheet = Number(document.getElementById('rowsPerSheet').value);
  const quantity = Number(document.getElementById('quantity').value);
  const costPerSheet = Number(document.getElementById('costPerSheet').value);
  const cylinderSize = Number(document.getElementById('cylinderSize').value);
  const materialType = document.getElementById('materialType').value;

  const labelsPerSheet = labelsPerRow * rowsPerSheet;
  const sheetsNeeded = Math.ceil(quantity / labelsPerSheet);
  const materialAreaM2 = (quantity * width * height) / 1000000;
  const estimatedCost = sheetsNeeded * costPerSheet;
  const labelStockM2 = materialAreaM2;
  const adhesiveM2 = materialAreaM2;
  const releaseLinerM2 = materialAreaM2;
  
  // Calculate rolls required based on cylinder size and label height
  const labelsPerRoll = Math.floor(cylinderSize / height);
  const rollsRequired = Math.ceil(quantity / labelsPerRoll);

  // Store calculation data for PDF download
  lastCalculationData = {
    width,
    height,
    labelsPerRow,
    rowsPerSheet,
    quantity,
    costPerSheet,
    cylinderSize,
    materialType,
    labelsPerSheet,
    sheetsNeeded,
    materialAreaM2,
    labelStockM2,
    adhesiveM2,
    releaseLinerM2,
    estimatedCost,
    rollsRequired,
    labelsPerRoll
  };

  document.getElementById('quantityDisplay').textContent = quantity.toLocaleString();
  document.getElementById('labelsPerSheet').textContent = labelsPerSheet.toLocaleString();
  document.getElementById('sheetsNeeded').textContent = sheetsNeeded.toLocaleString();
  document.getElementById('rollsRequired').textContent = rollsRequired.toLocaleString();
  document.getElementById('materialArea').textContent = `${materialAreaM2.toFixed(2)} m²`;
  document.getElementById('estimatedCost').textContent = `₹${estimatedCost.toFixed(2)}`;
  document.getElementById('labelStock').textContent = `${labelStockM2.toFixed(2)} m²`;
  document.getElementById('adhesive').textContent = `${adhesiveM2.toFixed(2)} m²`;
  document.getElementById('releaseLiner').textContent = `${releaseLinerM2.toFixed(2)} m²`;
});

// View Report Handler - Display Modal
document.getElementById('viewReport').addEventListener('click', () => {
  if (!lastCalculationData) {
    alert('Please calculate first before viewing report');
    return;
  }

  const data = lastCalculationData;
  const reportHTML = `
    <h3>Input Parameters</h3>
    <table>
      <tr><td style="font-weight: bold;">Label Width</td><td>${data.width} mm</td></tr>
      <tr><td style="font-weight: bold;">Label Height</td><td>${data.height} mm</td></tr>
      <tr><td style="font-weight: bold;">Labels Per Row</td><td>${data.labelsPerRow}</td></tr>
      <tr><td style="font-weight: bold;">Rows Per Sheet</td><td>${data.rowsPerSheet}</td></tr>
      <tr><td style="font-weight: bold;">Quantity Needed</td><td>${data.quantity.toLocaleString()}</td></tr>
      <tr><td style="font-weight: bold;">Cost Per Sheet</td><td>₹${data.costPerSheet.toFixed(2)}</td></tr>
      <tr><td style="font-weight: bold;">Cylinder Size</td><td>${data.cylinderSize} mm</td></tr>
      <tr><td style="font-weight: bold;">Material Type</td><td>${data.materialType}</td></tr>
    </table>
    
    <h3>Calculation Results</h3>
    <table>
      <tr><td style="font-weight: bold;">Quantity Needed</td><td>${data.quantity.toLocaleString()}</td></tr>
      <tr><td style="font-weight: bold;">Labels Per Sheet</td><td>${data.labelsPerSheet.toLocaleString()}</td></tr>
      <tr><td style="font-weight: bold;">Sheets Needed</td><td>${data.sheetsNeeded.toLocaleString()}</td></tr>
      <tr><td style="font-weight: bold;">Rolls Required</td><td>${data.rollsRequired.toLocaleString()}</td></tr>
      <tr><td style="font-weight: bold;">Material Area</td><td>${data.materialAreaM2.toFixed(2)} m²</td></tr>
      <tr><td style="font-weight: bold; color: #3b82f6;">Estimated Cost</td><td style="color: #3b82f6; font-weight: bold; font-size: 18px;">₹${data.estimatedCost.toFixed(2)}</td></tr>
    </table>
    
    <h3>Materials Breakdown</h3>
    <table>
      <tr><td style="font-weight: bold;">Label Stock</td><td>${data.labelStockM2.toFixed(2)} m²</td></tr>
      <tr><td style="font-weight: bold;">Adhesive</td><td>${data.adhesiveM2.toFixed(2)} m²</td></tr>
      <tr><td style="font-weight: bold;">Release Liner</td><td>${data.releaseLinerM2.toFixed(2)} m²</td></tr>
    </table>
    
    <p style="text-align: center; color: #a0a0a0; font-size: 0.9rem; margin-top: 24px;">Generated on ${new Date().toLocaleString()}</p>
  `;

  document.getElementById('reportContent').innerHTML = reportHTML;
  document.getElementById('reportModal').style.display = 'block';
});

// Close modal when X button is clicked
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('reportModal').style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
  const modal = document.getElementById('reportModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
