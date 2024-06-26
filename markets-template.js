  const colorRed = '#D45D5D'
  const colorGreen = '#76AB74'
  const colorBlue = '#5AB8D5'
  const colorYellow = '#FDFD96'
  const colorRedSecondary = '#D98E6E'
  const colorGreenSecondary = '#ACD1B7'
  const colorBlueSecondary = '#A9D7E5'
  const colorYellowSecondary = '#EBD889'

  // Navigation
  const nav = document.querySelector('#select-country-investment')
  nav.addEventListener('change', () => {
    let value = nav.value
    // remove spaces and replace with dash, remove dots
    value = value.replace(/\./g, '').toLowerCase().replace(/\s/g, '-')
    window.location.href = `/markets/${value}`
  })

  // Spacing Between Legend and Chart
  const plugin = {
    beforeInit(chart) {
      // Get a reference to the original fit function
      const origFit = chart.legend.fit
      chart.legend.fit = function fit() {
        origFit.bind(chart.legend)()
        // Change the height to any desired value
        this.height += 20
      }
    }
  }

  // Data from Mjesecni kalkulatori i 6 - Kalkulatori Scenario... za pojedinacnu zemlju
  const inflation = [2.99, 5.68, 8.19, 10.2]
  const realEstatePricesGrow = [8.0, 7.0, 15.0, 21.0]
  // --------- Get JSON ROI DATA
  const roiJsonData = document.querySelector(
    '#rois-calc-invest-data .w-embed'
  ).textContent
  const roiData = JSON.parse(roiJsonData)

  // --------- GRAPH INFLATION
  const graphWrapInflation = document.getElementById('graph-wrap-inflation')
  const graphIflationCanvas = graphWrapInflation.appendChild(
    document.createElement('canvas')
  )
  graphIflationCanvas.id = 'graphIflationCanvas'
  graphIflationCanvas.width = '100%'
  graphIflationCanvas.height = 400
  const ctxGraphIflation = document
    .getElementById('graphIflationCanvas')
    .getContext('2d')

  // get data for praph from table with ID  table-inflation
  const tableInflation = document.getElementById('table-inflation')
  const tableInflationRows = tableInflation.querySelectorAll('tr')
  const tableInflationLabels = []
  const tableInflationValues = []
  tableInflationRows.forEach((row, index) => {
    if (index > 0) {
      const cells = row.querySelectorAll('td')
      const year = cells[0].textContent
      const inflation = cells[1].textContent
      tableInflationValues.push(parseFloat(inflation))
      tableInflationLabels.push(parseInt(year))
    }
  })

  const graphIflationChart = new Chart(ctxGraphIflation, {
    type: 'line',
    data: {
      labels: tableInflationLabels,
      datasets: [
        {
          label: '',
          data: tableInflationValues,
          fill: true,
          backgroundColor: [colorGreen, colorGreenSecondary],
          color: '#fff'
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      indexAxis: 'x',
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: true,
            color: '#1B3C35'
          },
          ticks: {
            color: '#fff',
            font: {
              size: 12,
              family: "'Inter', 'Arial', sans-serif"
            }
          }
        },
        y: {
          grid: {
            display: true,
            color: '#1B3C35'
          },
          ticks: {
            // mirror: true,
            // z: 1,
            color: '#fff',
            // padding: 20,
            font: {
              size: 12,
              family: "'Inter', 'Arial', sans-serif",
              weight: 'bold'
            }
          }
          // position: 'left'
        }
      }
    }
  })
  // --------- GRAPH Import/Export
  const graphWrapImportExport = document.getElementById(
    'graph-wrap-import-export'
  )
  const graphImportExportCanvas = graphWrapImportExport.appendChild(
    document.createElement('canvas')
  )
  graphImportExportCanvas.id = 'graphImportExportCanvas'
  graphImportExportCanvas.width = '100%'
  graphImportExportCanvas.height = 400
  const ctxGraphImportExport = document
    .getElementById('graphImportExportCanvas')
    .getContext('2d')
  const tableImportExport = document.querySelector(
    '#market-import-export table'
  )
  const tableImportExportRows = tableImportExport.querySelectorAll('tr')

  const tableImportExportLabels = []
  const tableImportExportnValues01 = []
  const tableImportExportnValues02 = []
  tableImportExportRows.forEach((row, index) => {
    if (index > 0) {
      const cells = row.querySelectorAll('td')
      const year = cells[0].textContent + ' ' + cells[1].textContent
      const exportData = cells[2].textContent
      const importData = cells[3].textContent
      tableImportExportnValues01.push(parseInt(exportData.replace(/,/g, '')))
      tableImportExportnValues02.push(parseInt(importData.replace(/,/g, '')))
      tableImportExportLabels.push(year)
    }
  })

  const graphImportExportChart = new Chart(ctxGraphImportExport, {
    type: 'line',
    data: {
      labels: tableImportExportLabels,
      datasets: [
        {
          label: 'Import',
          data: tableImportExportnValues01,
          fill: false,
          backgroundColor: '#fff',
          borderColor: colorGreen,
          color: '#fff'
        },
        {
          label: 'Export',
          data: tableImportExportnValues02,
          fill: false,
          backgroundColor: '#fff',
          borderColor: colorBlue,
          color: '#fff'
        }
      ]
    },
    plugins: [plugin],
    options: {
      plugins: {
        legend: {
          // display: false
          labels: {
            color: '#fff',
            font: {
              size: 14,
              family: "'Inter', 'Arial', sans-serif"
            }
          }
        }
      },
      indexAxis: 'x',
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: true,
            color: '#1B3C35'
          },
          ticks: {
            color: '#fff',
            font: {
              size: 12,
              family: "'Inter', 'Arial', sans-serif"
            }
          }
        },
        y: {
          grid: {
            display: true,
            color: '#1B3C35'
          },
          ticks: {
            // mirror: true,
            // z: 1,
            color: '#fff',
            // padding: 20,
            font: {
              size: 12,
              family: "'Inter', 'Arial', sans-serif",
              weight: 'bold'
            }
          }
          // position: 'left'
        }
      }
    }
  })
  // --------- GRAPH GDP
  const graphWrapbdp = document.getElementById('graph-wrap-bdp')
  const graphBDPCanvas = graphWrapbdp.appendChild(
    document.createElement('canvas')
  )
  graphBDPCanvas.id = 'graphBDPCanvas'
  graphBDPCanvas.width = '100%'
  graphBDPCanvas.height = 400
  const ctxGraphBdp = document.getElementById('graphBDPCanvas').getContext('2d')
  const tableBdp = document.querySelector('#market-bdp table')
  const tableBdpRows = tableBdp.querySelectorAll('tr')

  const tableBdpLabels = []
  const tableBdpValues01 = []
  const tableBdpValues02 = []
  const tableBdpValues03 = []
  tableBdpRows.forEach((row, index) => {
    if (index > 0) {
      const cells = row.querySelectorAll('td')
      const year = cells[0].textContent
      const spendingData = cells[1].textContent
      const investmentsData = cells[2].textContent
      const bdpData = cells[3].textContent
      tableBdpValues01.push(parseInt(spendingData.replace(/,/g, '')))
      tableBdpValues02.push(parseInt(investmentsData.replace(/,/g, '')))
      tableBdpValues03.push(parseInt(bdpData.replace(/,/g, '')))
      tableBdpLabels.push(year)
    }
  })

  const graphBdpChart = new Chart(ctxGraphBdp, {
    type: 'line',
    data: {
      labels: tableBdpLabels,
      datasets: [
        {
          label: 'Spending',
          data: tableBdpValues01,
          fill: false,
          backgroundColor: '#fff',
          borderColor: colorBlue,
          color: '#fff'
        },
        {
          label: 'Investments',
          data: tableBdpValues02,
          fill: false,
          backgroundColor: '#fff',
          borderColor: colorGreen,
          color: '#fff'
        },
        {
          label: 'GDP',
          data: tableBdpValues03,
          fill: false,
          backgroundColor: '#fff',
          borderColor: colorRed,
          color: '#fff'
        }
      ]
    },
    plugins: [plugin],
    options: {
      plugins: {
        legend: {
          // display: false
          labels: {
            color: '#fff',
            font: {
              size: 14,
              family: "'Inter', 'Arial', sans-serif"
            }
          }
        }
      },
      indexAxis: 'x',
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: true,
            color: '#1B3C35'
          },
          ticks: {
            color: '#fff',
            font: {
              size: 12,
              family: "'Inter', 'Arial', sans-serif"
            }
          }
        },
        y: {
          grid: {
            display: true,
            color: '#1B3C35'
          },
          ticks: {
            // mirror: true,
            // z: 1,
            color: '#fff',
            // padding: 20,
            font: {
              size: 11,
              family: "'Inter', 'Arial', sans-serif",
              weight: 'bold'
            }
          }
          // position: 'left'
        }
      }
    }
  })

  // --------- GRAPH Construction
  // Labels for all graphs
  const colorsConstruction = [colorBlue, colorGreen]

  // Function to create a canvas and return its context
  function createCanvas(parentId, canvasId) {
    const parent = document.getElementById(parentId)
    const canvas = parent.appendChild(document.createElement('canvas'))
    canvas.id = canvasId
    canvas.width = '100%'
    canvas.height = 400
    return document.getElementById(canvasId).getContext('2d')
  }

  // Get the table
  const tableConstruction = document.querySelector('#market-construction table')

  // Get the table rows
  const rows = Array.from(tableConstruction.querySelectorAll('tr'))

  // Get the headers from the first row
  const years = Array.from(rows[0].querySelectorAll('td'))
    .slice(1)
    .map((td) => td.textContent.trim())

  // Get the data rows
  const dataRows = rows.slice(1)

  // Initialize an array to store the data for the graphs
  const graphData = []

  // Loop through each data row
  dataRows.forEach((row, index) => {
    // Get the cells in the row
    const cells = Array.from(row.querySelectorAll('td'))

    // Get the label from the first cell
    const label = cells[0].textContent.trim()

    // Get the data from the remaining cells
    const data = cells
      .slice(1)
      .map((cell) => parseFloat(cell.textContent.trim().replace(',', '')))

    // Remove the "Price per m2 - " prefix from the label to get the category
    const category = label.toLowerCase().replace('price per m2 - ', '')

    // Add the data to the graph data array
    graphData.push({
      label: label,
      data: data,
      backgroundColor: colorsConstruction[category] // Use the category as the key to get the color
    })
  })

  // Create the chart
  const ctx = createCanvas(
    'graph-wrap-construction-01',
    'graphConstructionCanvas01'
  )
  const graph = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: graphData.map((dataset) => dataset.label),
      datasets: years.map((year, i) => ({
        label: year,
        data: graphData.map((dataset) => dataset.data[i]),
        backgroundColor: colorsConstruction[i % colorsConstruction.length] // Use the year index to get the color
      }))
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    }
  })

  // --------- GRAPH Tourism Common
  const tourismLabels = ['2021.', '2022.', '2023.']
  const colors = {
    totals: colorYellow,
    hotels: colorGreen,
    resorts: colorBlue,
    camps: colorRed
  }
  const tourismTable = document.querySelector(' #market-tourism table')

  // Define the order of the categories
  const categories = ['totals', 'hotels', 'resorts', 'camps']

  // Initialize an array to store the data for the graphs
  const tourismDataGraphs = categories.map((category, index) => ({
    id: `graphTourismCanvas0${index + 1}`,
    title: category.charAt(0).toUpperCase() + category.slice(1),
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ]
    // color: colorYellow,
    // colorSecondary: colorYellowSecondary
  }))

  // Initialize a variable to store the current year
  let currentYear = ''
  // Loop through each row in the table
  for (let i = 1; i < tourismTable.rows.length; i++) {
    const row = tourismTable.rows[i]

    // if row.cells[0].textContent is a year, update the current year
    if (row.cells[0].textContent.trim().match(/\d{4}/)) {
      currentYear = row.cells[0].textContent.trim()
      let value = parseInt(row.cells[1].textContent.replace(/,/g, ''), 10)
      tourismDataGraphs
        .find((graph) => graph.title.toLowerCase() === 'totals')
        .datasets[0].data.push(value)
      tourismDataGraphs
        .find((graph) => graph.title.toLowerCase() === 'totals')
        .datasets[0].backgroundColor.push(colors.totals)
      // push currentYear to labels
      tourismDataGraphs.forEach((graph) => graph.labels.push(currentYear))
    }

    if (row.cells[0].textContent.trim().toLowerCase() === 'hotels') {
      let value = parseInt(row.cells[1].textContent.replace(/,/g, ''), 10)
      tourismDataGraphs
        .find((graph) => graph.title.toLowerCase() === 'hotels')
        .datasets[0].data.push(value)
      tourismDataGraphs
        .find((graph) => graph.title.toLowerCase() === 'hotels')
        .datasets[0].backgroundColor.push(colors.hotels)
    }
    if (row.cells[0].textContent.trim().toLowerCase() === 'resorts') {
      let value = parseInt(row.cells[1].textContent.replace(/,/g, ''), 10)
      tourismDataGraphs
        .find((graph) => graph.title.toLowerCase() === 'resorts')
        .datasets[0].data.push(value)
      tourismDataGraphs
        .find((graph) => graph.title.toLowerCase() === 'resorts')
        .datasets[0].backgroundColor.push(colors.resorts)
    }
    if (row.cells[0].textContent.trim().toLowerCase() === 'camps') {
      let value = parseInt(row.cells[1].textContent.replace(/,/g, ''), 10)
      tourismDataGraphs
        .find((graph) => graph.title.toLowerCase() === 'camps')
        .datasets[0].data.push(value)
      tourismDataGraphs
        .find((graph) => graph.title.toLowerCase() === 'camps')
        .datasets[0].backgroundColor.push(colors.camps)
    }
  }

  // --------- GRAPH Tourism 01
  const graphWrapTourism01 = document.getElementById('graph-wrap-tourism-01')
  const graphTourismCanvas01 = graphWrapTourism01.appendChild(
    document.createElement('canvas')
  )
  graphTourismCanvas01.id = 'graphTourismCanvas01'
  graphTourismCanvas01.width = '100%'
  graphTourismCanvas01.height = 400
  const ctxGraphTourism01 = document
    .getElementById('graphTourismCanvas01')
    .getContext('2d')
  // --------- GRAPH Tourism 02
  const graphWrapTourism02 = document.getElementById('graph-wrap-tourism-02')
  const graphTourismCanvas02 = graphWrapTourism02.appendChild(
    document.createElement('canvas')
  )
  graphTourismCanvas02.id = 'graphTourismCanvas02'
  graphTourismCanvas02.width = '100%'
  graphTourismCanvas02.height = 400
  const ctxGraphTourism02 = document
    .getElementById('graphTourismCanvas02')
    .getContext('2d')
  // --------- GRAPH Tourism 03
  const graphWrapTourism03 = document.getElementById('graph-wrap-tourism-03')
  const graphTourismCanvas03 = graphWrapTourism03.appendChild(
    document.createElement('canvas')
  )
  graphTourismCanvas03.id = 'graphTourismCanvas03'
  graphTourismCanvas03.width = '100%'
  graphTourismCanvas03.height = 400
  const ctxGraphTourism03 = document
    .getElementById('graphTourismCanvas03')
    .getContext('2d')
  // --------- GRAPH Tourism 04
  const graphWrapTourism04 = document.getElementById('graph-wrap-tourism-04')
  const graphTourismCanvas04 = graphWrapTourism04.appendChild(
    document.createElement('canvas')
  )
  graphTourismCanvas04.id = 'graphTourismCanvas04'
  graphTourismCanvas04.width = '100%'
  graphTourismCanvas04.height = 400
  const ctxGraphTourism04 = document
    .getElementById('graphTourismCanvas04')
    .getContext('2d')

  // Tourism graphs

  tourismDataGraphs.forEach((graph) => {
    const ctx = document.getElementById(graph.id)
    new Chart(ctx, {
      type: 'bar', // or 'line', 'pie', etc.
      data: {
        labels: graph.labels,
        datasets: [
          {
            label: 'Tourist overnights',
            data: graph.datasets[0].data,
            backgroundColor: graph.datasets[0].backgroundColor,
            borderColor: graph.colorSecondary,
            borderWidth: 1
          }
        ]
      },
      plugins: [plugin],
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Tourist overnights - ' + graph.title,
            color: '#fff',
            font: {
              size: 18,
              family: "'Inter', 'Arial', sans-serif",
              weight: 'normal'
            }
          },
          legend: {
            display: false
          }
        }
      }
    })
  })

  // --------- GRAPH Interest
  let interestTable = document.querySelector('#market-interest-rate table')
  // Initialize arrays to hold the data
  let interestPeriods = []
  let interestDeposits1Year = []
  let interestDepositsOver1Year = []

  // Loop through each row in the table
  for (let i = 1; i < interestTable.rows.length; i++) {
    let row = interestTable.rows[i]

    // Add the data to the arrays
    interestPeriods.push(row.cells[0].innerText)
    interestDeposits1Year.push(parseFloat(row.cells[1].innerText))
    interestDepositsOver1Year.push(parseFloat(row.cells[2].innerText))
  }

  // Create the data structure for Chart.js
  let interestData = {
    labels: interestPeriods,
    datasets: [
      {
        label: 'Deposits - up to 1 year',
        data: interestDeposits1Year,
        fill: false,
        backgroundColor: colorYellow
      },
      {
        label: 'Deposits - from 1 to 2 years',
        data: interestDepositsOver1Year,
        fill: false,
        backgroundColor: colorGreen
      }
    ]
  }

  const graphWrapInterest = document.getElementById('graph-wrap-interest')
  const graphInterestCanvas = graphWrapInterest.appendChild(
    document.createElement('canvas')
  )
  graphInterestCanvas.id = 'graphInterestCanvas'
  graphInterestCanvas.width = '100%'
  graphInterestCanvas.height = 400
  const ctxGraphInterest = document
    .getElementById('graphInterestCanvas')
    .getContext('2d')

  const graphInterest = new Chart(ctxGraphInterest, {
    type: 'bar',
    data: interestData,
    plugins: [plugin],
    options: {
      plugins: {
        legend: {
          // display: false
          labels: {
            color: '#fff',
            font: {
              size: 14,
              family: "'Inter', 'Arial', sans-serif"
            }
          }
        }
      },
      maintainAspectRatio: true,
      responsive: true,
      interaction: {
        intersect: true
      }
    }
  })
  // --------- Investments Calculations
  const investmentsCalculations = document.getElementById(
    'investments-calculators-wrap'
  )
  let investment = 500000
  investmentsCalculations.innerHTML = `
    <div class="roi-calc-single-slider">
      <div class="slider-js-elements-wrap-home">
        <div class="sliderMinMaxLabels">
          <div class="sliderMinMaxLabelsStart">
            <p class="sliderMinMaxLabelsTitle">100.000</p>
            <p class="sliderMinMaxLabelsSubTitle">Minimum</p>
          </div>
          <div class="sliderMinMaxLabelsEnd">
            <p class="sliderMinMaxLabelsTitle">1M €</p>
            <p class="sliderMinMaxLabelsSubTitle">Maximum</p>
          </div>
        </div>
        <input
          type="range"
          min=100000
          max=1000000
          step=1000
          value=${investment}
          class="slider"
          id="sliderPrice"
        />
        <label for="sliderPrice" class="sliderLabel" id="sliderPriceLabel"
          >0</label
        >
      </div>
    </div>
  `

  let tableRows = document.querySelectorAll('#invest-calc-results tr')
  sliderPrice.addEventListener('input', () => {
    const { value, min, max, offsetWidth } = sliderPrice
    const percent = ((value - min) / (max - min)) * 100
    if (percent > 90) {
      sliderPriceLabel.style.left = '-6rem'
    } else if (percent > 50) {
      sliderPriceLabel.style.left = '-4rem'
    } else if (percent > 10) {
      sliderPriceLabel.style.left = '-2rem'
    } else {
      sliderPriceLabel.style.left = '-1rem'
    }
    const newPosition = percent * (offsetWidth / 100)
    sliderPriceLabel.style.transform = `translateX(${newPosition}px)`
    sliderPriceLabel.innerHTML =
      value + ' <span class="labelSmallText">€</span>'
    investment = value

    // Add snap effect
    let snapValues = [
      200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000
    ]
    let closest = snapValues.reduce((a, b) => {
      return Math.abs(b - investment) < Math.abs(a - investment) ? b : a
    })

    if (Math.abs(investment - closest) <= 10000) {
      sliderPrice.value = closest
      investment = closest

      // Update label position and value
      const newPercent = ((closest - min) / (max - min)) * 100
      const newPosition = newPercent * (offsetWidth / 100)
      sliderPriceLabel.style.transform = `translateX(${newPosition}px)`
      sliderPriceLabel.innerHTML =
        closest + ' <span class="labelSmallText">€</span>'
    }

    // Add snap effect - END

    tableRows.forEach((row, index) => {
      let cells = row.querySelectorAll('td:not(:first-child)')
      let cellValue = Number(investment)
      cells.forEach((cell, cellIndex) => {
        if (index === 1) {
          // Perform operation for first row
          cellValue = Math.round(
            investment - (investment * inflation[cellIndex]) / 100
          )

          cell.textContent = '€' + cellValue.toLocaleString()
        } else if (index === 2) {
          // Perform operation for second row
          cellValue = Math.round(
            Number(investment) +
              (Number(investment) * Number(inflation[cellIndex])) / 100 +
              (Number(investment) * Number(realEstatePricesGrow[cellIndex])) /
                100
          )
          cell.textContent = '€' + cellValue.toLocaleString()
        } else if (index === 3) {
          // Perform operation for third row
          let currentYear = 2024 + cellIndex // calculate the year

          if (roiData[currentYear.toString()]) {
            // if there is data for this year
            for (let month = 1; month <= 12; month++) {
              // calculate ROI for each month
              cellValue *= roiData[currentYear.toString()][month.toString()]
            }
          }

          cellValue = Math.round(cellValue)
          cell.textContent = '€' + cellValue.toLocaleString()
        }
      })
    })
  })
  sliderPrice.dispatchEvent(new Event('input', { bubbles: true }))

  // --------- GRAPH Interest - LOANS
  let interestLoansTable = document.querySelector(
    '#market-interest-rate-loans table'
  )
  // Initialize arrays to hold the data
  let interestLoansPeriods = []
  let interestLoansDeposits1Year = []
  let interestLoansDepositsOver1Year = []

  // Loop through each row in the table
  for (let i = 1; i < interestLoansTable.rows.length; i++) {
    let row = interestLoansTable.rows[i]

    // Add the data to the arrays
    interestLoansPeriods.push(row.cells[0].innerText)
    interestLoansDeposits1Year.push(parseFloat(row.cells[1].innerText))
    interestLoansDepositsOver1Year.push(parseFloat(row.cells[2].innerText))
  }

  // Create the data structure for Chart.js
  let interestLoansData = {
    labels: interestLoansPeriods,
    datasets: [
      {
        label: 'Loans - Fixed Interest Rate',
        data: interestLoansDeposits1Year,
        fill: false,
        backgroundColor: colorYellow
      },
      {
        label: 'Loans - Variable Interest Rates',
        data: interestLoansDepositsOver1Year,
        fill: false,
        backgroundColor: colorGreen
      }
    ]
  }

  const graphWrapInterestLoans = document.getElementById(
    'graph-wrap-interest-loans'
  )
  const graphInterestLoansCanvas = graphWrapInterestLoans.appendChild(
    document.createElement('canvas')
  )
  graphInterestLoansCanvas.id = 'graphInterestLoansCanvas'
  graphInterestLoansCanvas.width = '100%'
  graphInterestLoansCanvas.height = 400
  const ctxGraphInterestLoans = document
    .getElementById('graphInterestLoansCanvas')
    .getContext('2d')

  const graphInterestLoans = new Chart(ctxGraphInterestLoans, {
    type: 'bar',
    data: interestLoansData,
    plugins: [plugin],
    options: {
      plugins: {
        legend: {
          // display: false
          labels: {
            color: '#fff',
            font: {
              size: 14,
              family: "'Inter', 'Arial', sans-serif"
            }
          }
        }
      },
      maintainAspectRatio: true,
      responsive: true,
      interaction: {
        intersect: true
      }
    }
  })

