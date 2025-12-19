const fs = require('fs');
const path = require('path');
const { Liquid } = require('liquidjs');

// Initialize Liquid engine
const engine = new Liquid();

// Load JSON data
const weatherData = JSON.parse(fs.readFileSync('./8055.json', 'utf8'));
const iconMapping = JSON.parse(fs.readFileSync('./mapping.json', 'utf8'));

// Convert mapping keys to ensure they're accessible
// liquidjs may have issues with numeric keys, so we'll keep them as strings
const iconMappingStringKeys = {};
for (const key in iconMapping) {
  iconMappingStringKeys[String(key)] = iconMapping[key];
}

// Load template
const templatePath = './test.html';
const template = fs.readFileSync(templatePath, 'utf8');

// Prepare data for Liquid
const data = {
  page: {
    weather_data: weatherData,
    icon_mapping: iconMappingStringKeys
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
