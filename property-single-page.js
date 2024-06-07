  //Check the URL

  const isBosnianSite = window.location.href.includes('/bs/');

let textMinimum = "Minimum"
let textMaximum = "Maximum"
let textStart = "Start"
let textFinish = "Finish"
let textMonths = "months"
let textIn = "in"

//Payment plan
let textDownpaymentPercentage = "Downpayment percentage:"
let textDownpaymentAmount = "Downpayment amount:"
let textRemainingAmount = "Remaining amount:"
let text3monthlyPayment = "3-monthly payment:"
let text6monthlyPayment = "6-monthly payment:"
let textLastPayment = "Last payment:"

if(isBosnianSite){
textMinimum = "Minimum"
textMaximum = "Maksimum"
textStart = "Početak"
textFinish = "Kraj"
textMonths = "mjeseci"
textIn = "za"

//Payment plan
textDownpaymentPercentage = "Procenat učešća:"
textDownpaymentAmount = "Iznos učešća:"
textRemainingAmount = "Preostali iznos:"
text3monthlyPayment = "Tromjesečna rata:"
text6monthlyPayment = "Polugodišnja rata:"
textLastPayment = "Zadnja rata:"
}

  
  // Payment Plan
  let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR'
  })
  // parse date from text in .data-start-date if exists
  const startDate = new Date(
    document.querySelector('.data-start-date').innerHTML
  )
  const finishDate = new Date(
    document.querySelector('.data-finish-date').innerHTML
  )

  const paymentPlanWrap = document.getElementById('property-payment-plan-wrap')

  const paymentPlan = paymentPlanWrap.appendChild(document.createElement('div'))
  paymentPlan.classList.add('property-payment-plan')
  let months
  if (finishDate && finishDate > new Date()) {
    // calculate number of months from today to finishDate
    months =
      Math.ceil(
        (finishDate.getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24 * 30)
      ) - 1
  } else {
    months = 36
  }
  calculate()

  function calculate() {
    const price = document.getElementById('main-price').textContent
    let downpaymentPercentage = document.getElementById(
      'downpayment-percentage'
    ).textContent

    if (downpaymentPercentage === undefined || downpaymentPercentage === null || downpaymentPercentage === '') {
      downpaymentPercentage = 0
    }

    const downpayment = (price * (downpaymentPercentage / 100))
      .toFixed(2)
      .toLocaleString()
    const loan = (price - downpayment).toFixed(2).toLocaleString()
    const monthlyPayment = (loan / months).toFixed(2).toLocaleString()
    const monthlyPaymentPercentage = ((monthlyPayment / price) * 100)
      .toFixed(2)
      .toLocaleString()

    let lastMonthPaymentDateStr = lastMonthOfPayment(months, 'long')

    paymentPlan.innerHTML = `
      <div class="payment-plan_items">
      <h6 class="h6-js-elements">${textDownpaymentPercentage}</h6>
      <h5 class="h5-js-elements">${downpaymentPercentage}%</h5>
      </div>
      <div class="payment-plan_items">
      <h6 class="h6-js-elements">${textDownpaymentAmount}</h6>
      <h5 class="h5-js-elements">${euro.format(downpayment)}</h5>
      </div>
      <div class="payment-plan_items">
      <h6 class="h6-js-elements">${textRemainingAmount}</h6>
      <h5 class="h5-js-elements">${euro.format(loan)}</h5>
      </div>
      <!--
      <div class="payment-plan_items">
      <h6 class="h6-js-elements">${text3monthlyPayment}</h6>
      <h5 class="h5-js-elements">${(monthlyPaymentPercentage * 3)
        .toFixed(2)
        .toLocaleString()}%</h5>
      </div>
      -->
      <div class="payment-plan_items">
      <h6 class="h6-js-elements">${text3monthlyPayment}</h6>
      <h5 class="h5-js-elements">${euro.format(monthlyPayment * 3)}</h5>
      </div>
      <!--
      <div class="payment-plan_items">
      <h6 class="h6-js-elements">${text6monthlyPayment}</h6>
      <h5 class="h5-js-elements">${(monthlyPaymentPercentage * 6)
        .toFixed(2)
        .toLocaleString()}%</h5>
      </div>
      -->
      <div class="payment-plan_items">
      <h6 class="h6-js-elements">${text6monthlyPayment}</h6>
      <h5 class="h5-js-elements">${euro.format(monthlyPayment * 6)}</h5>
      </div>
      <div class="payment-plan_items">
      <h6 class="h6-js-elements">${textLastPayment}</h6>
      <h5 class="h5-js-elements">${lastMonthPaymentDateStr}</h5>
      </div>

      `
  }

  function lastMonthOfPayment(months, length) {
    // calculate last month payment date just month and year
    const lastMonthPaymentDate = new Date()
    lastMonthPaymentDate.setMonth(
      lastMonthPaymentDate.getMonth() + parseInt(months)
    )
    return (lastMonthPaymentDateStr = lastMonthPaymentDate.toLocaleDateString(
      'en-DE',
      {
        year: 'numeric',
        month: length
      }
    ))
  }

  function lastMonthOfPaymentRange(months) {
    // create array of months and years for range starting of current month
    const lastMonthPaymentDate = new Date()
    const lastMonthPaymentDateArr = []
    for (let i = 0; i < months; i++) {
      lastMonthPaymentDate.setMonth(lastMonthPaymentDate.getMonth() + 1)
      lastMonthPaymentDateArr.push(
        lastMonthPaymentDate.toLocaleDateString('en-DE', {
          year: 'numeric',
          month: 'short'
        })
      )
    }
    return lastMonthPaymentDateArr
  }

  // ROI CALC & GRAPH
  // TODO: check if prices and roi data is present



  const roiCalcWrap = document.getElementById('roi-calc-wrap')
  const priceMin = document.getElementById('data-price-min').textContent
  const priceMax = document.getElementById('data-price-max').textContent

  let monthsForCalc = months
  let investment = document.getElementById('main-price').textContent
  let roi1year = document.getElementById('data-roi').textContent
  let roi2year = document.getElementById('data-roi-2year').textContent
  let roi3year = document.getElementById('data-roi-3year').textContent
  const roiCalcInner = roiCalcWrap.appendChild(document.createElement('div'))
  const firstMonthROI = lastMonthOfPayment(1, 'short')
  const lastMonthROI = lastMonthOfPayment(monthsForCalc, 'short')
  let monthsArray = lastMonthOfPaymentRange(monthsForCalc)

  let investmentArray = createInvestmentsArray(
    priceMin,
    monthsForCalc,
    roi1year,
    roi2year,
    roi3year
  )
  // GRAPH CONSTS
  const whyInvestGraphWrap = document.getElementById('why-invest-graph-wrap')
  const canvas = whyInvestGraphWrap.appendChild(
    document.createElement('canvas')
  )
  canvas.id = 'chart'
  canvas.width = '100%'
  canvas.height = '400px'

  const ctx = document.getElementById('chart').getContext('2d')

  var gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(1, 255, 72, 0.2)')
  gradient.addColorStop(1, 'rgba(1, 255, 72, 0.01)')

  roiCalcInner.innerHTML = `
  <div class="roi-calc-slider-wrap">
    <div class="roi-calc-single-slider">
      <div class="slider-js-elements-wrap">
        <div class="sliderMinMaxLabels">
          <div class="sliderMinMaxLabelsStart">
            <p class="sliderMinMaxLabelsTitle">${priceMin}</p>
            <p class="sliderMinMaxLabelsSubTitle">${textMinimum}</p>
          </div>
          <div class="sliderMinMaxLabelsEnd">
            <p class="sliderMinMaxLabelsTitle">1M €</p>
            <p class="sliderMinMaxLabelsSubTitle">${textMaximum}</p>
          </div>
        </div>
        <input
          type="range"
          min=${priceMin}
          max=1000000
          step=1000
          class="slider"
          id="sliderPrice"
        />
        <label for="sliderPrice" class="sliderLabel" id="sliderPriceLabel"
          >0</label
        >
      </div>
    </div>
    <div class="roi-calc-single-slider">
      <div class="slider-js-elements-wrap">
        <div class="sliderMinMaxLabels">
          <div class="sliderMinMaxLabelsStart">
            <p class="sliderMinMaxLabelsTitle">${firstMonthROI}</p>
            <p class="sliderMinMaxLabelsSubTitle">${textStart}</p>
          </div>
          <div class="sliderMinMaxLabelsEnd">
            <p class="sliderMinMaxLabelsTitle">${lastMonthROI}</p>
            <p class="sliderMinMaxLabelsSubTitle">${textFinish}</p>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max=${monthsForCalc}
          value=${monthsForCalc}
          class="slider"
          id="sliderTime"
        />
        <label for="sliderPrice" class="sliderLabel" id="sliderTimeLabel"
          >0</label
        >
      </div>
    </div>
  </div>


  `

  const sliderPrice = document.getElementById('sliderPrice')
  const sliderTime = document.getElementById('sliderTime')
  const roiCalcProfit = document.getElementById('roi-calc-profit')
  const sliderPriceLabel = document.getElementById('sliderPriceLabel')
  const sliderTimeLabel = document.getElementById('sliderTimeLabel')
  const roiCalcButtonResultSpan = document.getElementById(
    'roi-calc-button-result-span'
  )
  // ROI GRAPH

  const roiChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthsArray,
      datasets: [
        {
          // label: '6M | 1Y | 2Y | 3Y',
          data: investmentArray,
          // data: [1, 2, 3],
          borderWidth: 2,
          borderColor: ['#000'],
          borrderCapStyle: 'round',
          fill: true,
          backgroundColor: gradient,
          borderDash: [3, 5],
          pointRadius: 0, // hide points
          arrowHeads: {
            width: 10,
            length: 10,
            frequency: 'end'
          }
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  })

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

  let investmentArraySavingsVsReal = createInvestmentsArray(
    priceMin, //investment
    36, //months
    roi1year, // roi1year
    roi2year, // roi1year
    roi3year // roi1year
  )
  let savingsArray = createInvestmentsArray(
    priceMin, //investment
    36, //months
    6, // roi1year
    8, // roi1year
    10 // roi1year
  )

  labelsArrayTime = []
  for (let i = 0; i <= 36; i++) {
    labelsArrayTime.push(i + ' months')
  }

  savingsVsRealChart = new Chart(ctxSavingsVsReal, {
    type: 'line',
    data: {
      labels: labelsArrayTime,
      datasets: [
        {
          label: 'Real Estate Investment',
          data: investmentArraySavingsVsReal,
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
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value, index, values) {
              return value.toLocaleString() + ' €'
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

  sliderPrice.addEventListener('input', () => {
    let { value, min, max, offsetWidth } = sliderPrice
    let investment = value

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
      value = closest
    }

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
    sliderPriceLabel.textContent = value
    investmentArray = createInvestmentsArray(
      investment,
      monthsForCalc,
      roi1year,
      roi2year,
      roi3year
    )
    savingsArray = createInvestmentsArray(
      investment, //investment
      monthsForCalc, //months
      6, // roi1year
      8, // roi1year
      10 // roi1year
    )
    roiChart.data.datasets[0].data = investmentArray
    roiChart.update()

    // Update savingsVsRealChart data
    savingsVsRealChart.data.datasets[0].data = investmentArray
    savingsVsRealChart.data.datasets[1].data = savingsArray
    savingsVsRealChart.update()

    roiCalcProfit.textContent = calculateProfitROI(
      investment,
      monthsForCalc,
      roi1year,
      roi2year,
      roi3year
    ).toLocaleString()
  })

  sliderTime.addEventListener('input', () => {
    const { value, min, max, offsetWidth } = sliderTime
    const percent = ((value - min) / (max - min)) * 100
    if (percent > 90) {
      sliderTimeLabel.style.left = '-4rem'
    } else if (percent > 50) {
      sliderTimeLabel.style.left = '-3rem'
    } else if (percent > 10) {
      sliderTimeLabel.style.left = '-2rem'
    } else {
      sliderTimeLabel.style.left = '-0.5rem'
    }
    const newPosition = percent * (offsetWidth / 100)
    sliderTimeLabel.style.transform = `translateX(${newPosition}px)`
    sliderTimeLabel.innerHTML =
      `<span class="labelSmallText">${textMonths}: </span>` + value 
    roiCalcButtonResultSpan.textContent = `${textIn} ${textMonths}: ${value} `
    monthsForCalc = value
    monthsArray = lastMonthOfPaymentRange(value)
    roiChart.data.labels = monthsArray
    investmentArray = createInvestmentsArray(
      investment,
      monthsForCalc,
      roi1year,
      roi2year,
      roi3year
    )
    roiChart.data.datasets[0].data = investmentArray
    roiChart.data.labels = monthsArray
    roiChart.update()
    roiCalcProfit.textContent = calculateProfitROI(
      investment,
      monthsForCalc,
      roi1year,
      roi2year,
      roi3year
    ).toLocaleString()
  })
  sliderPrice.dispatchEvent(new Event('input', { bubbles: true }))
  sliderTime.dispatchEvent(new Event('input', { bubbles: true }))

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

  //  Mapbox
  mapboxgl.accessToken =
    'pk.eyJ1IjoibW1yZWFsZXN0YXRldGVjaCIsImEiOiJjbHB3bjVsZ2EwZzByMm9wYmVtZDVwb2hyIn0.d66L0eAH0VLt2CvD8stQlw'
  const pitchMap = 60
  const latitude = document.getElementById('data-latitude').textContent
  const longitude = document.getElementById('data-longitude').textContent
  const map = new mapboxgl.Map({
    container: 'property-map-wrap', // container ID
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 16, // starting zoom
    style: 'mapbox://styles/mmrealestatetech/clvdp45qa00ku01qz7wx0gymq',
    pitch: pitchMap
  })
  const marker1 = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map)

  //  Inflation Graphs

  const countryCode = document
    .querySelector('.data-country-code')
    .textContent.trim()

  let inflationURL = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.DEFL.KD.ZG?format=json`
  let inflationChart = ''

  getInflationData().then((data) => {
    renderInflationJSON(parseWorldData(data))
  })

  async function getInflationData() {
    const response = await fetch(inflationURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      // handle error
      console.error('HTTP error', response.status)
    } else {
      const apiJSON = await response.json()
      return apiJSON
    }
  }

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

  function parseWorldData(apiJSON) {
    const inflationData = apiJSON[1].filter((item) => item.value !== null)
    const inflationYears = inflationData.map((item) => item.date)
    inflationYears.reverse()
    const inflationValues = inflationData.map((item) => item.value)
    inflationValues.reverse()
    return [inflationYears, inflationValues]
  }

  async function renderInflationJSON(worldData) {
    inflationChart = new Chart(ctxInflation, {
      type: 'line',
      data: {
        labels: worldData[0],
        datasets: [
          {
            data: worldData[1],
            borderWidth: 2,
            borderColor: ['#2efd53'],
            borrderCapStyle: 'round',
            fill: true,
            backgroundColor: gradient,
            pointRadius: 4, // to hide points set to 0
            pointStyle: 'circle',
            arrowHeads: {
              width: 10,
              length: 10,
              frequency: 'end'
            }
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    })
  }

  //  Savings Graphs
  let savingsURL = `https://api.worldbank.org/v2/country/${countryCode}/indicator/FR.INR.DPST?format=json`
  let savingsChart = ''

  getSavingsData().then((data) => {
    renderSavingsJSON(parseWorldData(data))
  })

  async function getSavingsData() {
    const response = await fetch(savingsURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      // handle error
      console.error('HTTP error', response.status)
    } else {
      const apiJSON = await response.json()
      return apiJSON
    }
  }

  const savingsGraphWrap = document.getElementById('savings-wrap')
  const savingsCanvas = savingsGraphWrap.appendChild(
    document.createElement('canvas')
  )
  savingsCanvas.id = 'savings-chart'
  savingsCanvas.width = '100%'
  savingsCanvas.height = '400px'

  const ctxSavings = document.getElementById('savings-chart').getContext('2d')

  var gradient = ctxSavings.createLinearGradient(0, 0, 0, 400)

  async function renderSavingsJSON(worldData) {
    savingsChart = new Chart(ctxSavings, {
      type: 'line',
      data: {
        labels: worldData[0],
        datasets: [
          {
            data: worldData[1],
            borderWidth: 2,
            borderColor: ['#2efd53'],
            borrderCapStyle: 'round',
            fill: true,
            backgroundColor: gradient,
            pointRadius: 4, // to hide points set to 0
            pointStyle: 'circle',
            arrowHeads: {
              width: 10,
              length: 10,
              frequency: 'end'
            }
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    })
  }

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

  //  Commons

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

  //  Time counter
  const timeCounters = document.querySelectorAll('.roi-time-counter')

  // create time counter ticker in timeCounter element that count down to the end of the month
  function timeCounterTicker() {
    let now = new Date()
    let endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    let timeLeft = endOfMonth - now
    let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    let hoursLeft = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)

    timeCounters.forEach((timeCounter) => {
      timeCounter.innerHTML = `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`
    })
  }

  setInterval(timeCounterTicker, 1000)
