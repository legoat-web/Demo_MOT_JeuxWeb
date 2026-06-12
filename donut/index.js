let count_click = 0;
let add_click = 1;
let price_double = 1;
let price_triple = 1;
let price_rebirth = 1;


const double = 2;
const triple = 3;


const donut = document.querySelector("#donut");
const number_text = document.querySelector("#number_text");
const double_click = document.querySelector("#double_click");
const triple_click = document.querySelector("#triple_click");
const rebirth = document.querySelector("#rebirth");

const price_x2 = document.querySelector("#price_x2");
const price_x3 = document.querySelector("#price_x3");

count_click = parseInt(localStorage.getItem("score")) || 0;
number_text.textContent = formatNumber(count_click);
count_click = Number(count_click);


function formatNumber(n){
    const units = [
        { value: 1e63, symbol: "Dcd" },
        { value: 1e60, symbol: "Dc" },
        { value: 1e57, symbol: "Nnd" },
        { value: 1e54, symbol: "Nn" },
        { value: 1e51, symbol: "Ocd" },
        { value: 1e48, symbol: "Oc" },
        { value: 1e45, symbol: "Spd" },
        { value: 1e42, symbol: "Sp" },
        { value: 1e39, symbol: "Sxd" },
        { value: 1e36, symbol: "Sx" },
        { value: 1e33, symbol: "Qird" },
        { value: 1e30, symbol: "Qi" },
        { value: 1e27, symbol: "Qdrd" },
        { value: 1e24, symbol: "Qd" },
        { value: 1e21, symbol: "Trd" },
        { value: 1e18, symbol: "T" },
        { value: 1e15, symbol: "Brd" },
        { value: 1e12, symbol: "T" },
        { value: 1e9, symbol: "B" },
        { value: 1e6, symbol: "M" },
        { value: 1e3, symbol: "K" }
    ];

    for(let i = 0; i < units.length; i++){
        if(n >= units[i].value){
            return (n / units[i].value).toFixed(1).replace(".0", "") + units[i].symbol
        }
    }
    return n.toString();
}





donut.addEventListener("click", () => {
    count_click += add_click;

    number_text.textContent = formatNumber(count_click);

    localStorage.setItem("score", count_click);
    console.log(number_text)
})

double_click.addEventListener("click", () => {
    add_click *= double;
    count_click -= price_double

    if(price_double == 1){
        price_double = 30;
    }
    else{
        price_double *= Math.random() *3 + 3
        price_double = Math.round(price_double/100) * 100
    }
    price_x2.textContent = price_double;
    number_text.textContent = count_click

})

triple_click.addEventListener("click", () => {
    add_click *= triple;
    count_click -= price_triple
    if(price_triple == 1){
        price_triple = 100;
    }
    else{
        price_triple *= Math.random() *4 + 3
        price_triple = Math.round(price_triple/100) * 100
    }
    price_x3.textContent = price_triple;
    number_text.textContent = count_click;
})


rebirth.addEventListener("click", () =>{
    count_click = 0;
    add_click = 1;
    number_text.textContent = 0;

})
