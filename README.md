## OrcaDashboard

https://dhananjaypurohit.github.io/OrcaDashboard/

A dashboard to visualize Woods Hole Oceanographic Institution marine mammal detection data(http://dcs.whoi.edu/sb1119/sb1119_buoy_html/sb1119_buoy_summary.html) in the form of bar graphs, pie charts, diel plots with features of notication alert on Slack channel when calls exceeded a threshold limit of 60.

Steps to run the project:

After cloning the repository, 
1. Rename `.env-sample` into `.env` and paste your google sheets api key.<br>
2. use npm install to install all the dependencies needed.<br>
3. Run npm start to run project in development server. <br>

Steps to run the project with Docker way:-
1. Rename `.env-sample` into `.env` and paste your google sheets api key.<br>
2. Run `docker-compose -f docker-compose.dev.yml up`.<br>

The folder `Azure-function` contains a timer trigger function to scrap data and load into spreadsheet once in a day(at 11:30 UTC).

Alert message on Slack channel-

![alert](https://user-images.githubusercontent.com/44242169/103332087-bf495e00-4a8e-11eb-95fe-f0a7a557a07c.png)
