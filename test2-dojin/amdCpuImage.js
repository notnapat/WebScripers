const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const imageSources = {};


        await page.goto(
            "https://manga18fx.com/manga/theres-something-loose-in-her-head/chapter-30"
        );
        imageSources.image = await page.$$eval(
            "div.page-break img",
            // (images) => images.map((img) => img.getAttribute("data-src"))
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

        console.log(imageSources);

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
