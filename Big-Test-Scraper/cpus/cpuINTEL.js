const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const cpuIntelSources = {};

        await page.goto(
            "https://www.bnn.in.th/th/p?q=intel%2013&sort_by=price_desc"
        );

        cpuIntelSources.name = await page.$$eval(
            ".product-item-details .product-name",
            (names) =>
                names
                    .filter((_, i) => [0, 1, 5, 9, 11].includes(i))
                    .map((text) => text.innerText)
        );
        cpuIntelSources.detail = await page.$$eval(
            ".product-link.product-item div.product-short-attribute",
            (details) =>
                details
                    .filter((_, i) => [0, 1, 5, 9, 11].includes(i))
                    .map((text) => text.innerText)
        );

        cpuIntelSources.price = await page.$$eval(
            ".product-link.product-item div.product-price",
            (price) =>
                price
                    .filter((_, i) => [0, 1, 5, 9, 11].includes(i))
                    .map((text) => text.innerText)
        );

        cpuIntelSources.image = await page.$$eval(
            ".product-item-image-container .aspect-ratio-content img.image",
            (images) =>
                images
                    .filter((_, i) => [0, 1, 5, 9, 11].includes(i))
                    .map((img) => img.src)
        );
        console.log(cpuIntelSources);

        const groupedData = Object.entries(cpuIntelSources).reduce(
            (acc, [key, value]) => {
                value.forEach((v, i) => {
                    if (!acc[i]) acc[i] = {};
                    acc[i][key] = v;
                });
                return acc;
            },
            []
        );

        fs.writeFile(
            "cpuINTEL.json",
            JSON.stringify(groupedData, null, 2),
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
