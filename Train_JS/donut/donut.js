
let count_click = 0;
let count_gem = 0;
let add_click = 1;
let mul_donuts = 1;
let mul_gem = 1;
let add_gem = 1;
let rotation = 0;

const donut = document.querySelector("#donut");
const img_donut = document.querySelector("#img_donut");
const donut_add_stat = document.querySelector("#donut_add_stat");
const gem_add_stat = document.querySelector("#gem_add_stat");
const number_text = document.querySelector("#number_text");
const double_click = document.querySelector("#double_click");

const one_click = document.querySelector("#one_click");
const three_click = document.querySelector("#three_click");
const five_click = document.querySelector("#five_click");
const ten_click = document.querySelector("#ten_click");
const rebirth = document.querySelector("#rebirth");
const double_donuts = document.querySelector("#double_donut");
const double_gems = document.querySelector("#double_gem");


const price_rebirth = document.querySelector("#price_rebirth")
const price_one_btn = document.querySelector("#price_x1");
const price_three_btn = document.querySelector("#price_x3");
const price_five_btn = document.querySelector("#price_x5");
const price_ten_btn = document.querySelector("#price_x10");
const price_double_donuts = document.querySelector("#price_x2_donuts");
const price_double_gems = document.querySelector("#price_x2_gems");

const upgradeOne = {
    price: 30,
    bonus: 1,
    button: one_click,
    show_button: price_one_btn
}
const upgradeThree = {
    price: 100,
    bonus: 3,
    button: three_click,
    show_button: price_three_btn
}
const upgradeFive = {
    price: 300,
    bonus: 5,
    button: five_click,
    show_button: price_five_btn
}
const upgradeTen = {
    price: 600,
    bonus: 10,
    button: ten_click,
    show_button: price_ten_btn
}

const upgradeRebirth = {
    price: 1000,
    bonus: 0,
    button: rebirth,
    show_button: price_rebirth
}

const upgradeDoubleDonuts = {
    price: 1,
    bonus: 2,
    button: double_donuts,
    show_button: price_double_donuts
}

const upgradeDoubleGems = {
    price: 1,
    bonus: 2,
    button: double_gems,
    show_button: price_double_gems
}


const upgrades = [
    upgradeOne,
    upgradeThree,
    upgradeFive,
    upgradeTen,
    upgradeRebirth
]

const upgradeGems = [
    upgradeDoubleDonuts,
    upgradeDoubleGems
]

function buyUpgradeDonuts(upgrade){
    if(count_click >= upgrade.price){
        add_click += upgrade.bonus;
        donut_add_stat.textContent = formatNumber(add_click * mul_donuts);
        count_click -= upgrade.price;
        upgrade.price *= 2;
        upgrade.show_button.textContent = formatNumber(upgrade.price);
        number_text.textContent = formatNumber(count_click);
    }

    if(upgrade.bonus === 0){
        count_gem += add_gem * mul_gem;
        gem_add_stat.textContent = count_gem;
        upgrade.price *= 3;
        upgrade.show_button.textContent = formatNumber(upgrade.price);
        number_text.textContent = formatNumber(count_click);
    }
}

function buyUpgradeGems(upgrade){

    if(count_gem >= upgrade.price){
        console.log("le bouton est achetable")
        if(upgrade.button === double_gems){
            mul_gem *= 2;
        }
        else if(upgrade.button === double_donuts){
            mul_donuts *= 2;
        }

        count_gem -= upgrade.price;
        upgrade.price *= 3;
        upgrade.show_button.textContent = formatNumber(upgrade.price);
        gem_add_stat.textContent = formatNumber(count_gem);
        verifyPriceGems();
    }


}


function verifyPrice(){

    upgrades.forEach(upgrade => {
        
        if(count_click < upgrade.price){
            upgrade.button.disabled = true;
        }
        else{
            upgrade.button.disabled = false;
        }

    });
}

function verifyPriceGems(){
    upgradeGems.forEach(upgrade => {
        if(count_gem < upgrade.price){
            upgrade.button.disabled = true;
        }
        else{
            upgrade.button.disabled = false;
        }
    })
}

