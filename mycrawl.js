require('dotenv').config()

const puppeteer = require('puppeteer');

const crawlPage = async() => {
    const browser = await puppeteer.launch({ headless: 'true'})
    const page = await browser.newPage();
    console.log(`page opened`);

    await page.goto('https://mrei.icloudems.com/corecampus/index.php');
    console.log(`at page https://mrei.icloudems.com/corecampus/index.php`);

    try {
        await page.type('[name = userid]', process.env.USERID);
        await page.type('[name = pass_word]', process.env.PASSWORD);
        await page.click('[id = psslogin]');
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await page.click('[id = psslogin]');
        await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
        console.log('timeout! closing due to...' + error.message);
        await browser.close();
    }
    
    console.log(`User has succesfully logged in!`);
    // await page.screenshot({path: `done.png`});
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await page.goto('https://mrei.icloudems.com/corecampus/student/attendance/subwise_attendace_new.php');
    // console.log(`navigating to attendance page`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // await page.screenshot({path: `attendance.png`});

    const getAttendance = await page.evaluate(() => {
        const tdElements = Array.from(document.querySelectorAll('tbody tr td'));
        let getAttendance = null;

        for(let i = tdElements.length - 1; i>=0 ; i--){
            const tdElement = tdElements[i];
            if(tdElement.querySelector('b')){
                getAttendance = tdElement.querySelector('b').textContent.trim();
                break;
            }
        }
        return getAttendance;
    })
    await browser.close();
    return getAttendance;
}

module.exports = crawlPage;