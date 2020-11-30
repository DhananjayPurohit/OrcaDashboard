const puppeteer = require('puppeteer')
const fs = require('fs')

async function getVisual() {
	try {
		const URL = 'http://dcs.whoi.edu/sb1119/sb1119_buoy_html/sb1119_buoy_summary.html#table'
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		await page.tracing.start({
			path: 'trace.json',
			categories: ['devtools.timeline']
		  })

		await page.goto(URL)
		const stories = await page.$$eval('a', anchors => { return anchors.map(anchor => anchor.href).slice(329,-76) })
		console.log(stories)
		const jsonString = JSON.stringify(stories)
		fs.writeFile('./links.json', jsonString, err => {
    		if (err) {
        		console.log('Error writing file', err)
    		} else {
        		console.log('Successfully wrote file')
    		}
		})
		// for (var story in stories){
		// 	await page.goto(story)
		// 	const data = await page.$$eval('td', anchors => { return anchors.map(anchor => anchor.textContent) })
		// 	console.log(data)
		// }  
  		await page.tracing.stop()

		await browser.close()
	} catch (error) {
		console.error(error)
	}
}

getVisual()