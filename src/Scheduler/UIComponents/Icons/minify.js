const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'selection.json');

// Read icons.json
fs.readFile(filePath, null, (err, icons) => {
  if (!err) {
    const filteredIcons = [];

    // Push only needed data
    JSON.parse(icons).icons.forEach((icon, index) => {
      filteredIcons.push({
        icon: {
          paths: icon.icon.paths,
          width: icon.icon.width,
        },
        properties: {
          name: icon.properties.name,
        }
      });
    })

    // Stringify the object
    const finalIcons = JSON.stringify({icons: filteredIcons});
    fs.writeFile('src/icons.json', finalIcons, 'utf8', () => console.log('Finished'));
  } else {
    console.log(err);
  }
});