const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getBtn = document.querySelector("form button")

for(let i=0;i<dropList.length;i++){
    for(currency_code in country_code){
        let selected;
        if(i==0){
            selected = currency_code == "USD"? "selected" : "";
        }
        else if(i==1){
            selected = currency_code == "BDT"? "selected" : "";
        }
        
        let optionTag =`<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e=>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            console.log(code,element.value);
            if(code == "EUR")
            {
                imgTag.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1280px-Flag_of_Europe.svg.png`; 
            }
            else{
                imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
            }
        }
    }
}

let API = "dcacd3fa3c50872a98adce71";

getBtn.addEventListener("click", e=>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon")
exchangeIcon.addEventListener("click",()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});


function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    const exchangeRateResult = document.querySelector(".exchange-rate");
    let amountValue = amount.value;

    if(amountValue == "" || amountValue == "0"){
        amount.value = "1";
        amountValue = 1;
    }
    exchangeRateResult.innerText = "Calculating total amount according to today's rate...";
    let url =`https://v6.exchangerate-api.com/v6/${API}/latest/${fromCurrency.value}`;
    fetch(url).then(response=>response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountValue*exchangeRate).toFixed(2);
        console.log(totalExchangeRate);
        exchangeRateResult.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(()=>{
        exchangeRateResult.innerText = "An Unknown Error Occured!";
    });
}