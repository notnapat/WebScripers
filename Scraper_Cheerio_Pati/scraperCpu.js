const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url =
    "https://www.amazon.com/s?k=cpu&crid=2UOHY1GMRTUBX&sprefix=%2Caps%2C492&ref=nb_sb_noss_2";
const product = {
    // name: "",
    // image: "",
    // price: "",
    // link: "",
};

async function scrape() {
    try {
        //Fetch HTML
        const { data } = await axios.get(url);
        // Load HTML
        const $ = cheerio.load(data);

        // Select div items + id, class
        const item = $(
            ".sg-col-inner"
        );

        product.name = $(item)
            .find(".a-size-medium.a-color-base.a-text-normal")
            .text();
        product.image = $(item).find("div.sg-col-inner img.s-image").attr("src");
        // product.image = $(item)
        //     .find("img#landingImage")
        //     .attr("data-a-dynamic-image");
        product.price = $(item).find("div span.a-price-whole").text();
        product.linkin = url;

        // Create product.json file
        fs.writeFile(
            "productCpu.json",
            JSON.stringify(product, null, 2),
            (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("completed!!");
            }
        );
    } catch (err) {
        console.log(err);
    }
}

scrape();
