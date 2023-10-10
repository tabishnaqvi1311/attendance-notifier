const { JSDOM } = require('jsdom');

const {normalizeURL, getURLsfromHTTP} = require('./crawl');
const { test, expect } = require('@jest/globals');

test('normalizeURL strip protocol', () => {
    const input = 'https://google.com';
    const actual = normalizeURL(input);
    const expected = 'google.com';
    expect(actual).toEqual(expected);
    //this basically says 
    //"im expecting the actual output
    //of normalizeURL, to equal the
    //expected output specified".

    //if they do equal
    //jest will log it as a pass test
    //if not then test has failed
});
test('normalizeURL strip trailing slashes', () => {
    const input = 'https://google.com';
    const actual = normalizeURL(input);
    const expected = 'google.com';
    expect(actual).toEqual(expected);
});
test('normalizeURL strip capitals', () => {
    const input = 'https://goOGLE.com';
    const actual = normalizeURL(input);
    const expected = 'google.com';
    expect(actual).toEqual(expected);
});
test('normalizeURL strip http', () => {
    const input = 'https://google.com';
    const actual = normalizeURL(input);
    const expected = 'google.com';
    expect(actual).toEqual(expected);
});


test('getURLsfromHTML absoluteURLs', () => {
    const inputHTMLBody = 
    `
    <html>
        <body>
            <a href="https://mrei.icloudems.com/corecampus/index.php">
                ERP site
            </a>
        </body>
    </html>
    `
    //return all urls embedded inside HTML
    const inputBaseURL = "https://mrei.icloudems.com/corecampus/index.php";
    const actual = getURLsfromHTTP(inputHTMLBody, inputBaseURL);
    const expected = ['https://mrei.icloudems.com/corecampus/index.php'];

    expect(actual).toEqual(expected);
})
test('getURLsfromHTML relativeURL', () => { //relative does not include domain, just path
    const inputHTMLBody = 
    `
    <html>
        <body>
            <a href="/path/">
                ERP site
            </a>
        </body>
    </html>
    `
    //return all urls embedded inside HTML
    const inputBaseURL = "https://mrei.icloudems.com/corecampus/index.php";
    const actual = getURLsfromHTTP(inputHTMLBody, inputBaseURL);
    const expected = ['https://mrei.icloudems.com/corecampus/index.php/path/'];

    expect(actual).toEqual(expected);
})
test('getURLsfromHTML both', () => { //relative does not include domain, just path
    const inputHTMLBody = 
    `
    <html>
        <body>
            <a href="https://mrei.icloudems.com/corecampus/index.php/path1/">
                ERP site path one
            </a>
            <a href="/path2/">
                ERP site path two
            </a>
        </body>
    </html>
    `
    //return all urls embedded inside HTML
    const inputBaseURL = "https://mrei.icloudems.com/corecampus/index.php";
    const actual = getURLsfromHTTP(inputHTMLBody, inputBaseURL);
    const expected = ['https://mrei.icloudems.com/corecampus/index.php/path1/', 'https://mrei.icloudems.com/corecampus/index.php/path2/'];

    expect(actual).toEqual(expected);
});
test('getURLsfromHTML invalid', () => { 
    const inputHTMLBody = 
    `
    <html>
        <body>
            <a href="invalid">
                INVALID URL
            </a>
        </body>
    </html>
    `
    //return all urls embedded inside HTML
    const inputBaseURL = "https://mrei.icloudems.com/corecampus/index.php";
    const actual = getURLsfromHTTP(inputHTMLBody, inputBaseURL);
    const expected = [];

    expect(actual).toEqual(expected);
});


