const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const imageSources = {};

        await page.goto(
            "https://www.amazon.com/s?k=amd+7000+series+cpu&ref=nb_sb_noss"
        );
        imageSources.image = await page.$$eval(
            ".sg-col-inner img.s-image",
            (images) => images.map((img) => img.src)
        );

        // imageSources.name = await page.$$eval(
        //     ".sg-col-inner span.a-size-small.a-color-base.a-text-normal",
        //     (names) => names.map((text) => text.innerText)
        // );

        // imageSources.price = await page.$$eval(
        //     ".sg-col-inner span.a-price-whole",
        //     (price) => price.map((text) => text.innerText)
        // );

        // console.log(imageSources);

        // for (let i = 0; i < 10; i++) {
        fs.writeFile(
            "amdCpuImage.json",
            JSON.stringify(imageSources, null, 2),
            (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("completed!!");
            }
        );
        // }
        await browser.close();
    } catch (err) {
        console.log(err);
    }
})();
