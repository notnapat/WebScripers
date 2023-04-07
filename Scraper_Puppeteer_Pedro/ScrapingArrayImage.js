const puppeteer = require('puppeteer');

// Loop Image เอาที้งหมด ไม่เลือก Array
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.amazon.com/s?k=cpu&crid=2UOHY1GMRTUBX&sprefix=%2Caps%2C492&ref=nb_sb_noss_2');

  const imageSources = await page.$$eval('img.s-image', (images) =>
    images.map((img) => img.src)
  );

  console.log(imageSources);

  await browser.close();
})();


// Loop Text เอาทั้งหมด ไม่เลือก Array

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://www.amazon.com/s?k=cpu&crid=2UOHY1GMRTUBX&sprefix=%2Caps%2C492&ref=nb_sb_noss_2');

//   const textContent = await page.$$eval('.a-size-medium.a-color-base.a-text-normal', (elements) =>
//     elements.map((el) => el.textContent.trim())
//   );

//   console.log(textContent);

//   await browser.close();
// })();
