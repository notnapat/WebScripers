const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const cpuAmdSources = {};

        await page.goto(
            "https://www.advice.co.th/product/graphic-card-vga-/intel-arc-series"
        );

        cpuAmdSources.name = await page.$$eval(
            ".product-column-4 .item .product-blocks .product-name.product-name-font",
            (names) =>
                names
                    .filter((_, i) => [1, 2].includes(i))
                    .map((text) => text.innerText)
        );
        cpuAmdSources.detail = await page.$$eval(
            ".product-column-4 .item .product-blocks .item-spec.item-spec-font.sss",
            (details) =>
                details
                    .filter((_, i) => [1, 2].includes(i))
                    .map((text) => text.innerText)
        );

        cpuAmdSources.price = await page.$$eval(
            ".product-column-4 .item .product-blocks .sale.sale-font",
            (price) =>
                price
                    .filter((_, i) => [1, 2].includes(i))
                    .map((text) => text.innerText)
        );

        cpuAmdSources.image = await page.$$eval(
            ".product-column-4 .item .product-blocks .product-image img",
            (images) =>
                images
                    .filter((_, i) => [1, 2].includes(i))
                    .map((img) => img.src)
        );
        console.log(cpuAmdSources);

        const groupedData = Object.entries(cpuAmdSources).reduce(
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
            "gpuINTEL.json",
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
