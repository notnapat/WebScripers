const fs = require('fs');
const https = require('https');

// Define the folder path to save images
const folderPath = './images/';

// Read the JSON file
fs.readFile('amdCpuImage.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Loop through the image URLs and download each image
  jsonData.image.forEach((url, index) => {
    const fileName = `amd-${index}.jpg`; // Generate a unique filename
    const filePath = folderPath + fileName; // Generate the full file path
    const file = fs.createWriteStream(filePath);

    https.get(url, response => {
      response.pipe(file);
      console.log(`Image downloaded: ${fileName}`);
    }).on('error', err => {
      console.error(`Error downloading image: ${fileName}`, err);
    });
  });
});


