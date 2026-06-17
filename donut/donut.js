let count_click = 0;
let add_click = 1;

let price_one = 1;
let price_double = 1;
let price_three = 1;
let price_five = 1;

let price_rebirth = 1;

const one = 1;
const double = 2;
const three = 3;
const five = 5;

const donut = document.querySelector("#donut");
const donut_add_stat = document.querySelector("#donut_add_stat")
const number_text = document.querySelector("#number_text");
const double_click = document.querySelector("#double_click");

const one_click = document.querySelector("#one_click");
const three_click = document.querySelector("#three_click");
const five_click = document.querySelector("#five_click");
const rebirth = document.querySelector("#rebirth");

const price_x2 = document.querySelector("#price_x2");

const price_one_btn = document.querySelector("#price_x1");
const price_three_btn = document.querySelector("#price_x3");
const price_five_btn = document.querySelector("#price_x5");

const actual_clic_num = document.querySelector("#actual_clic_num");
count_click = parseInt(localStorage.getItem("score")) || 0;
add_click = parseInt(localStorage.getItem("add_click")) || 1;

count_click = Number(count_click);
add_click = Number(add_click);
number_text.textContent = formatNumber(count_click);


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
    localStorage.setItem("add_click", add_click);
    if(count_click > price_one){
        one_click.disabled = false;
    }

    if(count_click > price_three){
        three_click.disabled = false;
    }
    if(count_click > price_five){
        five_click.disabled = false;
    }
    
    if(count_click > price_double){
        double_click.disabled = false;
    }

    price_one_btn.textContent = price_one;
})



one_click.addEventListener("click", () => {
    if(count_click >= price_one){
        add_click += one;
        count_click -= price_one;

        if(price_one == 1){
            price_one = 30;
        }
        else{
            price_one *= Math.random() *1 + 2
            price_one = Math.round(price_one/100) * 100
        }

        if(count_click < price_one){
            one_click.disabled = true
        }

        number_text.textContent = formatNumber(count_click);
        price_one_btn.textContent = formatNumber(price_one);
        donut_add_stat.textContent = add_click;
    }    
})

double_click.addEventListener("click", () => {
    if(count_click >= price_double){

        add_click *= double;
        count_click -= price_double;

        if(price_double == 1){
            price_double = 30;
        }
        else{
            price_double *= Math.random() *3 + 3
            price_double = Math.round(price_double/100) * 100
        }

        if(count_click < price_double){
            double_click.disabled = true
        }

        number_text.textContent = formatNumber(count_click);
        price_x2.textContent = formatNumber(price_double);
        donut_add_stat.textContent = add_click;
}
})


three_click.addEventListener("click", () =>{
    if(count_click >= price_three){

        add_click += three;
        count_click -= price_three;

        if(price_three == 1){
            price_three = 100;
        }
        else{
            price_three *= Math.random() *2 + 1
            price_three = Math.round(price_three/100) * 100
        }

        if(count_click < price_three){
            three_click.disabled = true;
            console.log("le bouton est désactivé")
        }

    number_text.textContent = formatNumber(count_click);
    price_three_btn.textContent = formatNumber(price_three);
    donut_add_stat.textContent = add_click;
}})

five_click.addEventListener("click", () => {
    if(count_click >= price_five){
        add_click += five;
        count_click -= price_five;

        if(price_five == 1){
            price_five = 100;
        }
        else{
            price_five *= Math.random() *2 + 1
            price_five = Math.round(price_five/100) * 100
        }

        if(count_click < price_five){
            five_click.disabled = true;
            console.log("le bouton est désactivé")
        }

    number_text.textContent = formatNumber(count_click);
    price_five_btn.textContent = formatNumber(price_five);
    donut_add_stat.textContent = add_click;
}
})


rebirth.addEventListener("click", () =>{
    count_click = 0;
    add_click = 1;
    number_text.textContent = 0;
    
    price_double = 1;
    price_one = 1;
    price_three = 1;
    price_five = 1;

    
    price_one_btn.textContent = price_one;
    price_three_btn.textContent = price_three;
    price_five_btn = price_five;
    donut_add_stat.textContent = 0;
})
