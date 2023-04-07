const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const gpuAmdSources = {};

        await page.goto(
            "https://www.ihavecpu.com/pages/Category?mode=manu_tab&search=NVIDIA&id=7&id_s=33&sort_by=DESC&page=1"
        );

        gpuAmdSources.name = await page.$$eval(
            ".col-6.col-md-4.col-xl-3.content-card-category .card-product-text-diy h6.f-09",
            (names) =>
                names
                    .filter((_, i) => [0, 3, 6, 7, 10, 12, 14].includes(i))
                    .map((text) => text.innerText)
        );
        gpuAmdSources.detail = await page.$$eval(
            ".col-6.col-md-4.col-xl-3.content-card-category .card-product-text-diy p",
            (details) =>
                details
                    .filter((_, i) => [0, 3, 6, 7, 10, 12, 14].includes(i))
                    .map((text) => text.innerText)
        );

        gpuAmdSources.price = await page.$$eval(
            ".col-6.col-md-4.col-xl-3.content-card-category .card-product-footer.footer-cate h5.card-product-price-normal,m-0",
            (price) =>
                price
                    .filter((_, i) => [0, 3, 6, 7, 10, 12, 14].includes(i))
                    .map((text) => text.innerText)
        );

        gpuAmdSources.image = await page.$$eval(
            ".col-6.col-md-4.col-xl-3.content-card-category .box-images.mx-auto img.image-cate",
            (images) =>
                images
                    .filter((_, i) => [0, 3, 6, 7, 10, 12, 14].includes(i))
                    .map((img) => img.src)
        );
        console.log(gpuAmdSources);

        const groupedData = Object.entries(gpuAmdSources).reduce(
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
            "./gpus/gpuNVIDIA.json",
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
