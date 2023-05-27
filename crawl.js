const normalizeURL = (urlString) => {
    const urlObject = new URL(urlString)
    // console.log(urlObject + "|" + urlObject.hostname + "|" + urlObject.pathname)
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1)) { //slice returns last character of string
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

//this is just a stub function

module.exports = {
    normalizeURL
}