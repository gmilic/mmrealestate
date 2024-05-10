const plugin={beforeInit(e){const t=e.legend.fit;e.legend.fit=function(){t.bind(e.legend)(),this.height+=20}}};document.getElementById("start-una-chat").addEventListener("click",(function(){document.getElementById("chatbase-bubble-button").click()}));const priceMin=1e5;let roi1year=50,roi2year=50,roi3year=50;const homeGraphsSelect=document.getElementById("home-graphs-select");let homeGraphsSelectedCountry="",homeGraphsRoiValue=0,homeGraphsDepositValue=0,homeGraphsInflationValue="",homeGraphsCountryCode=0;homeGraphsSelect.addEventListener("change",(function(){homeGraphsSelectedCountry=this.value;let e=document.querySelectorAll(".home-roi-calc-country-data .w-dyn-item");for(let t=0;t<e.length;t++)if(e[t].querySelector(".text-block-161").textContent===homeGraphsSelectedCountry){homeGraphsRoiValue=e[t].querySelector(".graphs-data-country-roi").textContent,homeGraphsDepositValue=e[t].querySelector(".graphs-data-country-deposit").textContent,homeGraphsInflationValue=e[t].querySelector(".graphs-data-country-inflation .w-embed").innerHTML,homeGraphsSavingsValue=e[t].querySelector(".graphs-data-country-deposits .w-embed").innerHTML,renderSavingsVsRealChart(createInvestmentsArray(1e5,36,homeGraphsRoiValue,homeGraphsRoiValue,homeGraphsRoiValue),createInvestmentsArray(1e5,36,homeGraphsDepositValue,homeGraphsDepositValue,homeGraphsDepositValue)),renderInflationGraph(homeGraphsInflationValue),renderSavingsGraph(homeGraphsSavingsValue);break}}));const inflationGraphWrap=document.getElementById("infaltion-trends-wrap"),inflationCanvas=inflationGraphWrap.appendChild(document.createElement("canvas"));inflationCanvas.id="inflation-chart",inflationCanvas.width="100%",inflationCanvas.height="400px";const ctxInflation=document.getElementById("inflation-chart").getContext("2d");var gradient=ctxInflation.createLinearGradient(0,0,0,400);let inflationChart=new Chart(ctxInflation,{type:"line",data:{labels:[],datasets:[{label:"Inflation",data:[],fill:!1,backgroundColor:"#fff",borderColor:"#5AB8D5",color:"#fff"}]},options:{scales:{y:{beginAtZero:!0}}}});function renderInflationGraph(e){const t=(new DOMParser).parseFromString(e,"text/html").body.firstChild.querySelectorAll("tr"),n=[],a=[];t.forEach(((e,t)=>{if(t>0){const t=e.querySelectorAll("td"),s=t[0].textContent,i=t[1].textContent.replace("%","");a.push(parseFloat(i)),n.push(parseInt(s))}})),inflationChart.data.labels=n,inflationChart.data.datasets[0].data=a,inflationChart.update()}renderInflationGraph(document.querySelector(".graphs-data-country-inflation .w-embed").innerHTML);const savingsGraphWrap=document.getElementById("savings-wrap"),savingsCanvas=savingsGraphWrap.appendChild(document.createElement("canvas"));savingsCanvas.id="savings-chart",savingsCanvas.width="100%",savingsCanvas.height="400px";const ctxSavings=document.getElementById("savings-chart").getContext("2d");let savingsChart=new Chart(ctxSavings,{type:"line",data:{labels:[],datasets:[{label:"Savings",data:[],fill:!1,backgroundColor:"#fff",borderColor:"#5AB8D5",color:"#fff"}]},options:{scales:{y:{beginAtZero:!1}}}});function renderSavingsGraph(e){const t=(new DOMParser).parseFromString(e,"text/html").body.firstChild.querySelectorAll("tr"),n=[],a=[];t.forEach(((e,t)=>{if(t>0){const t=e.querySelectorAll("td"),s=t[0].textContent,i=t[1].textContent.replace("%","");a.push(parseFloat(i)),n.push(s)}})),savingsChart.data.labels=n,savingsChart.data.datasets[0].data=a,savingsChart.update()}renderSavingsGraph(document.querySelector(".graphs-data-country-deposits .w-embed").innerHTML);const savingsVsRealEstateWrap=document.getElementById("tab-saving-vs-real-graph"),savingsVsRealCanvas=savingsVsRealEstateWrap.appendChild(document.createElement("canvas"));savingsVsRealCanvas.id="savingsVsReal-chart",savingsVsRealCanvas.width="100%",savingsVsRealCanvas.height="400px";const ctxSavingsVsReal=document.getElementById("savingsVsReal-chart").getContext("2d");let savingsVsRealChart,savingsVsRealReal=parseInt(calculateProfitROI(1e5,36,roi1year,roi2year,roi3year)),savingsVsRealSavings=parseInt(1e5*1.14),savingsVsRealValues=[savingsVsRealReal,savingsVsRealSavings],savingsVsRealLabels=[`Real estate investment - Profit: ${savingsVsRealReal.toLocaleString()}`,`Bank saving - Profit: ${savingsVsRealSavings.toLocaleString()}`],investmentArray=createInvestmentsArray(1e5,36,30,40,20),savingsArray=createInvestmentsArray(1e5,36,6,8,10);labelsArrayTime=[];for(let e=0;e<=36;e++)labelsArrayTime.push(e+" months");async function renderSavingsVsRealChart(e,t){savingsVsRealChart&&savingsVsRealChart.destroy(),savingsVsRealChart=new Chart(ctxSavingsVsReal,{type:"line",data:{labels:labelsArrayTime,datasets:[{label:"Real Estate Investment",data:e,fill:!1,backgroundColor:"#fff",borderColor:"#9DEB8F",color:"#fff"},{label:"Bank Savings",data:t,fill:!1,backgroundColor:"#fff",borderColor:"#5AB8D5",color:"#fff"}]},plugins:[plugin],options:{responsive:!0,scales:{y:{beginAtZero:!1,ticks:{callback:function(e,t,n){return e.toLocaleString()+" €"}}}},plugins:{legend:{display:!0}}}})}function waitingSpinner(e){"string"==typeof e&&(e=document.getElementById(e));let t=e.parentElement;if(!t.classList.contains("dropload")){let n=document.createElement("div");n.classList.add("dropload"),t.insertBefore(n,e),n.appendChild(e),t=e.parentElement}t.classList.toggle("show"),t.querySelector("select").disabled=t.classList.contains("show")}function calculateProfitROI(e,t,n,a,s){let i=Math.round(e),l=12-((new Date).getMonth()+1);if(t<=l)i+=e*(n/100)*(t/12);else if(t<=l+12){let s=t-l;i+=Math.round(e*(n/100)*(l/12)),i+=Math.round(e*(a/100)*(s/12))}else{let r=t-l-12;i+=Math.round(e*(n/100)*(l/12)),i+=Math.round(e*(a/100)),i+=Math.round(e*(s/100)*(r/12))}return Math.round(i)}function createInvestmentsArray(e,t,n,a,s){let i=[],l=e;for(let r=0;r<=t;r++){let t;t=r<=12?n/12:r<=24?a/12:s/12;let o=parseInt(e*(t/100));l=parseInt(l)+parseInt(o),i.push(l)}return i}renderSavingsVsRealChart(investmentArray,savingsArray);const homeRoiCalcJs=document.getElementById("home-roi-calc-js"),homeRoiCalcCountrySelect=document.getElementById("select-country-roi-calc"),priceMinRoi=0,priceMaxRoi=1e6;let monthsForCalc=24,roipercentage=30;const roiCalcInner=homeRoiCalcJs.appendChild(document.createElement("div"));roiCalcInner.innerHTML='\n  <div class="roi-calc-slider-home-wrap">\n    <div class="roi-calc-single-slider">\n      <p class="roi-calc-button-profit-label-home">Investment:</p>\n      <div class="slider-js-elements-wrap-home">\n        <label for="sliderPrice" class="sliderLabel" id="sliderPriceLabel"\n          >0</label\n        >\n        <input\n          type="range"\n          min=0\n          max=1000000\n          step=1000\n          class="slider"\n          id="sliderPrice"\n        />\n        <div class="sliderMinMaxLabels">\n          <div class="sliderMinMaxLabelsStart">\n            <p class="sliderMinMaxLabelsTitle">0</p>\n            <p class="sliderMinMaxLabelsSubTitle">Minimum</p>\n          </div>\n          <div class="sliderMinMaxLabelsEnd">\n            <p class="sliderMinMaxLabelsTitle">1M €</p>\n            <p class="sliderMinMaxLabelsSubTitle">Maximum</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="roi-calc-single-slider">\n      <p class="roi-calc-button-profit-label-home">Number of Years:</p>\n      <div class="slider-js-elements-wrap-home">\n        <input\n          type="range"\n          min="1"\n          max="3"\n          value="2"\n          class="slider"\n          id="sliderTime"\n        />\n        <label for="sliderPrice" class="sliderLabel" id="sliderTimeLabel"\n          >0</label\n        >\n        <div class="sliderMinMaxLabels">\n          <div class="sliderMinMaxLabelsStart">\n            <p class="sliderMinMaxLabelsTitle">1Y</p>\n            <p class="sliderMinMaxLabelsSubTitle">Start</p>\n          </div>\n          <div class="sliderMinMaxLabelsEnd">\n            <p class="sliderMinMaxLabelsTitle">3Y</p>\n            <p class="sliderMinMaxLabelsSubTitle">Finish</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="roi-calc-single-slider">\n      <p class="roi-calc-button-profit-label-home">Annual ROI:</p>\n      <div class="slider-js-elements-wrap-home">\n        <input\n          type="range"\n          min="0"\n          max="300"\n          value="60"\n          class="slider"\n          id="sliderROI"\n        />\n        <label for="sliderROI" class="sliderLabel" id="sliderROILabel"\n          >0</label\n        >\n        <div class="sliderMinMaxLabels">\n          <div class="sliderMinMaxLabelsStart">\n            <p class="sliderMinMaxLabelsTitle">0%</p>\n            <p class="sliderMinMaxLabelsSubTitle">Start</p>\n          </div>\n          <div class="sliderMinMaxLabelsEnd">\n            <p class="sliderMinMaxLabelsTitle">300%</p>\n            <p class="sliderMinMaxLabelsSubTitle">Finish</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="roi-calc-home-results-wrap">\n    <p class="roi-calc-button-profit-total-label-home">Target Sales Price:</p>\n    <p class="roi-calc-button-result-main-home"><span>€</span><span id="roi-calc-profit"></span></p>\n  </div>\n\n\n  ';const roiCalcProfit=document.getElementById("roi-calc-profit"),sliderPrice=document.getElementById("sliderPrice"),sliderTime=document.getElementById("sliderTime"),sliderROI=document.getElementById("sliderROI"),sliderPriceLabel=document.getElementById("sliderPriceLabel"),sliderTimeLabel=document.getElementById("sliderTimeLabel"),sliderROILabel=document.getElementById("sliderROILabel"),roiCalcButtonResultSpan=document.getElementById("roi-calc-button-result-span");let investment=5e5;homeRoiCalcCountrySelect.addEventListener("change",(function(){let e=this.value,t=document.querySelectorAll(".home-roi-calc-country-data .w-dyn-item");for(let n=0;n<t.length;n++)if(t[n].querySelector(".text-block-161").textContent===e){let e=t[n].querySelector(".roi-value-calc-data").textContent;sliderROI.value=e,sliderROI.dispatchEvent(new Event("input",{bubbles:!0}));break}})),window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsfilter",e=>{const[t]=e;t.listInstance.on("renderitems",(e=>{let t=document.getElementById("roi-for-country").innerText;t||(t=60),sliderROI.value=t,sliderROI.dispatchEvent(new Event("input",{bubbles:!0}))}))}]),sliderPrice.addEventListener("input",(()=>{const{value:e,min:t,max:n,offsetWidth:a}=sliderPrice;investment=e;let s=[1e5,2e5,3e5,4e5,5e5,6e5,7e5,8e5,9e5].reduce(((e,t)=>Math.abs(t-investment)<Math.abs(e-investment)?t:e));Math.abs(investment-s)<=1e4&&(sliderPrice.value=s,investment=s);const i=(investment-t)/(n-t)*100;sliderPriceLabel.style.left=i>90?"-5rem":i>70?"-4rem":i>10?"-2rem":"-1rem";const l=i*(a/100);sliderPriceLabel.style.transform=`translateX(${l}px)`,sliderPriceLabel.innerHTML=investment+' <span class="labelSmallText">€</span>',roiCalcProfit.textContent=calculateProfitROI(investment,monthsForCalc,roipercentage,roipercentage,roipercentage).toLocaleString()})),sliderTime.addEventListener("input",(()=>{const{value:e,min:t,max:n,offsetWidth:a}=sliderTime,s=(e-t)/(n-t)*100;sliderTimeLabel.style.left="-1.5rem";const i=s*(a/100);sliderTimeLabel.style.transform=`translateX(${i}px)`,sliderTimeLabel.innerHTML=e+' <span class="labelSmallText">years</span>',monthsForCalc=12*e,roiCalcProfit.textContent=calculateProfitROI(investment,monthsForCalc,roipercentage,roipercentage,roipercentage).toLocaleString()})),sliderROI.addEventListener("input",(()=>{const{value:e,min:t,max:n,offsetWidth:a}=sliderROI,s=(e-t)/(n-t)*100;sliderROILabel.style.left="-20px";const i=s*(a/100);sliderROILabel.style.transform=`translateX(${i}px)`,sliderROILabel.innerHTML=e+' <span class="labelSmallText">%</span>',roipercentage=e,roiCalcProfit.textContent=calculateProfitROI(investment,monthsForCalc,roipercentage,roipercentage,roipercentage).toLocaleString()})),sliderPrice.dispatchEvent(new Event("input",{bubbles:!0})),sliderTime.dispatchEvent(new Event("input",{bubbles:!0})),sliderROI.dispatchEvent(new Event("input",{bubbles:!0})),roiCalcProfit.textContent=calculateProfitROI(investment,monthsForCalc,roipercentage,roipercentage,roipercentage).toLocaleString(),document.getElementById("home-submit-widget").addEventListener("click",(function(e){e.preventDefault();let t=document.getElementById("Market").value,n=document.getElementById("Budget").value,a=document.getElementById("Personal-Use").checked,s=document.getElementById("Invest-Only").checked,i=document.getElementById("Rental").checked,l="/properties?";if(t&&(t=t.replace(/\s/g,"+"),l+=`countries=${t}`),n&&"1.000.000-100.000.000"!==n){n=n.replace(/\./g,"").replace(/M/g,"000000"),l+=`&price=${n.split("-").join("%2C")}`}let r=[];a&&r.push("Personal+use"),s&&r.push("Invest+only"),i&&r.push("Rental"),r.length>0&&(l+=`&purpose=${r.join("%2C")}`),window.location.href=l})),$(document).ready((function(){var e=(e="").concat('<div class="swiper-pagination-markets"></div>','<div class="swiper-button-prev-markets"></div><div class="swiper-button-next-markets"></div>');$(".swiper-home-markets").each((function(t){$(this).append(e)}));const t={0:{slidesPerView:1,slidesPerGroup:1},478:{slidesPerView:2,slidesPerGroup:2},900:{slidesPerView:4,slidesPerGroup:4}};new Swiper(".swiper-home-markets",{effect:"slide",slidesPerView:4,visibilityFullFit:!0,autoResize:!1,loop:!1,slidesPerGroup:4,spaceBetween:20,pauseOnMouseEnter:!0,navigation:{nextEl:"#home-markets-right",prevEl:"#home-markets-left"},autoplay:{delay:7e3},breakpoints:t}),new Swiper(".swiper-home-roi",{effect:"slide",slidesPerView:4,visibilityFullFit:!0,autoResize:!1,loop:!1,slidesPerGroup:4,spaceBetween:20,pauseOnMouseEnter:!0,navigation:{nextEl:"#home-high-roi-right",prevEl:"#home-high-roi-left"},autoplay:{delay:1e4},breakpoints:t}),new Swiper(".swiper-home-citizenship",{effect:"slide",slidesPerView:4,visibilityFullFit:!0,autoResize:!1,loop:!1,slidesPerGroup:4,spaceBetween:20,pauseOnMouseEnter:!0,navigation:{nextEl:"#home-citizenship-right",prevEl:"#home-citizenship-left"},autoplay:{delay:7e3},breakpoints:t})})),$(".div-block-665").on("mouseenter",(function(){$(this).find(".card-bg-holder").css("transform","scale(1.05)")})),$(".div-block-665").on("mouseleave",(function(){$(this).find(".card-bg-holder").css("transform","scale(1)")})),$(".link-block-4").on("mouseenter",(function(){$(this).find(".card-bg-holder").css("transform","scale(1.05)")})),$(".link-block-4").on("mouseleave",(function(){$(this).find(".card-bg-holder").css("transform","scale(1)")})),$(".rezidency-and-citizenship_card").on("mouseenter",(function(){$(this).find(".card-bg-holder").css("transform","scale(1.05)")})),$(".rezidency-and-citizenship_card").on("mouseleave",(function(){$(this).find(".card-bg-holder").css("transform","scale(1)")}));