const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const imageSources = {};

        await page.goto(
            "https://www.bnn.in.th/th/p?q=ryzen%207000&sort_by=price_desc"
        );
        imageSources.name = await page.$$eval(
            ".product-item-details .product-name",
            (names) => names.map((text) => text.innerText)
        );

        imageSources.detail = await page.$$eval(
            ".product-link.product-item div.product-short-attribute",
            (details) => details.map((text) => text.innerText)
        );

        imageSources.price = await page.$$eval(
            ".product-link.product-item div.product-price",
            (price) => price.map((text) => text.innerText)
        );

        imageSources.image = await page.$$eval(
            ".product-item-image-container .aspect-ratio-content img.image",
            (images) => images.map((img) => img.src)
        );
        console.log(imageSources);

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

        await browser.close();
    } catch (err) {
        console.log(err);
    }
})();
