const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
        "https://www.amazon.com/s?k=amd+7000+series+cpu&ref=nb_sb_noss"
    );
    // await page.screenshot({ path: "mywebsite.png" });

    const cpuNameArray = await page.evaluate(() => {
        const cpuNameTag = document.querySelectorAll(
            ".sg-col-inner span.a-size-medium.a-color-base.a-text-normal"
        );
        let cpuName = [];
        cpuNameTag.forEach((tag) => {
            cpuName.push(tag.innerText);
        });
        return cpuName;
    });

    console.log(cpuNameArray);
    await browser.close();
})();