const { JSDOM } = require('jsdom');

const normalizeURL = (urlString) => {
    const urlObject = new URL(urlString)
    // console.log(urlObject + "|" + urlObject.hostname + "|" + urlObject.pathname)
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1)) { //slice returns last character of string
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

const getURLsfromHTTP = (htmlBody, baseURL) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElementsEmbeddedInsideTheDOM = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElementsEmbeddedInsideTheDOM) {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative
            try {
                //URL validation, if invalid URl constructor throws error
                const urlObject = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObject.href);
            } catch (error) {
                console.log('relative URL error: ' + error.message);
            }
        }
        else {
            //absolute
            try {
                //URL validation, if invalid URl constructor throws error
                const urlObject = new URL(`${linkElement.href}`);
                urls.push(urlObject.href);
            } catch (error) {
                console.log('absolute URL error' + error.message);
            }
        }
    }
    return urls;
}
//returns a list of all <a> tags

module.exports = {
    normalizeURL,
    getURLsfromHTTP
}