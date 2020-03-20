import React, { Component } from "react";
import config from "./config";
import Dropdown from "react-dropdown";
import formatNum from "./formatNumber";
import { Container, Nav } from "./styled-components";
import { Vega } from "react-vega";
import UserImg from "./assets/images/user.png";
import { Barspec, bwDielspec, fwDielspec, pieChartspec, pieChart } from "./charts";

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      bwCalls: null,
      fwCalls: null,
      otCalls: null,
      totalCalls: null,
      pieData: { table: []},
      barData: { table: [] },
      bwdielData: { source: [] },
      fwdielData: { source: [] },
      avgCallsTrend: []
    };
  }

  getData = arg => {
    // google sheets data
    const arr = this.state.items;
    const arrLen = arr.length;

    let bwCalls = 0;
    let fwCalls = 0;
    let otCalls = 0;
    let totalCalls = 0;
    let avgCallsTrend = [];
    let arrtab = [];
    let bwarrdiel = [];
    let fwarrdiel = [];
    let piearr = [];
    let selectedValue = null;
    let count = 0;

    for (let j = 0; j < arrLen; j++) {
      
      var dateStr = arr[j]["Date_time"];
      var dateOnly = dateStr.split(" ");
      var dayOnly = dateOnly[0].split("/");
      var hrOnly = dateOnly[1].split(":");
      var hr = parseInt(hrOnly[0]) + hrOnly[1] / 60;
      arrtab.push({ x: arr[j]["Date_time"], y: arr[j]["Blue_whale"], c: 0 });
      arrtab.push({ x: arr[j]["Date_time"], y: arr[j]["Fin_whale"], c: 1 });
      bwarrdiel.push({
        HourOfDay: hr,
        Day: dayOnly[1],
        Calls: arr[j]["Blue_whale"]
      });
      fwarrdiel.push({
        HourOfDay: hr,
        Day: dayOnly[1],
        Calls: arr[j]["Fin_whale"]
      });
    }

    for (let i = 0; i < arrLen; i++) {
      var dateStr = arr[i]["Date_time"];
      var dateOnly = dateStr.split(" ");
      if (arg === dateOnly[0]) {
        count += 1;
        bwCalls += parseInt(arr[i].Blue_whale);
        fwCalls += parseInt(arr[i].Fin_whale);
        otCalls += parseInt(arr[i].Other);
      }
    }
    var bwCallsinhr = formatNum((bwCalls / count) * 4);
    var fwCallsinhr = formatNum((fwCalls / count) * 4);
    var otCallsinhr = formatNum((otCalls / count) * 4);

    var totalCallsinhr = parseInt(bwCallsinhr) + parseInt(fwCallsinhr) + parseInt(otCallsinhr) ;

    piearr.push( {"category": "Blue whale", "calls": formatNum((bwCallsinhr/totalCallsinhr)*100)});
    piearr.push( {"category": "Fin whale", "calls": formatNum((fwCallsinhr/totalCallsinhr)*100)});
    piearr.push( {"category": "Other sounds", "calls": formatNum((otCallsinhr/totalCallsinhr)*100)});

    console.log(piearr);

    avgCallsTrend.push({
      label: "Blue Whale",
      value: bwCallsinhr,
      displayValue: `${bwCallsinhr} Calls`
    });
    avgCallsTrend.push({
      label: "Fin Whale",
      value: fwCallsinhr,
      displayValue: `${fwCallsinhr} Calls`
    });
    totalCalls = bwCalls + fwCalls + otCalls;

    selectedValue = arg;

    // setting state
    this.setState({
      bwCalls: bwCallsinhr,
      fwCalls: fwCallsinhr,
      otCalls: otCallsinhr,
      totalCalls: formatNum((totalCalls / count) * 4),
      avgCallsTrend: avgCallsTrend,
      pieData: { table: piearr},
      barData: { table: arrtab },
      bwdielData: { source: bwarrdiel },
      fwdielData: { source: fwarrdiel },
      selectedValue: selectedValue
    });
  };

  updateDashboard = event => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value });
  };

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];
        for (let i = 0; i < rows.length; i++) {
          var dateStr = rows[i].Date_time;
          var dateOnly = dateStr.split(" ");
          dropdownOptions.push(dateOnly[0]);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();

        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "03/18/20"
          },
          () => this.getData("03/18/20")
        );
      });
  }

  render() {
    return (
      <Container>
        {/* static navbar - top */}
        <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
          <Container className="navbar-brand h1 mb-0 text-large font-medium">
            Orca Dashboard
          </Container>
          <Container className="navbar-nav ml-auto">
            <Container className="user-detail-section">
              <span className="pr-2">Your Profile</span>
              <span className="img-container">
                <img src={UserImg} className="rounded-circle" alt="user" />
              </span>
            </Container>
          </Container>
        </Nav>

        {/* static navbar - bottom */}
        <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
          <Container className="text-medium">Summary</Container>
          <Container className="navbar-nav ml-auto">
            <Dropdown
              className="pr-2 custom-dropdown"
              options={this.state.dropdownOptions}
              onChange={this.updateDashboard}
              value={this.state.selectedValue}
              placeholder="Select an option"
            />
          </Container>
        </Nav>

        {/* content area start */}
        <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">

          {/* row 1 */}
          <Container className="row">
            <Container className="col-md-4 col-lg-3 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
              <Container className="card-heading mb-3">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Percentage Avg Calls/hr
                  </Container>
                </Container>
               <Vega spec={pieChart} data={this.state.pieData} theme="dark"/>
              </Container>
            </Container>

            <Container className="col-md-8 col-lg-9 is-light-text mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="row full-height">
                  <Container className="col-sm-4 full height">
                    <Container className="grid-card is-card-dark">
                      <Container className="card-heading">
                        <Container className="is-dark-text-light letter-spacing text-small">
                          Blue Whale Avg Calls/hr
                        </Container>
                      </Container>

                      <Container className="card-value pt-4 text-x-large">
                        {this.state.bwCalls}
                      </Container>
                    </Container>
                  </Container>
                  <Container className="col-sm-4 full-height border-left border-right">
                    <Container className="chart-container full-height">
                      <Container className="grid-card is-card-dark">
                        <Container className="card-heading">
                          <Container className="is-dark-text-light letter-spacing text-small">
                            Fin Whale Avg Calls/hr
                          </Container>
                        </Container>

                        <Container className="card-value pt-4 text-x-large">
                          {this.state.fwCalls}
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                  <Container className="col-sm-4 full-height">
                    <Container className="chart-container full-height">
                      <Container className="grid-card is-card-dark">
                        <Container className="card-heading">
                          <Container className="is-dark-text-light letter-spacing text-small">
                            Other Avg Sounds/hr
                          </Container>
                        </Container>

                        <Container className="card-value pt-4 text-x-large">
                          {this.state.otCalls}
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>

          {/* row 2 */}
          <Container className="row" style={{ minHeight: "400px" }}>
            <Container className="col-md-12 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="chart-container large full-height">
                  <Vega spec={Barspec} data={this.state.barData} theme="dark" />
                </Container>
              </Container>
            </Container>
          </Container>

          {/* row 3 */}
          <Container className="row" style={{ minHeight: "400px" }}>
            <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="chart-container large full-height">
                  <Vega spec={bwDielspec} data={this.state.bwdielData} theme="dark" />
                </Container>
              </Container>
            </Container>

            <Container className="col-md-6 mb-4">
              <Container className="card is-card-dark chart-card">
                <Container className="chart-container large full-height">
                  <Vega spec={fwDielspec} data={this.state.fwdielData} theme="dark" />
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
        {/* content area end */}
      </Container>
    );
  }
}

export default App;
