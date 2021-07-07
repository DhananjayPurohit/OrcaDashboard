const puppeteer = require("puppeteer");
const { GoogleSpreadsheet } = require("google-spreadsheet");

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('');
}

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    try {
      const browser = await puppeteer.connect({
        browserWSEndpoint: 'wss://chrome.browserless.io/'
      });
        const page = await browser.newPage();
        // await page.setDefaultNavigationTimeout(0);
        const doc = new GoogleSpreadsheet(
          "1UebD7Y3HSY-4-79JvAQgWPUKa1ZpeRKeqyLCvxVG1Ic"
        );
        await doc.useServiceAccountAuth(
          require("./credentials.json"),
          "orcadash@orca-dash.iam.gserviceaccount.com"
        );
    
        await doc.loadInfo(); // loads document properties and worksheets
        console.log(doc.title);
    
        const sheet = doc.sheetsByIndex[0];

        var dateObj = new Date();
        dateObj.setDate(dateObj.getDate()-1);
        
        const url=`http://dcs.whoi.edu/sb1119/sb1119_buoy_html/sb1119_buoy_summary_${formatDate(dateObj)}.html#table`;
        console.log(url);
        await page.goto(url,{waitUntil: 'load', timeout: 0})
            const data =await page.$$eval("td", (anchors) => {
              return anchors.map((anchor) => anchor.textContent);
            });
            context.log(data);
            var rows=[]
            for (var i = 0; i < data.length; i += 6) {
              rows.push({
                Date_time: data[i],
                Blue_whale: data[i + 1],
                Fin_whale: data[i + 2],
                Other: data[i + 3],
                Duration: data[i + 4],
                Tracks: data[i + 5],
              });
            }
            const larryRow =await sheet.addRows(rows);
    
        // await browser.close();
      } catch (error) {
        context.log(error);
      }
    context.log('JavaScript timer trigger function ran!', timeStamp);   
};