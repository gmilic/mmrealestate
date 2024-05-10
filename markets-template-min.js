const colorRed="#D45D5D",colorGreen="#76AB74",colorBlue="#5AB8D5",colorYellow="#FDFD96",colorRedSecondary="#D98E6E",colorGreenSecondary="#ACD1B7",colorBlueSecondary="#A9D7E5",colorYellowSecondary="#EBD889",nav=document.querySelector("#select-country-investment");nav.addEventListener("change",(()=>{let e=nav.value;e=e.replace(/\./g,"").toLowerCase().replace(/\s/g,"-"),window.location.href=`/markets/${e}`}));const plugin={beforeInit(e){const t=e.legend.fit;e.legend.fit=function(){t.bind(e.legend)(),this.height+=20}}},inflation=[2.99,5.68,8.19,10.2],realEstatePricesGrow=[8,7,15,21],roiJsonData=document.querySelector("#rois-calc-invest-data .w-embed").textContent,roiData=JSON.parse(roiJsonData),graphWrapInflation=document.getElementById("graph-wrap-inflation"),graphIflationCanvas=graphWrapInflation.appendChild(document.createElement("canvas"));graphIflationCanvas.id="graphIflationCanvas",graphIflationCanvas.width="100%",graphIflationCanvas.height=400;const ctxGraphIflation=document.getElementById("graphIflationCanvas").getContext("2d"),tableInflation=document.getElementById("table-inflation"),tableInflationRows=tableInflation.querySelectorAll("tr"),tableInflationLabels=[],tableInflationValues=[];tableInflationRows.forEach(((e,t)=>{if(t>0){const t=e.querySelectorAll("td"),a=t[0].textContent,r=t[1].textContent;tableInflationValues.push(parseFloat(r)),tableInflationLabels.push(parseInt(a))}}));const graphIflationChart=new Chart(ctxGraphIflation,{type:"line",data:{labels:tableInflationLabels,datasets:[{label:"",data:tableInflationValues,fill:!0,backgroundColor:["#76AB74","#ACD1B7"],color:"#fff"}]},options:{plugins:{legend:{display:!1}},indexAxis:"x",maintainAspectRatio:!1,scales:{x:{grid:{display:!0,color:"#1B3C35"},ticks:{color:"#fff",font:{size:12,family:"'Inter', 'Arial', sans-serif"}}},y:{grid:{display:!0,color:"#1B3C35"},ticks:{color:"#fff",font:{size:12,family:"'Inter', 'Arial', sans-serif",weight:"bold"}}}}}}),graphWrapImportExport=document.getElementById("graph-wrap-import-export"),graphImportExportCanvas=graphWrapImportExport.appendChild(document.createElement("canvas"));graphImportExportCanvas.id="graphImportExportCanvas",graphImportExportCanvas.width="100%",graphImportExportCanvas.height=400;const ctxGraphImportExport=document.getElementById("graphImportExportCanvas").getContext("2d"),tableImportExport=document.querySelector("#market-import-export table"),tableImportExportRows=tableImportExport.querySelectorAll("tr"),tableImportExportLabels=[],tableImportExportnValues01=[],tableImportExportnValues02=[];tableImportExportRows.forEach(((e,t)=>{if(t>0){const t=e.querySelectorAll("td"),a=t[0].textContent+" "+t[1].textContent,r=t[2].textContent,s=t[3].textContent;tableImportExportnValues01.push(parseInt(r.replace(/,/g,""))),tableImportExportnValues02.push(parseInt(s.replace(/,/g,""))),tableImportExportLabels.push(a)}}));const graphImportExportChart=new Chart(ctxGraphImportExport,{type:"line",data:{labels:tableImportExportLabels,datasets:[{label:"Import",data:tableImportExportnValues01,fill:!1,backgroundColor:"#fff",borderColor:"#76AB74",color:"#fff"},{label:"Export",data:tableImportExportnValues02,fill:!1,backgroundColor:"#fff",borderColor:"#5AB8D5",color:"#fff"}]},plugins:[plugin],options:{plugins:{legend:{labels:{color:"#fff",font:{size:14,family:"'Inter', 'Arial', sans-serif"}}}},indexAxis:"x",maintainAspectRatio:!1,scales:{x:{grid:{display:!0,color:"#1B3C35"},ticks:{color:"#fff",font:{size:12,family:"'Inter', 'Arial', sans-serif"}}},y:{grid:{display:!0,color:"#1B3C35"},ticks:{color:"#fff",font:{size:12,family:"'Inter', 'Arial', sans-serif",weight:"bold"}}}}}}),graphWrapbdp=document.getElementById("graph-wrap-bdp"),graphBDPCanvas=graphWrapbdp.appendChild(document.createElement("canvas"));graphBDPCanvas.id="graphBDPCanvas",graphBDPCanvas.width="100%",graphBDPCanvas.height=400;const ctxGraphBdp=document.getElementById("graphBDPCanvas").getContext("2d"),tableBdp=document.querySelector("#market-bdp table"),tableBdpRows=tableBdp.querySelectorAll("tr"),tableBdpLabels=[],tableBdpValues01=[],tableBdpValues02=[],tableBdpValues03=[];tableBdpRows.forEach(((e,t)=>{if(t>0){const t=e.querySelectorAll("td"),a=t[0].textContent,r=t[1].textContent,s=t[2].textContent,n=t[3].textContent;tableBdpValues01.push(parseInt(r.replace(/,/g,""))),tableBdpValues02.push(parseInt(s.replace(/,/g,""))),tableBdpValues03.push(parseInt(n.replace(/,/g,""))),tableBdpLabels.push(a)}}));const graphBdpChart=new Chart(ctxGraphBdp,{type:"line",data:{labels:tableBdpLabels,datasets:[{label:"Spending",data:tableBdpValues01,fill:!1,backgroundColor:"#fff",borderColor:"#5AB8D5",color:"#fff"},{label:"Investments",data:tableBdpValues02,fill:!1,backgroundColor:"#fff",borderColor:"#76AB74",color:"#fff"},{label:"GDP",data:tableBdpValues03,fill:!1,backgroundColor:"#fff",borderColor:colorRed,color:"#fff"}]},plugins:[plugin],options:{plugins:{legend:{labels:{color:"#fff",font:{size:14,family:"'Inter', 'Arial', sans-serif"}}}},indexAxis:"x",maintainAspectRatio:!1,scales:{x:{grid:{display:!0,color:"#1B3C35"},ticks:{color:"#fff",font:{size:12,family:"'Inter', 'Arial', sans-serif"}}},y:{grid:{display:!0,color:"#1B3C35"},ticks:{color:"#fff",font:{size:11,family:"'Inter', 'Arial', sans-serif",weight:"bold"}}}}}}),colorsConstruction=["#5AB8D5","#76AB74"];function createCanvas(e,t){const a=document.getElementById(e).appendChild(document.createElement("canvas"));return a.id=t,a.width="100%",a.height=400,document.getElementById(t).getContext("2d")}const tableConstruction=document.querySelector("#market-construction table"),rows=Array.from(tableConstruction.querySelectorAll("tr")),years=Array.from(rows[0].querySelectorAll("td")).slice(1).map((e=>e.textContent.trim())),dataRows=rows.slice(1),graphData=[];dataRows.forEach(((e,t)=>{const a=Array.from(e.querySelectorAll("td")),r=a[0].textContent.trim(),s=a.slice(1).map((e=>parseFloat(e.textContent.trim().replace(",","")))),n=r.toLowerCase().replace("price per m2 - ","");graphData.push({label:r,data:s,backgroundColor:colorsConstruction[n]})}));const ctx=createCanvas("graph-wrap-construction-01","graphConstructionCanvas01"),graph=new Chart(ctx,{type:"bar",data:{labels:graphData.map((e=>e.label)),datasets:years.map(((e,t)=>({label:e,data:graphData.map((e=>e.data[t])),backgroundColor:colorsConstruction[t%colorsConstruction.length]})))},options:{scales:{x:{beginAtZero:!0},y:{beginAtZero:!0}}}}),tourismLabels=["2021.","2022.","2023."],colors={totals:"#FDFD96",hotels:"#76AB74",resorts:"#5AB8D5",camps:colorRed},tourismTable=document.querySelector(" #market-tourism table"),categories=["totals","hotels","resorts","camps"],tourismDataGraphs=categories.map(((e,t)=>({id:`graphTourismCanvas0${t+1}`,title:e.charAt(0).toUpperCase()+e.slice(1),labels:[],datasets:[{data:[],backgroundColor:[]}]})));let currentYear="";for(let e=1;e<tourismTable.rows.length;e++){const t=tourismTable.rows[e];if(t.cells[0].textContent.trim().match(/\d{4}/)){currentYear=t.cells[0].textContent.trim();let e=parseInt(t.cells[1].textContent.replace(/,/g,""),10);tourismDataGraphs.find((e=>"totals"===e.title.toLowerCase())).datasets[0].data.push(e),tourismDataGraphs.find((e=>"totals"===e.title.toLowerCase())).datasets[0].backgroundColor.push(colors.totals),tourismDataGraphs.forEach((e=>e.labels.push(currentYear)))}if("hotels"===t.cells[0].textContent.trim().toLowerCase()){let e=parseInt(t.cells[1].textContent.replace(/,/g,""),10);tourismDataGraphs.find((e=>"hotels"===e.title.toLowerCase())).datasets[0].data.push(e),tourismDataGraphs.find((e=>"hotels"===e.title.toLowerCase())).datasets[0].backgroundColor.push(colors.hotels)}if("resorts"===t.cells[0].textContent.trim().toLowerCase()){let e=parseInt(t.cells[1].textContent.replace(/,/g,""),10);tourismDataGraphs.find((e=>"resorts"===e.title.toLowerCase())).datasets[0].data.push(e),tourismDataGraphs.find((e=>"resorts"===e.title.toLowerCase())).datasets[0].backgroundColor.push(colors.resorts)}if("camps"===t.cells[0].textContent.trim().toLowerCase()){let e=parseInt(t.cells[1].textContent.replace(/,/g,""),10);tourismDataGraphs.find((e=>"camps"===e.title.toLowerCase())).datasets[0].data.push(e),tourismDataGraphs.find((e=>"camps"===e.title.toLowerCase())).datasets[0].backgroundColor.push(colors.camps)}}const graphWrapTourism01=document.getElementById("graph-wrap-tourism-01"),graphTourismCanvas01=graphWrapTourism01.appendChild(document.createElement("canvas"));graphTourismCanvas01.id="graphTourismCanvas01",graphTourismCanvas01.width="100%",graphTourismCanvas01.height=400;const ctxGraphTourism01=document.getElementById("graphTourismCanvas01").getContext("2d"),graphWrapTourism02=document.getElementById("graph-wrap-tourism-02"),graphTourismCanvas02=graphWrapTourism02.appendChild(document.createElement("canvas"));graphTourismCanvas02.id="graphTourismCanvas02",graphTourismCanvas02.width="100%",graphTourismCanvas02.height=400;const ctxGraphTourism02=document.getElementById("graphTourismCanvas02").getContext("2d"),graphWrapTourism03=document.getElementById("graph-wrap-tourism-03"),graphTourismCanvas03=graphWrapTourism03.appendChild(document.createElement("canvas"));graphTourismCanvas03.id="graphTourismCanvas03",graphTourismCanvas03.width="100%",graphTourismCanvas03.height=400;const ctxGraphTourism03=document.getElementById("graphTourismCanvas03").getContext("2d"),graphWrapTourism04=document.getElementById("graph-wrap-tourism-04"),graphTourismCanvas04=graphWrapTourism04.appendChild(document.createElement("canvas"));graphTourismCanvas04.id="graphTourismCanvas04",graphTourismCanvas04.width="100%",graphTourismCanvas04.height=400;const ctxGraphTourism04=document.getElementById("graphTourismCanvas04").getContext("2d");tourismDataGraphs.forEach((e=>{const t=document.getElementById(e.id);new Chart(t,{type:"bar",data:{labels:e.labels,datasets:[{label:"Tourist overnights",data:e.datasets[0].data,backgroundColor:e.datasets[0].backgroundColor,borderColor:e.colorSecondary,borderWidth:1}]},plugins:[plugin],options:{plugins:{title:{display:!0,text:"Tourist overnights - "+e.title,color:"#fff",font:{size:18,family:"'Inter', 'Arial', sans-serif",weight:"normal"}},legend:{display:!1}}}})}));let interestTable=document.querySelector("#market-interest-rate table"),interestPeriods=[],interestDeposits1Year=[],interestDepositsOver1Year=[];for(let e=1;e<interestTable.rows.length;e++){let t=interestTable.rows[e];interestPeriods.push(t.cells[0].innerText),interestDeposits1Year.push(parseFloat(t.cells[1].innerText)),interestDepositsOver1Year.push(parseFloat(t.cells[2].innerText))}let interestData={labels:interestPeriods,datasets:[{label:"Deposits - up to 1 year",data:interestDeposits1Year,fill:!1,backgroundColor:"#FDFD96"},{label:"Deposits - from 1 to 2 years",data:interestDepositsOver1Year,fill:!1,backgroundColor:"#76AB74"}]};const graphWrapInterest=document.getElementById("graph-wrap-interest"),graphInterestCanvas=graphWrapInterest.appendChild(document.createElement("canvas"));graphInterestCanvas.id="graphInterestCanvas",graphInterestCanvas.width="100%",graphInterestCanvas.height=400;const ctxGraphInterest=document.getElementById("graphInterestCanvas").getContext("2d"),graphInterest=new Chart(ctxGraphInterest,{type:"bar",data:interestData,plugins:[plugin],options:{plugins:{legend:{labels:{color:"#fff",font:{size:14,family:"'Inter', 'Arial', sans-serif"}}}},maintainAspectRatio:!0,responsive:!0,interaction:{intersect:!0}}}),investmentsCalculations=document.getElementById("investments-calculators-wrap");let investment=5e5;investmentsCalculations.innerHTML=`\n    <div class="roi-calc-single-slider">\n      <div class="slider-js-elements-wrap-home">\n        <div class="sliderMinMaxLabels">\n          <div class="sliderMinMaxLabelsStart">\n            <p class="sliderMinMaxLabelsTitle">100.000</p>\n            <p class="sliderMinMaxLabelsSubTitle">Minimum</p>\n          </div>\n          <div class="sliderMinMaxLabelsEnd">\n            <p class="sliderMinMaxLabelsTitle">1M €</p>\n            <p class="sliderMinMaxLabelsSubTitle">Maximum</p>\n          </div>\n        </div>\n        <input\n          type="range"\n          min=100000\n          max=1000000\n          step=1000\n          value=${investment}\n          class="slider"\n          id="sliderPrice"\n        />\n        <label for="sliderPrice" class="sliderLabel" id="sliderPriceLabel"\n          >0</label\n        >\n      </div>\n    </div>\n  `;let tableRows=document.querySelectorAll("#invest-calc-results tr");sliderPrice.addEventListener("input",(()=>{const{value:e,min:t,max:a,offsetWidth:r}=sliderPrice,s=(e-t)/(a-t)*100;sliderPriceLabel.style.left=s>90?"-6rem":s>50?"-4rem":s>10?"-2rem":"-1rem";const n=s*(r/100);sliderPriceLabel.style.transform=`translateX(${n}px)`,sliderPriceLabel.innerHTML=e+' <span class="labelSmallText">€</span>',investment=e;let o=[2e5,3e5,4e5,5e5,6e5,7e5,8e5,9e5,1e6].reduce(((e,t)=>Math.abs(t-investment)<Math.abs(e-investment)?t:e));if(Math.abs(investment-o)<=1e4){sliderPrice.value=o,investment=o;const e=(o-t)/(a-t)*100*(r/100);sliderPriceLabel.style.transform=`translateX(${e}px)`,sliderPriceLabel.innerHTML=o+' <span class="labelSmallText">€</span>'}tableRows.forEach(((e,t)=>{let a=e.querySelectorAll("td:not(:first-child)"),r=Number(investment);a.forEach(((e,a)=>{if(1===t)r=Math.round(investment-investment*inflation[a]/100),e.textContent="€"+r.toLocaleString();else if(2===t)r=Math.round(Number(investment)+Number(investment)*Number(inflation[a])/100+Number(investment)*Number(realEstatePricesGrow[a])/100),e.textContent="€"+r.toLocaleString();else if(3===t){let t=2024+a;if(roiData[t.toString()])for(let e=1;e<=12;e++)r*=roiData[t.toString()][e.toString()];r=Math.round(r),e.textContent="€"+r.toLocaleString()}}))}))})),sliderPrice.dispatchEvent(new Event("input",{bubbles:!0}));let interestLoansTable=document.querySelector("#market-interest-rate-loans table"),interestLoansPeriods=[],interestLoansDeposits1Year=[],interestLoansDepositsOver1Year=[];for(let e=1;e<interestLoansTable.rows.length;e++){let t=interestLoansTable.rows[e];interestLoansPeriods.push(t.cells[0].innerText),interestLoansDeposits1Year.push(parseFloat(t.cells[1].innerText)),interestLoansDepositsOver1Year.push(parseFloat(t.cells[2].innerText))}let interestLoansData={labels:interestLoansPeriods,datasets:[{label:"Loans - Fixed Interest Rate",data:interestLoansDeposits1Year,fill:!1,backgroundColor:"#FDFD96"},{label:"Loans - Variable Interest Rates",data:interestLoansDepositsOver1Year,fill:!1,backgroundColor:"#76AB74"}]};const graphWrapInterestLoans=document.getElementById("graph-wrap-interest-loans"),graphInterestLoansCanvas=graphWrapInterestLoans.appendChild(document.createElement("canvas"));graphInterestLoansCanvas.id="graphInterestLoansCanvas",graphInterestLoansCanvas.width="100%",graphInterestLoansCanvas.height=400;const ctxGraphInterestLoans=document.getElementById("graphInterestLoansCanvas").getContext("2d"),graphInterestLoans=new Chart(ctxGraphInterestLoans,{type:"bar",data:interestLoansData,plugins:[plugin],options:{plugins:{legend:{labels:{color:"#fff",font:{size:14,family:"'Inter', 'Arial', sans-serif"}}}},maintainAspectRatio:!0,responsive:!0,interaction:{intersect:!0}}});