const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
        "https://www.amazon.com/s?k=cpu&crid=2UOHY1GMRTUBX&sprefix=%2Caps%2C492&ref=nb_sb_noss_2"
    );
    // await page.screenshot({ path: "mywebsite.png" });

    const grabParagraph = await page.evaluate(() => {
        const pgTag = document.querySelector(
            ".a-size-medium.a-color-base.a-text-normal"
        );
        return pgTag.innerText; // or .innerHTML
    });

    console.log(grabParagraph);
    await browser.close();
})();
