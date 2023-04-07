const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
        "https://www.amazon.com/s?k=cpu&crid=2UOHY1GMRTUBX&sprefix=%2Caps%2C492&ref=nb_sb_noss_2"
    );

    const cpuPriceRate = await page.evaluate(() => {
        const cpuPriceRateContainer = document.querySelectorAll(
            "#priceRefinements.a-section.a-spacing-none"
        );
        let cpuPriceRateArray = [];
        cpuPriceRateContainer.forEach((cpuPriceTag) => {
            const cpuPriceInfo = cpuPriceTag.querySelectorAll(
                "li span.a-size-base.a-color-base"
            );
            const cpuPriceLow = cpuPriceInfo[0];
            // const cpuPriceHigh = cpuPriceInfo.slice[2,3]; //// ยังหาทางใช้ไม่ได้
            const cpuPriceHigh = cpuPriceInfo[2];
            const cpuPriceHighP = cpuPriceInfo[3];
;
            cpuPriceRateArray.push({

                Low: cpuPriceLow.innerText,
                // High: cpuPriceHigh.innerText 
            //    High: cpuPriceHigh[2].innerText + '-' + cpuPriceHighP[3].innerText
               High: cpuPriceHigh.innerText + '  and  ' + cpuPriceHighP.innerText
 
            });
        });
        return cpuPriceRateArray;
    });

    console.log(cpuPriceRate);
    await browser.close();
})();
