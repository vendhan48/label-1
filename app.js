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
  const wasteAllowance = Number(document.getElementById('wasteAllowance').value);

  const labelsPerSheet = labelsPerRow * rowsPerSheet;
  const sheetsNeeded = Math.ceil(quantity / labelsPerSheet);
  const materialAreaM2 = (quantity * width * height) / 1000000;
  const materialBuffer = 1 + wasteAllowance / 100;
  const estimatedCost = sheetsNeeded * costPerSheet;
  const labelStockM2 = materialAreaM2 * materialBuffer;
  const adhesiveM2 = materialAreaM2 * materialBuffer;
  const releaseLinerM2 = materialAreaM2 * materialBuffer;

  // Store calculation data for PDF download
  lastCalculationData = {
    width,
    height,
    labelsPerRow,
    rowsPerSheet,
    quantity,
    costPerSheet,
    wasteAllowance,
    labelsPerSheet,
    sheetsNeeded,
    materialAreaM2,
    labelStockM2,
    adhesiveM2,
    releaseLinerM2,
    estimatedCost
  };

  document.getElementById('labelsPerSheet').textContent = labelsPerSheet.toLocaleString();
  document.getElementById('sheetsNeeded').textContent = sheetsNeeded.toLocaleString();
  document.getElementById('materialArea').textContent = `${materialAreaM2.toFixed(2)} m²`;
  document.getElementById('estimatedCost').textContent = `$${estimatedCost.toFixed(2)}`;
  document.getElementById('labelStock').textContent = `${labelStockM2.toFixed(2)} m²`;
  document.getElementById('adhesive').textContent = `${adhesiveM2.toFixed(2)} m²`;
  document.getElementById('releaseLiner').textContent = `${releaseLinerM2.toFixed(2)} m²`;
});

// PDF Download Handler
document.getElementById('downloadPdf').addEventListener('click', () => {
  if (!lastCalculationData) {
    alert('Please calculate first before downloading PDF');
    return;
  }

  const data = lastCalculationData;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #2563eb;">Label Calculation Report</h1>
      <hr style="border: 1px solid #ccc;">
      
      <h2>Input Parameters</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Label Width</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.width} mm</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Label Height</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.height} mm</td>
        </tr>
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Labels Per Row</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.labelsPerRow}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Rows Per Sheet</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.rowsPerSheet}</td>
        </tr>
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Quantity Needed</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.quantity.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Cost Per Sheet</td>
          <td style="padding: 8px; border: 1px solid #ddd;">$${data.costPerSheet.toFixed(2)}</td>
        </tr>
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Waste Allowance</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.wasteAllowance}%</td>
        </tr>
      </table>
      
      <h2 style="margin-top: 20px;">Calculation Results</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #2563eb; color: white;">
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Metric</td>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Value</td>
        </tr>
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Labels Per Sheet</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.labelsPerSheet.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Sheets Needed</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.sheetsNeeded.toLocaleString()}</td>
        </tr>
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Material Area</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.materialAreaM2.toFixed(2)} m²</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Estimated Cost</td>
          <td style="padding: 8px; border: 1px solid #ddd; color: #2563eb; font-weight: bold; font-size: 16px;">$${data.estimatedCost.toFixed(2)}</td>
        </tr>
      </table>
      
      <h2 style="margin-top: 20px;">Materials Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Label Stock</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.labelStockM2.toFixed(2)} m²</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Adhesive</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.adhesiveM2.toFixed(2)} m²</td>
        </tr>
        <tr style="background-color: #f0f0f0;">
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Release Liner</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.releaseLinerM2.toFixed(2)} m²</td>
        </tr>
      </table>
      
      <hr style="border: 1px solid #ccc; margin-top: 20px;">
      <p style="text-align: center; color: #666; font-size: 12px;">
        Generated on ${new Date().toLocaleString()}
      </p>
    </div>
  `;

  const element = document.createElement('div');
  element.innerHTML = html;
  
  const opt = {
    margin: 10,
    filename: 'label-calculation-report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };

  html2pdf().set(opt).from(element).save();
});
