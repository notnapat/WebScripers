const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const cpuAmdSources = {};

        await page.goto(
            "https://www.bnn.in.th/th/p/computer-hardware-diy/harddisk-and-solid-state-drive-2/m2-harddisk-and-solid-state-drive?sort_by=price_desc"
        );

        cpuAmdSources.name = await page.$$eval(
            ".product-item-details .product-name",
            (names) =>
                names
                    .filter((_, i) => [0, 1, 3, 4, 5, 7, 8].includes(i))
                    .map((text) => text.innerText)
        );
        cpuAmdSources.detail = await page.$$eval(
            ".product-link.product-item div.product-short-attribute",
            (details) =>
                details
                    .filter((_, i) => [0, 1, 3, 4, 5, 7, 8].includes(i))
                    .map((text) => text.innerText)
        );

        cpuAmdSources.price = await page.$$eval(
            ".product-link.product-item div.product-price",
            (price) =>
                price
                    .filter((_, i) => [0, 1, 3, 4, 5, 7, 8].includes(i))
                    .map((text) => text.innerText)
        );

        cpuAmdSources.image = await page.$$eval(
            ".product-item-image-container .aspect-ratio-content img.image",
            (images) =>
                images
                    .filter((_, i) => [0, 1, 3, 4, 5, 7, 8].includes(i))
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
            "./ssd-m2/ssd-m2.json",
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
