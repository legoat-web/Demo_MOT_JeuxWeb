let money = 500;
let price = 100;

const pay = document.querySelector("#pay");
const earn = document.querySelector("#earn");
const actual_money = document.querySelector("#actual_money")

earn.addEventListener("click", () => {
    money += price;
    actual_money.textContent = money
})
pay.addEventListener("click", () => {
    if(money >= price)
        {
    money -= price;
    actual_money.textContent = money;

            if(money < price){
                disableButton();
            }
    }

})

function disableButton(){
    pay.style.opacity = "0";
    pay.style.transition = "opacity 0.5s ease"

setTimeout(() => {
    pay.style.display = "none";
  }, 500);
}
