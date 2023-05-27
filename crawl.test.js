const {normalizeURL} = require('./crawl');
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

