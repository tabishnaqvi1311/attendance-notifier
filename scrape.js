require('dotenv').config()
const puppeteer = require('puppeteer');

const crawlPage = async () => {
    const browser = await puppeteer.launch({ headless: 'true' })
    const page = await browser.newPage();

    await page.goto('https://mrei.icloudems.com/corecampus/index.php');

    await page.type('[name = userid]', process.env.USERID);
    await page.type('[name = pass_word]', process.env.PASSWORD);
    await page.click('#psslogin');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await new Promise((resolve) => setTimeout(resolve, 5000));

    
    try{
        await page.waitForSelector(".page-content .col-md-12 .row.animated.fadeInUp .col-md-2.col-sm-3.text-center a")
    }
    catch(e){
        console.log(e.message, "restarting..");
        await browser.close()
        crawlPage();
    }


    await page.evaluate(() => {
        const element = Array.from(document.querySelectorAll(".page-content .col-md-12 .row.animated.fadeInUp .col-md-2.col-sm-3.text-center a"))[2];

        if (element) element.click();
    })

    await new Promise((resolve) => setTimeout(resolve, 5000));


    const getAttendance = await page.evaluate(() => {
        const rows = document.querySelectorAll('tbody tr:not(:last-child)');
        let shouldIGo = true;

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const attendance = parseFloat(cells[5].textContent); 
            if(attendance > 0 && attendance < 80.0){
                shouldIGo = false;
                return shouldIGo;
            }
        });

        return shouldIGo;
    })

    await browser.close();
    return getAttendance;
}

module.exports = crawlPage;