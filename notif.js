const crawlPage = require("./scrape")

const main = async() => {
    const attendanceStatus = await crawlPage();
    
    let message = "default";

    if(attendanceStatus === 1) message = "You can sleep!";
    else message = "Wake up! Attendance is Low";

    const sendNotif = async() => {
        await fetch(`https://ntfy.sh/erp_attendance_notif`, {
            method: "POST",
            body: message
        })
    }

    sendNotif();
}

main();