## OrcaDashboard

https://dhananjaypurohit.github.io/OrcaDashboard/

A dashboard to visualize Woods Hole Oceanographic Institution marine mammal detection data(http://dcs.whoi.edu/sb1119/sb1119_buoy_html/sb1119_buoy_summary.html) in the form of bar graphs, pie charts, diel plots.

Steps to run the project:

After cloning the repository, 
1. Rename `.env-sample` into `.env` and paste your google sheets api key.<br>
2. use npm install to install all the dependencies needed.<br>
3. Run npm start to run project in development server. <br>

The folder `Azure-function` contains a timer trigger function to scrap data and load into spreadsheet once in a day(at 11:30 UTC).