function loadGame(){
    const data = localStorage.getItem("save");

    if(!data) return;

    let save;

    try {
        save = JSON.parse(data);
    } catch (e) {
        console.log("Save cassée → reset");
        localStorage.removeItem("save");
        return;
    }

    count_click = save.count_click || 0;
    add_click = save.add_click || 1;
    count_gem = save.count_gem || 0;
    mul_gem = save.mul_gem || 1;
    mul_donuts = save.mul_donuts || 1;

    upgradeOne.price = save.upgradeOnePrice || 30 * mul_upgrade;
    upgradeThree.price = save.upgradeThreePrice || 100 * mul_upgrade;
    upgradeFive.price = save.upgradeFivePrice || 300 * mul_upgrade;
    upgradeTen.price = save.upgradeTenPrice || 600 * mul_upgrade;
    upgradeRebirth.price = save.upgradeRebirthPrice || 1000 * mul_upgrade;
    upgradeDoubleDonuts.price = save.upgradeDoubleDonutsPrice || 1;
    upgradeDoubleGems.price = save.upgradeDoubleGemsPrice || 1;
}



function saveGame(){
    const save = {
    count_click,
    add_click,
    upgradeOnePrice : upgradeOne.price,
    upgradeThreePrice : upgradeThree.price,
    upgradeFivePrice : upgradeFive.price,
    upgradeTenPrice : upgradeTen.price,
    upgradeRebirthPrice : upgradeRebirth.price,
    upgradeDoubleDonutsPrice : upgradeDoubleDonuts.price,
    upgradeDoubleGemsPrice : upgradeDoubleGems.price,
    count_gem, 
    mul_gem,
    mul_donuts
};

    localStorage.setItem("save", JSON.stringify(save));
}
function updateSave(){
    number_text.textContent = formatNumber(count_click);
    donut_add_stat.textContent = formatNumber(add_click * mul_donuts);
    upgradeOne.show_button.textContent = formatNumber(upgradeOne.price);
    upgradeThree.show_button.textContent = formatNumber(upgradeThree.price);
    upgradeFive.show_button.textContent = formatNumber(upgradeFive.price);
    price_ten_btn.textContent = formatNumber(upgradeTen.price);
    price_rebirth.textContent = formatNumber(upgradeRebirth.price);
    price_double_donuts.textContent = formatNumber(upgradeDoubleDonuts.price);
    price_double_gems.textContent = formatNumber(upgradeDoubleGems.price);
    gem_add_stat.textContent = count_gem;
    mul_gem = mul_gem;
}

loadGame();
updateSave();
verifyPrice();
verifyPriceGems();
saveGame();



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
    count_click += add_click * mul_donuts;
    verifyPrice();
    verifyPriceGems();
    updateSave();
    saveGame();
    rotation += 15;
    img_donut.style.transform = `rotate(${rotation}deg)`;   
})



one_click.addEventListener("click", () => {
    buyUpgradeDonuts(upgradeOne);
    updateSave();
    saveGame();
    verifyPrice();
})


three_click.addEventListener("click", () =>{
    buyUpgradeDonuts(upgradeThree);
    updateSave();
    saveGame();
    verifyPrice();
})

five_click.addEventListener("click", () => {
    buyUpgradeDonuts(upgradeFive);
    updateSave();
    saveGame();
    verifyPrice();
})
ten_click.addEventListener("click", () => {
    buyUpgradeDonuts(upgradeTen);
    updateSave();
    saveGame();
    verifyPrice();
})

rebirth.addEventListener("click", () =>{

    count_click = 0;
    add_click = 1;
    upgradeOne.price = 30;
    upgradeThree.price = 100;
    upgradeFive.price = 300;
    upgradeTen.price = 600;

    price_one_btn.textContent = upgradeOne.price;
    price_three_btn.textContent = upgradeThree.price;
    price_five_btn.textContent = upgradeFive.price;
    price_ten_btn.textContent = upgradeTen.price;
    number_text.textContent = 0;
    donut_add_stat.textContent = formatNumber(add_click);
    gem_add_stat.textContent = formatNumber(count_gem);

    verifyPrice();
    verifyPriceGems();
    updateSave();
    saveGame();
    buyUpgradeDonuts(upgradeRebirth);
})

double_donuts.addEventListener("click", () =>{
    buyUpgradeGems(upgradeDoubleDonuts);
    verifyPriceGems();
})
double_gems.addEventListener("click", () =>{
    buyUpgradeGems(upgradeDoubleGems);
    verifyPriceGems();
    updateSave();
    saveGame();
})