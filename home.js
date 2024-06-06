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
  // start Una
  document
    .getElementById('start-una-chat')
    .addEventListener('click', function () {
      document.getElementById('chatbase-bubble-button').click()
    })

  const priceMin = 100000
  let roi1year = 50
  let roi2year = 50
  let roi3year = 50
  // Country select for Graphs
  const homeGraphsSelect = document.getElementById('home-graphs-select')
  let homeGraphsSelectedCountry = ''
  let homeGraphsRoiValue = 0
  let homeGraphsDepositValue = 0
  let homeGraphsInflationValue = ''
  let homeGraphsCountryCode = 0

  homeGraphsSelect.addEventListener('change', function () {
    homeGraphsSelectedCountry = this.value

    // Select all the country elements in the ROI list
    let countryElements = document.querySelectorAll(
      '.home-roi-calc-country-data .w-dyn-item'
    )

    // Loop through the country elements
    for (let i = 0; i < countryElements.length; i++) {
      // If the country matches the selected country
      if (
        countryElements[i].querySelector('.text-block-161').textContent ===
        homeGraphsSelectedCountry
      ) {
        // Get the corresponding ROI value
        homeGraphsRoiValue = countryElements[i].querySelector(
          '.graphs-data-country-roi'
        ).textContent
        homeGraphsDepositValue = countryElements[i].querySelector(
          '.graphs-data-country-deposit'
        ).textContent
        homeGraphsInflationValue = countryElements[i].querySelector(
          '.graphs-data-country-inflation .w-embed'
        ).innerHTML
        homeGraphsSavingsValue = countryElements[i].querySelector(
          '.graphs-data-country-deposits .w-embed'
        ).innerHTML
        // create savigsvsreal graph
        let investmentArray = createInvestmentsArray(
          100000, //investment
          36, //months
          homeGraphsRoiValue, // roi1year
          homeGraphsRoiValue, // roi1year
          homeGraphsRoiValue // roi1year
        )
        let savingsArray = createInvestmentsArray(
          100000, //investment
          36, //months
          homeGraphsDepositValue, // roi1year
          homeGraphsDepositValue, // roi1year
          homeGraphsDepositValue // roi1year
        )
        renderSavingsVsRealChart(investmentArray, savingsArray)

        // create inflation graph
        renderInflationGraph(homeGraphsInflationValue)

        // create savings graph
        renderSavingsGraph(homeGraphsSavingsValue)

        break
      }
    }
  })

  // Inflation Graphs
  const inflationGraphWrap = document.getElementById('infaltion-trends-wrap')
  const inflationCanvas = inflationGraphWrap.appendChild(
    document.createElement('canvas')
  )
  inflationCanvas.id = 'inflation-chart'
  inflationCanvas.width = '100%'
  inflationCanvas.height = '400px'

  const ctxInflation = document
    .getElementById('inflation-chart')
    .getContext('2d')

  var gradient = ctxInflation.createLinearGradient(0, 0, 0, 400)

  let inflationChart = new Chart(ctxInflation, {
    type: 'line', // or 'bar', 'pie', etc.
    data: {
      labels: [], // initialize as empty array
      datasets: [
        {
          label: 'Inflation',
          data: [], // initialize as empty array
          fill: false,
          backgroundColor: '#fff',
          borderColor: '#5AB8D5',
          color: '#fff'
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })

  function renderInflationGraph(tableData) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(tableData, 'text/html')
    const tableInflation = doc.body.firstChild
    const tableInflationRows = tableInflation.querySelectorAll('tr')
    const tableInflationLabels = []
    const tableInflationValues = []
    tableInflationRows.forEach((row, index) => {
      if (index > 0) {
        const cells = row.querySelectorAll('td')
        const year = cells[0].textContent
        const inflation = cells[1].textContent.replace('%', '') // remove the '%' sign
        tableInflationValues.push(parseFloat(inflation))
        tableInflationLabels.push(parseInt(year))
      }
    })
    inflationChart.data.labels = tableInflationLabels
    inflationChart.data.datasets[0].data = tableInflationValues
    inflationChart.update()
  }

  renderInflationGraph(
    document.querySelector('.graphs-data-country-inflation .w-embed').innerHTML
  )

  //  Savings Graphs
  const savingsGraphWrap = document.getElementById('savings-wrap')
  const savingsCanvas = savingsGraphWrap.appendChild(
    document.createElement('canvas')
  )
  savingsCanvas.id = 'savings-chart'
  savingsCanvas.width = '100%'
  savingsCanvas.height = '400px'

  const ctxSavings = document.getElementById('savings-chart').getContext('2d')

  let savingsChart = new Chart(ctxSavings, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Savings',
          data: [],
          fill: false,
          backgroundColor: '#fff',
          borderColor: '#5AB8D5',
          color: '#fff'
        }
      ]
    },
    options: {
      // plugins: {
      //   legend: {
      //     display: false
      //   }
      // },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  })

  function renderSavingsGraph(tableData) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(tableData, 'text/html')
    const tableSavings = doc.body.firstChild
    const tableSavingsRows = tableSavings.querySelectorAll('tr')
    const tableSavingsLabels = []
    const tableSavingsValues = []
    tableSavingsRows.forEach((row, index) => {
      if (index > 0) {
        const cells = row.querySelectorAll('td')
        const period = cells[0].textContent
        const deposit1Year = cells[1].textContent.replace('%', '') // remove the '%' sign
        tableSavingsValues.push(parseFloat(deposit1Year))
        tableSavingsLabels.push(period)
      }
    })
    savingsChart.data.labels = tableSavingsLabels
    savingsChart.data.datasets[0].data = tableSavingsValues
    savingsChart.update()
  }

  renderSavingsGraph(
    document.querySelector('.graphs-data-country-deposits .w-embed').innerHTML
  )

  //  Savings vs Real eastateGraphs
  const savingsVsRealEstateWrap = document.getElementById(
    'tab-saving-vs-real-graph'
  )
  const savingsVsRealCanvas = savingsVsRealEstateWrap.appendChild(
    document.createElement('canvas')
  )
  savingsVsRealCanvas.id = 'savingsVsReal-chart'
  savingsVsRealCanvas.width = '100%'
  savingsVsRealCanvas.height = '400px'

  const ctxSavingsVsReal = document
    .getElementById('savingsVsReal-chart')
    .getContext('2d')

  let savingsVsRealReal = parseInt(
    calculateProfitROI(priceMin, 36, roi1year, roi2year, roi3year)
  )
  let savingsVsRealSavings = parseInt(priceMin * 1.14)
  let savingsVsRealValues = [savingsVsRealReal, savingsVsRealSavings]
  let savingsVsRealLabels = [
    `Real estate investment - Profit: ${savingsVsRealReal.toLocaleString()}`,
    `Bank saving - Profit: ${savingsVsRealSavings.toLocaleString()}`
  ]
  let investmentArray = createInvestmentsArray(
    100000, //investment
    36, //months
    30, // roi1year
    40, // roi1year
    20 // roi1year
  )
  let savingsArray = createInvestmentsArray(
    100000, //investment
    36, //months
    6, // roi1year
    8, // roi1year
    10 // roi1year
  )

  labelsArrayTime = []
  for (let i = 0; i <= 36; i++) {
    labelsArrayTime.push(i + ' months')
  }
  let savingsVsRealChart
  async function renderSavingsVsRealChart(investmentArray, savingsArray) {
    if (savingsVsRealChart) {
      savingsVsRealChart.destroy()
    }
    savingsVsRealChart = new Chart(ctxSavingsVsReal, {
      type: 'line',
      data: {
        labels: labelsArrayTime,
        datasets: [
          {
            label: 'Real Estate Investment',
            data: investmentArray,
            fill: false,
            backgroundColor: '#fff',
            borderColor: '#9DEB8F',
            color: '#fff'
          },
          {
            label: 'Bank Savings',
            data: savingsArray,
            fill: false,
            backgroundColor: '#fff',
            borderColor: '#5AB8D5',
            color: '#fff'
          }
        ]
      },
      plugins: [plugin],
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value, index, values) {
                return value.toLocaleString() + ' €' // Dodaje € iza svake vrijednosti
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true // Skriva legendu
          }
        }
      }
    })
  }

  renderSavingsVsRealChart(investmentArray, savingsArray)

  function waitingSpinner(t) {
    if (typeof t === 'string') {
      t = document.getElementById(t)
    }
    let p = t.parentElement

    if (!p.classList.contains('dropload')) {
      let w = document.createElement('div')
      w.classList.add('dropload')
      p.insertBefore(w, t)
      w.appendChild(t)
      p = t.parentElement
    }

    p.classList.toggle('show')
    p.querySelector('select').disabled = p.classList.contains('show')
  }

  // Commons

  function calculateProfitROI(
    investment,
    months,
    roi1year,
    roi2year,
    roi3year
  ) {
    let profit = Math.round(investment)
    let currentYearMonths = new Date().getMonth() + 1 // get current month (0-11, hence +1)
    let remainingMonthsThisYear = 12 - currentYearMonths

    if (months <= remainingMonthsThisYear) {
      profit += investment * (roi1year / 100) * (months / 12)
    } else if (months <= remainingMonthsThisYear + 12) {
      let monthsNextYear = months - remainingMonthsThisYear
      profit += Math.round(
        investment * (roi1year / 100) * (remainingMonthsThisYear / 12)
      ) // profit for remaining months this year
      profit += Math.round(
        investment * (roi2year / 100) * (monthsNextYear / 12)
      ) // profit for months in next year
    } else {
      let monthsThirdYear = months - remainingMonthsThisYear - 12
      profit += Math.round(
        investment * (roi1year / 100) * (remainingMonthsThisYear / 12)
      ) // profit for remaining months this year
      profit += Math.round(investment * (roi2year / 100)) // profit for next full year
      profit += Math.round(
        investment * (roi3year / 100) * (monthsThirdYear / 12)
      ) // profit for months in third year
    }

    return Math.round(profit)
  }

  function createInvestmentsArray(
    investment,
    period,
    roi1year,
    roi2year,
    roi3year
  ) {
    let investmentArray = []
    let currentGain = investment
    for (let i = 0; i <= period; i++) {
      let currentROI
      if (i <= 12) {
        currentROI = roi1year / 12
      } else if (i <= 24) {
        currentROI = roi2year / 12
      } else {
        currentROI = roi3year / 12
      }

      let monthlyGain = parseInt(investment * (currentROI / 100))

      currentGain = parseInt(currentGain) + parseInt(monthlyGain)

      investmentArray.push(currentGain)
    }

    return investmentArray
  }

  // ROI calc home

    // Check if the URL contains '/bs'
