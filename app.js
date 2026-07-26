const form = document.getElementById('label-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const width = Number(document.getElementById('width').value);
  const height = Number(document.getElementById('height').value);
  const labelsPerRow = Number(document.getElementById('labelsPerRow').value);
  const rowsPerSheet = Number(document.getElementById('rowsPerSheet').value);
  const quantity = Number(document.getElementById('quantity').value);
  const costPerSheet = Number(document.getElementById('costPerSheet').value);
  const wasteAllowance = Number(document.getElementById('wasteAllowance').value);

  const labelsPerSheet = labelsPerRow * rowsPerSheet;
  const sheetsNeeded = Math.ceil(quantity / labelsPerSheet);
  const materialAreaM2 = (quantity * width * height) / 1000000;
  const materialBuffer = 1 + wasteAllowance / 100;
  const estimatedCost = sheetsNeeded * costPerSheet;
  const labelStockM2 = materialAreaM2 * materialBuffer;
  const adhesiveM2 = materialAreaM2 * materialBuffer;
  const releaseLinerM2 = materialAreaM2 * materialBuffer;

  document.getElementById('labelsPerSheet').textContent = labelsPerSheet.toLocaleString();
  document.getElementById('sheetsNeeded').textContent = sheetsNeeded.toLocaleString();
  document.getElementById('materialArea').textContent = `${materialAreaM2.toFixed(2)} m²`;
  document.getElementById('estimatedCost').textContent = `$${estimatedCost.toFixed(2)}`;
  document.getElementById('labelStock').textContent = `${labelStockM2.toFixed(2)} m²`;
  document.getElementById('adhesive').textContent = `${adhesiveM2.toFixed(2)} m²`;
  document.getElementById('releaseLiner').textContent = `${releaseLinerM2.toFixed(2)} m²`;
});
