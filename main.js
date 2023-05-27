const {crawlPage} = require('./crawl');

const main = () => {
    if(process.argv.length < 3){
        console.log('no website found');
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log(`too many args`);
        process.exit(1);
    }

    const baseURL = process.argv[2];

    console.log(`starting crawl of ${baseURL}`);
    crawlPage(baseURL);
}

main()
//we are making a CLI tool