const isBosnianSite = window.location.href.includes('/bs');

let textInvesment = "Investment";
let textMinimum = "Minimum"
let textMaximum = "Maximum"
let textNumberOfYears ="Number of years"
let textStart = "Start"
let textFinish = "Finish"
let textAnnualRoi = "Annual ROI"
let textTarget = "Target Sales Price"

if(isBosnianSite){
textInvesment = "Investicija"
textMinimum = "Minimum"
textMaximum = "Maksimum"
textNumberOfYears ="Broj godina"
textStart = "Početak"
textFinish = "Kraj"
textAnnualRoi = "Godišnji ROI"
textTarget = "Ciljana prodajna cijena"
}
    
    const homeRoiCalcJs = document.getElementById('home-roi-calc-js')
  const homeRoiCalcCountrySelect = document.getElementById(
    'select-country-roi-calc'
  )

  const priceMinRoi = 0
  const priceMaxRoi = 1000000

  let monthsForCalc = 24
  let roipercentage = 30

  const roiCalcInner = homeRoiCalcJs.appendChild(document.createElement('div'))

  roiCalcInner.innerHTML = `
  <div class="roi-calc-slider-home-wrap">
  <div class="roi-calc-single-slider">
    <p class="roi-calc-button-profit-label-home">${textInvesment}:</p>
    <div class="slider-js-elements-wrap-home">
      <label for="sliderPrice" class="sliderLabel" id="sliderPriceLabel"
        >0</label
      >
      <input
        type="range"
        min=${priceMinRoi}
        max=1000000
        step=1000
        class="slider"
        id="sliderPrice"
      />
      <div class="sliderMinMaxLabels">
        <div class="sliderMinMaxLabelsStart">
          <p class="sliderMinMaxLabelsTitle">${priceMinRoi}</p>
          <p class="sliderMinMaxLabelsSubTitle">${textMinimum}:</p>
        </div>
        <div class="sliderMinMaxLabelsEnd">
          <p class="sliderMinMaxLabelsTitle">1M €</p>
          <p class="sliderMinMaxLabelsSubTitle">${textMaximum}:</p>
        </div>
      </div>
    </div>
  </div>
  <div class="roi-calc-single-slider">
    <p class="roi-calc-button-profit-label-home">${textNumberOfYears}:</p>
    <div class="slider-js-elements-wrap-home">
      <input
        type="range"
        min="1"
        max="3"
        value="2"
        class="slider"
        id="sliderTime"
      />
      <label for="sliderPrice" class="sliderLabel" id="sliderTimeLabel"
        >0</label
      >
      <div class="sliderMinMaxLabels">
        <div class="sliderMinMaxLabelsStart">
          <p class="sliderMinMaxLabelsTitle">1Y</p>
          <p class="sliderMinMaxLabelsSubTitle">${textStart}:</p>
        </div>
        <div class="sliderMinMaxLabelsEnd">
          <p class="sliderMinMaxLabelsTitle">3Y</p>
          <p class="sliderMinMaxLabelsSubTitle">${textFinish}:</p>
        </div>
      </div>
    </div>
  </div>
  <div class="roi-calc-single-slider">
    <p class="roi-calc-button-profit-label-home">${textAnnualRoi}:</p>
    <div class="slider-js-elements-wrap-home">
      <input
        type="range"
        min="0"
        max="300"
        value="60"
        class="slider"
        id="sliderROI"
      />
      <label for="sliderROI" class="sliderLabel" id="sliderROILabel"
        >0</label
      >
      <div class="sliderMinMaxLabels">
        <div class="sliderMinMaxLabelsStart">
          <p class="sliderMinMaxLabelsTitle">0%</p>
          <p class="sliderMinMaxLabelsSubTitle">${textStart}:</p>
        </div>
        <div class="sliderMinMaxLabelsEnd">
          <p class="sliderMinMaxLabelsTitle">300%</p>
          <p class="sliderMinMaxLabelsSubTitle">${textFinish}:</p>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="roi-calc-home-results-wrap">
  <p class="roi-calc-button-profit-total-label-home">${textTarget}</p>
  <p class="roi-calc-button-result-main-home"><span>€</span><span id="roi-calc-profit"></span></p>
</div>


  
  `;


  

  const roiCalcProfit = document.getElementById('roi-calc-profit')
  const sliderPrice = document.getElementById('sliderPrice')
  const sliderTime = document.getElementById('sliderTime')
  const sliderROI = document.getElementById('sliderROI')
  const sliderPriceLabel = document.getElementById('sliderPriceLabel')
  const sliderTimeLabel = document.getElementById('sliderTimeLabel')
  const sliderROILabel = document.getElementById('sliderROILabel')
  const roiCalcButtonResultSpan = document.getElementById(
    'roi-calc-button-result-span'
  )
  let investment = 500000

  homeRoiCalcCountrySelect.addEventListener('change', function () {
    let selectedCountry = this.value

    // Select all the country elements in the ROI list
    let countryElements = document.querySelectorAll(
      '.home-roi-calc-country-data .w-dyn-item'
    )

    // Loop through the country elements
    for (let i = 0; i < countryElements.length; i++) {
      // If the country matches the selected country
      if (
        countryElements[i].querySelector('.text-block-161').textContent ===
        selectedCountry
      ) {
        // Get the corresponding ROI value
        let roiValue = countryElements[i].querySelector(
          '.roi-value-calc-data'
        ).textContent
        sliderROI.value = roiValue
        sliderROI.dispatchEvent(new Event('input', { bubbles: true }))
        break
      }
    }
  })

  // Finesweet CMS Filter config, events, and callbacks
  window.fsAttributes = window.fsAttributes || []
  window.fsAttributes.push([
    'cmsfilter',
    (filterInstances) => {
      // console.log('cmsfilter Successfully loaded!')

      // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
      const [filterInstance] = filterInstances

      // The `renderitems` event runs whenever the list renders items after filtering.
      filterInstance.listInstance.on('renderitems', (renderedItems) => {
        // console.log('renderedItems', renderedItems)
        let annularROIforCOuntry =
          document.getElementById('roi-for-country').innerText

        if (!annularROIforCOuntry) {
          annularROIforCOuntry = 60
        }

        // add value  annularROIforCOuntry to slider sliderROI and update the value
        sliderROI.value = annularROIforCOuntry
        sliderROI.dispatchEvent(new Event('input', { bubbles: true }))
      })
    }
  ])

  sliderPrice.addEventListener('input', () => {
    const { value, min, max, offsetWidth } = sliderPrice
    investment = value

    // Add snap effect
    let snapValues = [
      100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000
    ]
    let closest = snapValues.reduce((a, b) => {
      return Math.abs(b - investment) < Math.abs(a - investment) ? b : a
    })

    if (Math.abs(investment - closest) <= 10000) {
      sliderPrice.value = closest
      investment = closest
    }

    const percent = ((investment - min) / (max - min)) * 100
    if (percent > 90) {
      sliderPriceLabel.style.left = '-5rem'
    } else if (percent > 70) {
      sliderPriceLabel.style.left = '-4rem'
    } else if (percent > 10) {
      sliderPriceLabel.style.left = '-2rem'
    } else {
      sliderPriceLabel.style.left = '-1rem'
    }
    const newPosition = percent * (offsetWidth / 100)
    sliderPriceLabel.style.transform = `translateX(${newPosition}px)`
    sliderPriceLabel.innerHTML =
      investment + ' <span class="labelSmallText">€</span>'

    roiCalcProfit.textContent = calculateProfitROI(
      investment,
      monthsForCalc,
      roipercentage,
      roipercentage,
      roipercentage
    ).toLocaleString()
  })

  sliderTime.addEventListener('input', () => {
    const { value, min, max, offsetWidth } = sliderTime
    const percent = ((value - min) / (max - min)) * 100
    sliderTimeLabel.style.left = '-1.5rem'
    const newPosition = percent * (offsetWidth / 100)
    sliderTimeLabel.style.transform = `translateX(${newPosition}px)`
    sliderTimeLabel.innerHTML =
      value + ' <span class="labelSmallText">years</span>'
    monthsForCalc = value * 12
    roiCalcProfit.textContent = calculateProfitROI(
      investment,
      monthsForCalc,
      roipercentage,
      roipercentage,
      roipercentage
    ).toLocaleString()
  })
  sliderROI.addEventListener('input', () => {
    const { value, min, max, offsetWidth } = sliderROI
    const percent = ((value - min) / (max - min)) * 100
    sliderROILabel.style.left = '-20px'
    const newPosition = percent * (offsetWidth / 100)
    sliderROILabel.style.transform = `translateX(${newPosition}px)`
    sliderROILabel.innerHTML = value + ' <span class="labelSmallText">%</span>'
    roipercentage = value
    roiCalcProfit.textContent = calculateProfitROI(
      investment,
      monthsForCalc,
      roipercentage,
      roipercentage,
      roipercentage
    ).toLocaleString()
  })
  sliderPrice.dispatchEvent(new Event('input', { bubbles: true }))
  sliderTime.dispatchEvent(new Event('input', { bubbles: true }))
  sliderROI.dispatchEvent(new Event('input', { bubbles: true }))
  roiCalcProfit.textContent = calculateProfitROI(
    investment,
    monthsForCalc,
    roipercentage,
    roipercentage,
    roipercentage
  ).toLocaleString()

  document
    .getElementById('home-submit-widget')
    .addEventListener('click', function (e) {
      e.preventDefault()

      // give me value of select with id="Markets"
      let selectedMarket = document.getElementById('Market').value
      let selectedBudget = document.getElementById('Budget').value

      // is checkbox Personal-Use checked
      let personalUse = document.getElementById('Personal-Use').checked
      let investOnly = document.getElementById('Invest-Only').checked
      let rental = document.getElementById('Rental').checked

      let url = `/properties?`

      if (selectedMarket) {
        // in selectedMarket change spaces with +
        selectedMarket = selectedMarket.replace(/\s/g, '+')
        url += `countries=${selectedMarket}`
      }

      if (selectedBudget && selectedBudget !== '1.000.000-100.000.000') {
        selectedBudget = selectedBudget
          .replace(/\./g, '')
          .replace(/M/g, '000000')
        let budgetValues = selectedBudget.split('-')
        url += `&price=${budgetValues.join('%2C')}`
      }

      let purpose = []

      if (personalUse) {
        purpose.push('Personal+use')
      }

      if (investOnly) {
        purpose.push('Invest+only')
      }

      if (rental) {
        purpose.push('Rental')
      }

      if (purpose.length > 0) {
        url += `&purpose=${purpose.join('%2C')}`
      }

      // console.log(url)
      window.location.href = url
    })

  // Swiper Home Markets
  $(document).ready(function () {
    var swiperNodesMarkets = ''
    var paginationMarkets = '<div class="swiper-pagination-markets"></div>'
    var next_prev_buttonsMarkets =
      '<div class="swiper-button-prev-markets"></div><div class="swiper-button-next-markets"></div>'
    var swiperNodesMarkets = swiperNodesMarkets.concat(
      paginationMarkets,
      next_prev_buttonsMarkets
    )
    /* loop throw all swipers on the page */
    $('.swiper-home-markets').each(function (index) {
      $(this).append(swiperNodesMarkets)
    })

    const swiperBreakpoints = {
      // when window width is >= 320px
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
      // when window width is >= 480px
      478: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      // when window width is >= 640px
      900: {
        slidesPerView: 4,
        slidesPerGroup: 4
      }
    }

    const swiperHomeMarkets = new Swiper('.swiper-home-markets', {
      effect: 'slide',
      slidesPerView: 4,
      visibilityFullFit: true,
      autoResize: false,
      loop: false,
      slidesPerGroup: 4,
      spaceBetween: 20,
      pauseOnMouseEnter: true,
      navigation: {
        nextEl: '#home-markets-right',
        prevEl: '#home-markets-left'
      },
      autoplay: {
        delay: 7000
      },
      breakpoints: swiperBreakpoints
    })

    // Swiper Home ROI
    const swiperHomeRoi = new Swiper('.swiper-home-roi', {
      effect: 'slide',
      slidesPerView: 4,
      visibilityFullFit: true,
      autoResize: false,
      loop: false,
      slidesPerGroup: 4,
      spaceBetween: 20,
      pauseOnMouseEnter: true,
      navigation: {
        nextEl: '#home-high-roi-right',
        prevEl: '#home-high-roi-left'
      },
      autoplay: {
        delay: 10000
      },
      breakpoints: swiperBreakpoints
    })

    //Swiper home citizenship

    const swiperHomeCitizenship = new Swiper('.swiper-home-citizenship', {
      effect: 'slide',
      slidesPerView: 4,
      visibilityFullFit: true,
      autoResize: false,
      loop: false,
      slidesPerGroup: 4,
      spaceBetween: 20,
      pauseOnMouseEnter: true,
      navigation: {
        nextEl: '#home-citizenship-right',
        prevEl: '#home-citizenship-left'
      },
      autoplay: {
        delay: 7000
      },
      breakpoints: swiperBreakpoints
    })
  })

  // zoom on hover
  $('.div-block-665').on('mouseenter', function () {
    $(this).find('.card-bg-holder').css('transform', 'scale(1.05)')
  })
  $('.div-block-665').on('mouseleave', function () {
    $(this).find('.card-bg-holder').css('transform', 'scale(1)')
  })
  $('.link-block-4').on('mouseenter', function () {
    $(this).find('.card-bg-holder').css('transform', 'scale(1.05)')
  })
  $('.link-block-4').on('mouseleave', function () {
    $(this).find('.card-bg-holder').css('transform', 'scale(1)')
  })
  $('.rezidency-and-citizenship_card').on('mouseenter', function () {
    $(this).find('.card-bg-holder').css('transform', 'scale(1.05)')
  })
  $('.rezidency-and-citizenship_card').on('mouseleave', function () {
    $(this).find('.card-bg-holder').css('transform', 'scale(1)')
  })

