const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
        "https://www.amazon.com/s?k=amd+7000+series+cpu&ref=nb_sb_noss"
    );
    // await page.screenshot({ path: "mywebsite.png" });

    const cpuAmd = await page.evaluate(() => {

                const cpuNameTag = document.querySelectorAll(
            '.sg-col-inner span.a-size-medium.a-color-base.a-text-normal'
        );
        let cpuName = [];
        cpuNameTag.forEach((tag) => {
            cpuName.push(tag.innerText);
        });
        return cpuName;
    });

        // const cpuNameTag = document.querySelectorAll('.sg-col-inner div[cel_widget_id="MAIN-SEARCH_RESULTS-4"]');
        // let cpuNameAndImage = [];
        // cpuNameTag.forEach((amdTag) => {
        //     const amdName = amdTag.querySelectorAll(
        //         "img.s-image"
        //     );
        //     const amdImage = amdTag.querySelectorAll(
        //         "span.a-size-medium.a-color-base.a-text-normal"
        //     );
        //     // cpuName.push(tag.innerText);

        //     cpuNameAndImage.push({
        //         name: amdName.innerText,
        //         image: amdImage.src,
        //     });
        // });
        // return cpuNameAndImage;
    // });

    console.log(cpuAmd);
    await browser.close();
})();

// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto("https://www.amazon.com/s?k=amd+7000+series+cpu&ref=nb_sb_noss");

//   const cpuAmd = await page.evaluate(() => {
//     const cpuNameTags = document.querySelectorAll("div.sg-col-inner");

//     const cpuNameAndImage = [];

//     cpuNameTags.forEach((cpuNameTag) => {
//     //   const cpuNameTagLink = cpuNameTag.querySelector('a');
//     const cpuImage = cpuNameTag.querySelector('img.s-image').src;
//       const cpuName = cpuNameTag.querySelector('span.a-size-base-plus.a-color-base.a-text-normal').innerText;
      
//       cpuNameAndImage.push({
//         name: cpuName,
//         image: cpuImage,
//       });
//     });

//     return cpuNameAndImage;
//   });

//   console.log(cpuAmd);

//   await browser.close();
// })();

