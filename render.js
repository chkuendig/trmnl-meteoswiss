const fs = require('fs');
const path = require('path');
const { Liquid } = require('liquidjs');

// Initialize Liquid engine
const engine = new Liquid();

// Register a JSON parsing filter for inline mapping
engine.registerFilter('parse_json', (s) => {
  if (typeof s !== 'string') return s;
  try {
    return JSON.parse(s);
  } catch (e) {
    return {};
  }
});

// Load JSON data
const weatherData = JSON.parse(fs.readFileSync('./8055.json', 'utf8'));

// No external mapping needed; template contains inline mapping JSON

// Load template
const templatePath = './test.html';
const template = fs.readFileSync(templatePath, 'utf8');

// Prepare data for Liquid
const data = {
  page: {
    weather_data: weatherData
  }
};

// Render template
engine.parseAndRender(template, data).then(result => {
  // Write to output file
  const outputPath = './test-rendered.html';
  fs.writeFileSync(outputPath, result);
  console.log(`✓ Rendered template written to ${outputPath}`);
  console.log(`\nYou can now open ${outputPath} in your browser to preview the result.`);
}).catch(err => {
  console.error('Error rendering template:', err);
  process.exit(1);
});
