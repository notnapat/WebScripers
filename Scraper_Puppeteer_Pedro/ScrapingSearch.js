// const puppeteer = require('puppeteer');

// // Loop Image เอาที้งหมด ไม่เลือก Array
// (async () => {
//   const browser = await puppeteer.launch({ headless: false});
//   const page = await browser.newPage();

//   await page.goto('https://www.amazon.com/ref=navm_hdr_logo');

//   // const searchBox = await page.$("#nav-search-keywords");
//   // await searchBox.focus();
// //   await page.$("#nav-search-form input#nav-search-keywords");
//   // await page.$("#nav-input.nav-progressive-attribute");
//   // await page.focus();
//   await page.keyboard.type("#nav-search-keywords","Gpu", { delay: 300 });

//   await page.click('.nav-search-submit input.nav-input');

//   // await page.type("#nav-search-keywords", "Gpu", {delay:300})

//   // await page.click('input[value="Go"]')

//   // await browser.close();
// })();

const puppeteer = require('puppeteer');

// Loop Image เอาที้งหมด ไม่เลือก Array
(async () => {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();

  await page.goto('https://www.google.com');
   await page.type(".gLFyf", "Gpu", {delay:30})

  // const searchBox = await page.$("#nav-search-keywords");
  // await searchBox.focus();
//   await page.$("#nav-search-form input#nav-search-keywords");
  // await page.$("#nav-input.nav-progressive-attribute");
  // await page.focus();
//   await page.keyboard.type("#nav-search-keywords","Gpu", { delay: 300 });

//   await page.click('.nav-search-submit input.nav-input');

  // await page.type("#nav-search-keywords", "Gpu", {delay:300})

  await page.click('input[value="ค้นหาด้วย Google"]')

  // await browser.close();
})();


