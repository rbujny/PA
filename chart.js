let height_chart = new Chart("height_chart", {
    type: "line",
    
    data: {
      labels: [],
      datasets: [{
        data: [],
        borderColor: "pink",
        borderWidth: 1,
        label: 'drone_height',
        pointRadius: 0,
        
        fill: false
      },{
        data: [],
        borderWidth: 1,
        borderColor: "red",
        label: 'target_height',
        pointRadius: 0,
  
        fill: false
      }]
    },
    options: {
      legend: {display: true},
      scales: {
          yAxes: [{
                  display: true,
                  ticks: {
                      min: 0,
                      max: 1080 / 2
                  }
              }]
      },
    }
  });
  let pid_chart = new Chart("PID_chart", {
    type: "line",
    
    data: {
      labels: [],
      datasets: [{
        data: [],
        borderWidth: 1,
  
        borderColor: "green",
        label: 'PID',
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      legend: {display: true},
      scales: {
          yAxes: [{
                  display: true,
                  ticks: {
                      min: -1.5,
                      max: 1.5
                  }
              }]
      },
    }
  });
  let air_drag_chart = new Chart("air_drag_chart", {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        data: [],
        borderWidth: 1,
  
        borderColor: "blue",
        label: 'abs(air_drag)',
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      legend: {display: true},
      scales: {
          yAxes: [{
                  display: true,
                  ticks: {
                      min: 0,
                      max: 10
                  }
              }]
      },
    }
  });
  let wind_force_chart = new Chart("wind_force_chart", {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        data: [],
        borderWidth: 1,
  
        borderColor: "magenta",
        label: 'wind_force.y',
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      legend: {display: true},
      scales: {
          yAxes: [{
                  display: true,
                  ticks: {
                      min: -3,
                      max: 3
                  }
              }]
      },
    }
  });
  function removeData(chart) {
      chart.data.labels.shift();
      chart.data.datasets.forEach((dataset) => {
          dataset.data.shift();
      });
      chart.update();
  }
  let maxDataSize = 300;
  let updateChart = function(chart, label, data) {
    chart.data.labels.push(label);
    for (let i = 0; i < data.length; i++) { 
      chart.data.datasets[i].data.push(data[i]);
    }
    
  
    if(chart.data.datasets[0].data.length > maxDataSize){
      removeData(chart);
    }
    chart.update();
  }