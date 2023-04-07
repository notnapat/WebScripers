const fs = require('fs');
const https = require('https');

// Define the folder path to save images
const folderPath = './images/';

// Read the JSON file
fs.readFile('cases.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Loop through the cases and download each image
  jsonData.forEach((caseData, index) => {
    const fileName = `${caseData.name}.jpg`; // Generate a unique filename based on the case name
    const filePath = folderPath + fileName; // Generate the full file path
    const file = fs.createWriteStream(filePath);

    https.get(caseData.image, response => {
      response.pipe(file);
      console.log(`Image downloaded: ${fileName}`);
    }).on('error', err => {
      console.error(`Error downloading image: ${fileName}`, err);
    });
  });
});
