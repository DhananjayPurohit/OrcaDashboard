  export const Barspec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Species call counts",
    "description": "A basic stacked bar chart example.",
    "width": 1150,
    "height": 300,
    "padding": 5,
    "background": "transparent",
    "data": {
      "name": "table",
    },
    "mark": "bar",
    "encoding": {
      "x": {
        "field": "date_time",
        "type": "temporal",
        "timeUnit": {"unit":"yearmonthdatehoursminutes","step": 15},
        "scale": {"type": "utc"},
        "axis": {"labelAngle": 15},
        "title": "Date-time",
        "band": 0.5,
      },
      "y": {"field": "calls", "type": "quantitative", "title": "Calls per 15 minutes"},
      "color": {
        "field": "type",
        "type": "nominal",
        "scale": {
          "domain": ["Blue_whale", "Fin_whale"],
        },
        "legend": {"title": "Type"}
      },
      "tooltip": [
        {"field": "date_time", "type": "temporal", "timeUnit": "yearmonthdatehoursminutes"},
        {"field": "calls", "type": "quantitative"},
        {"field": "type", "type": "nominal"}
      ]
    }
  }

  export const bwDielspec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "title": "Diel plot for Blue whale",
    "description": "A basic scatter plot example depicting automobile statistics.",
    "background":"transparent",
    "width": 500,
    "height": 300,
    "padding": 5,
  
    "data": [
      {
        "name": "source",
        "transform": [
          {
            "type": "filter",
            "expr": "datum['HourOfDay'] != null && datum['Day'] != null && datum['Calls'] != null"
          }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "x",
        "type": "linear",
        "round": true,
        "nice": true,
        "zero": true,
        "domain": {"data": "source", "field": "HourOfDay"},
        "range": "width"
      },
      {
        "name": "y",
        "type": "linear",
        "round": true,
        "nice": true,
        "zero": false,
        "domain": {"data": "source", "field": "Day"},
        "range": "height",
      },
      {
        "name": "size",
        "type": "linear",
        "round": true,
        "nice": false,
        "zero": true,
        "domain": {"data": "source", "field": "Calls"},
        "range": [4,361]
      }
    ],
  
    "axes": [
      {
        "scale": "x",
        "grid": true,
        "domain": false,
        "orient": "bottom",
        "tickCount": 6,
        "title": "Hour of day (local time)"
      },
      {
        "scale": "y",
        "grid": true,
        "domain": false,
        "orient": "left",
        "tickCount": 5,
        "titlePadding": 5,
        "title": "Day of month"
      }
    ],
  
    "legends": [
      {
        "size": "size",
        "title": "Calls",
        "format": "s",
        "symbolStrokeColor": "#4682b4",
        "symbolStrokeWidth": 2,
        "symbolOpacity": 0.5,
        "symbolType": "circle"
      }
    ],
  
    "marks": [
      {
        "name": "marks",
        "type": "symbol",
        "from": {"data": "source"},
        "encode": {
          "update": {
            "x": {"scale": "x", "field": "HourOfDay"},
            "y": {"scale": "y", "field": "Day"},
            "size": {"scale": "size", "field": "Calls"},
            "shape": {"value": "circle"},
            "strokeWidth": {"value": 2},
            "opacity": {"value": 0.5},
            "stroke": {"value": "#4682b4"},
            "fill": {"value": "transparent"}
          }
        }
      }
    ]
  }

  export const fwDielspec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "title": "Diel plot for Fin whale",
    "description": "A basic scatter plot example depicting automobile statistics.",
    "background":"transparent",
    "width": 500,
    "height": 300,
    "padding": 5,
  
    "data": [
      {
        "name": "source",
        "transform": [
          {
            "type": "filter",
            "expr": "datum['HourOfDay'] != null && datum['Day'] != null && datum['Calls'] != null"
          }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "x",
        "type": "linear",
        "round": true,
        "nice": true,
        "zero": true,
        "domain": {"data": "source", "field": "HourOfDay"},
        "range": "width"
      },
      {
        "name": "y",
        "type": "linear",
        "round": true,
        "nice": true,
        "zero": false,
        "domain": {"data": "source", "field": "Day"},
        "range": "height",
      },
      {
        "name": "size",
        "type": "linear",
        "round": true,
        "nice": false,
        "zero": true,
        "domain": {"data": "source", "field": "Calls"},
        "range": [4,361]
      }
    ],
  
    "axes": [
      {
        "scale": "x",
        "grid": true,
        "domain": false,
        "orient": "bottom",
        "tickCount": 6,
        "title": "Hour of day (local time)"
      },
      {
        "scale": "y",
        "grid": true,
        "domain": false,
        "orient": "left",
        "tickCount": 5,
        "titlePadding": 5,
        "title": "Day of month"
      }
    ],
  
    "legends": [
      {
        "size": "size",
        "title": "Calls",
        "format": "s",
        "symbolStrokeColor": "#4682b4",
        "symbolStrokeWidth": 2,
        "symbolOpacity": 0.5,
        "symbolType": "circle"
      }
    ],
  
    "marks": [
      {
        "name": "marks",
        "type": "symbol",
        "from": {"data": "source"},
        "encode": {
          "update": {
            "x": {"scale": "x", "field": "HourOfDay"},
            "y": {"scale": "y", "field": "Day"},
            "size": {"scale": "size", "field": "Calls"},
            "shape": {"value": "circle"},
            "strokeWidth": {"value": 2},
            "opacity": {"value": 0.5},
            "stroke": {"value": "#4682b4"},
            "fill": {"value": "transparent"}
          }
        }
      }
    ]
  }

  export const pieChart = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "background": "transparent",
    "width": 150,
    "height": 150,
    "autosize": "pad",
    "signals": [
      {"name": "startAngle", "value": 0},
      {"name": "endAngle", "value": 6.29},
      {"name": "padAngle", "value": 0},
      {"name": "sort", "value": true},
      {"name": "strokeWidth", "value": 2},
      {
        "name": "selected",
        "value": "",
        "on": [{"events": "mouseover", "update": "datum"}]
      }
    ],
    "data": [
      {
        "name": "table",
        "values": [
          {"category": "Blue whale", "calls": 8},
          {"category": "Other sounds", "calls": 10},
          {"category": "Fin whale", "calls": 5},
        ],
        "transform": [
          {
            "type": "pie",
            "field": "calls",
            "startAngle": {"signal": "startAngle"},
            "endAngle": {"signal": "endAngle"},
            "sort": {"signal": "sort"}
          }
        ]
      },
      {
        "name": "fieldSum",
        "source": "table",
        "transform": [
          {
            "type": "aggregate",
            "fields": ["calls"],
            "ops": ["sum"],
            "as": ["sum"]
          }
        ]
      }
    ],
    "legends": [
      {
        "fill": "color",
        "title": "Type",
        "orient": "none",
        "padding": {"value": 10},
        "encode": {
          "symbols": {"enter": {"fillOpacity": {"value": 1}}},
          "legend": {
            "update": {
              "x": {
                "signal": "(width / 2) + if(selected && selected.category == datum.category, if(width >= height, height, width) / 2 * 1.1 * 0.8, if(width >= height, height, width) / 2 * 0.8)",
                "offset": 20
              },
              "y": {"signal": "(height / 2)", "offset": -50}
            }
          }
        }
      }
    ],
    "scales": [
      {"name": "color", "type": "ordinal", "range": {"scheme": "category20"}}
    ],
    "marks": [
      {
        "type": "arc",
        "from": {"data": "table"},
        "encode": {
          "enter": {
            "fill": {"scale": "color", "field": "category"},
            "x": {"signal": "width / 2"},
            "y": {"signal": "height / 2"}
          },
          "update": {
            "startAngle": {"field": "startAngle"},
            "endAngle": {"field": "endAngle"},
            "padAngle": {
              "signal": "if(selected && selected.category == datum.category, 0.015, 0.015)"
            },
            "innerRadius": {
              "signal": "if(selected && selected.category == datum.category, if(width >= height, height, width) / 2 * 0.45, if(width >= height, height, width) / 2 * 0.5)"
            },
            "outerRadius": {
              "signal": "if(selected && selected.category == datum.category, if(width >= height, height, width) / 2 * 1.05 * 0.8, if(width >= height, height, width) / 2 * 0.8)"
            },
            "opacity": {
              "signal": "if(selected && selected.category !== datum.category, 1, 1)"
            },
            "stroke": {"signal": "scale('color', datum.category)"},
            "strokeWidth": {"signal": "strokeWidth"},
            "fillOpacity": {
              "signal": "if(selected && selected.category == datum.category, 0.8, 0.8)"
            }
          }
        }
      },
      {
        "type": "text",
        "encode": {
          "enter": {"fill": {"value": "#ffffff"}, "text": {"value": ""}},
          "update": {
            "opacity": {"value": 1},
            "x": {"signal": "width / 2"},
            "y": {"signal": "height / 2"},
            "align": {"value": "center"},
            "baseline": {"value": "middle"},
            "fontSize": {"signal": "if(width >= height, height, width) * 0.05"},
            "text": {"value": ""}
          }
        }
      },
      {
        "name": "mark_calls",
        "type": "text",
        "from": {"data": "table"},
        "encode": {
          "enter": {
            "text": {
              "signal": "if(datum['endAngle'] - datum['startAngle'] < 0.3, '', datum['calls'])"
            },
            "x": {"signal": "if(width >= height, height, width) / 2"},
            "y": {"signal": "if(width >= height, height, width) / 2"},
            "radius": {
              "signal": "if(selected && selected.category == datum.category, if(width >= height, height, width) / 2 * 1.05 * 0.65, if(width >= height, height, width) / 2 * 0.65)"
            },
            "theta": {"signal": "(datum['startAngle'] + datum['endAngle'])/2"},
            "fill": {"value": "#FFFFFF"},
            "fontSize": {"value": 12},
            "align": {"value": "center"},
            "baseline": {"value": "middle"}
          }
        }
      }
    ]
  }