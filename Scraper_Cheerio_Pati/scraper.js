const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url =
    "https://www.amazon.com/Apple-MacBook-Laptop-12%E2%80%91core-19%E2%80%91core/dp/B0BSHF7WHW/ref=sr_1_5?crid=1Q6G65S526S9S&keywords=macbook&qid=1677053172&sprefix=maxboo%2Caps%2C431&sr=8-5&th=1";
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
        const item = $("div#dp-container");

        product.name = $(item).find("h1 span#productTitle").text();
        product.image = $(item).find("img#landingImage").attr("src");
        // product.image = $(item)
        //     .find("img#landingImage")
        //     .attr("data-a-dynamic-image");
        product.price = $(item).find("div span.a-offscreen").text();
        product.linkin = url;

        // Create product.json file
        fs.writeFile(
            "product.json",
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
