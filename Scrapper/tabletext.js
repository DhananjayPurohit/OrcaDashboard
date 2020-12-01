const puppeteer = require("puppeteer");
const fs = require("fs");
const { google } = require("googleapis");
const { GoogleSpreadsheet } = require("google-spreadsheet");

async function getVisual() {
  try {
    const browser = await puppeteer.launch();
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

    fs.readFile("./links.json", "utf8", async (err, links) => {
      if (err) {
        console.log(err);
        return;
      }
      var link=JSON.parse(links)
      console.log(link); // => "Infinity Loop Drive"
      for (let j=0;j<link.length;j++){
        console.log(link[j]);
        await page.goto(link[j],{waitUntil: 'load', timeout: 0})
        const data =await page.$$eval("td", (anchors) => {
          return anchors.map((anchor) => anchor.textContent);
        });
        console.log(data);
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
      }
    });

    // await browser.close();
  } catch (error) {
    console.error(error);
  }
}

getVisual();
