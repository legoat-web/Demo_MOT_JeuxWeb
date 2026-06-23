let money = 500;
let price = 100;

const btn = document.getElementById("buyBtn");
const moneyText = document.getElementById("money");

btn.addEventListener("click", () => {
  if (money >= price) {
    // 1. retirer l'argent
    money -= price;
    moneyText.textContent = money;

    // 2. augmenter le prochain prix (ex: +20%)
    price = Math.round(price * 1.2);
    btn.textContent = `Acheter (${price} CHF)`;

    // 3. vérifier si encore possible après achat
    if (money < price) {
      disableButton();
    }
  }
});

function disableButton() {
  btn.style.opacity = "0";
  btn.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    btn.style.display = "none";
  }, 500);
}