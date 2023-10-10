const { JSDOM } = require('jsdom');
const fs = require('fs');

const crawlPage = async (baseURL, currentURL, pages) => {
    
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }
    
    const normalizeCurrentURL = normalizeURL(currentURL);
    
    if(pages[normalizeCurrentURL] > 0){
        pages[normalizeCurrentURL]++;
        return pages;
    }
    
    pages[normalizeCurrentURL] = 1;

    console.log(`actively crawling...${currentURL}`)
    

    try {
        const resp = await fetch(`${currentURL}`);
        const textOfResponse = await resp.text()
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} @ ${currentURL}`)
            return pages;
        }

        const contentType = resp.headers.get('content-type');
        if(!contentType.includes('text/html')){
            console.log(`non html ${resp.status} on ${currentURL}`)
        }

        const nextURLs = getURLsfromHTTP(textOfResponse, baseURL);
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages);
        }

        fs.writeFile('textOfResponse.txt', textOfResponse, () => {
            console.log('writing to textofResponses.txt...');
        });
    } catch (error) {
        console.log(error + `->@  ${currentURL}`);
    }
    return pages
}

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
    getURLsfromHTTP,
    crawlPage
}