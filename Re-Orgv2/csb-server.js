const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3456;

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('Error: dist directory not found. Please run npm run build first.');
  process.exit(1);
}

// Serve static files from dist directory
app.use(express.static(distPath));

// Handle SPA routing - serve index.html for all requests that don't match static files
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`In CodeSandbox environment, try accessing:`);
  console.log(`1. https://compassionate-rumple.csb.app/`);
  console.log(`2. https://compassionate-rumple-${PORT}.csb.app/`);
  console.log(`3. Look for Preview button in the CodeSandbox interface`);
}); 