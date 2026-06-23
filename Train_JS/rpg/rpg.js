let playerHp = 100;
let playermaxhp = 100;
let monsterHp = 80;
let damage = 0;
let mindamage = 5;
let maxdamage = 16;
let monsterdamage = 0;
let soin = 0;
let crit = 0;
let pot = 3;
let maxpot = 3;
let niveauMonstre = 1;
let monsterMaxHp = 80;
let monstermindamage = 1;
let monstermaxdamage = 18;
let logligne = 0;
let max = 0;
const restart = document.getElementById("rejouerbtn");
const attaque = document.getElementById("attack");
const heal = document.getElementById("heal");
const log = document.getElementById("log");
const boutique = document.getElementById("boutique");
const atkplus = document.getElementById("atkplus");
const vieplus = document.getElementById("vieplus");
const potplus = document.getElementById("potplus");
const healmax = document.getElementById("healmax");
atkplus.addEventListener("click", upgradeAtk);
vieplus.addEventListener("click", upgradeVie);
potplus.addEventListener("click", upgradePot);
healmax.addEventListener("click", fullHeal);

//attaque
attaque.addEventListener("click", () => {
    if (crit == 1) {
        document.getElementById("crit").classList.add("absent");
        crit = 0;
    }

    //calcule des degats
    damage = Math.floor(Math.random() * maxdamage) + mindamage;

    //calcul du crit
    if (Math.random() < 0.05) {
        damage = damage * 2;
        crit = 1;
        document.getElementById("crit").classList.remove("absent");
    }

    //calcul du dodge
    if (Math.random() < 0.1) {
        document.getElementById("monsterdodge").classList.remove("absent");
        damage = 0;
    }

    //met les dégats si pas dodge
    else {
        monsterHp = monsterHp - damage;
        document.getElementById("monsterdodge").classList.add("absent");
        document.getElementById("monster").textContent = monsterHp;
    }

    //calcul degat du monstre
    monsterdamage = Math.floor(Math.random() * monstermaxdamage) + monstermindamage;

    //calcul du dodge
    if (Math.random() < 0.1) {
        document.getElementById("playerdodge").classList.remove("absent");
        monsterdamage = 0;

    }

    //met les degats si pas dodge
    else {
        playerHp = playerHp - monsterdamage;
        document.getElementById("playerdodge").classList.add("absent");
        document.getElementById("player").textContent = playerHp;
    }

    //ecrit dans le journal de combat
    addLog(`Tu infliges ${damage} dégâts au monstre.`);
    addLog(`Le monstre t'inflige ${monsterdamage} dégâts.`);

    //si egalite
    if (monsterHp <= 0 && playerHp <= 0) {
        monsterHp = 0;
        document.getElementById("monster").textContent = monsterHp;
        playerHp = 0;
        document.getElementById("player").textContent = playerHp;
        document.getElementById("egalite").classList.remove("absent");
        attaque.disabled = true;
        heal.disabled = true;
        document.getElementById("restart").classList.remove("absent");
    }

    //si victoire
    else if (monsterHp <= 0) {
        monsterHp = 0;
        playerHp += 20;
        if (playerHp > playermaxhp) {
            playerHp = playermaxhp;
        }
        document.getElementById("player").textContent = playerHp;
        document.getElementById("monster").textContent = monsterHp;
        document.getElementById("crit").classList.add("absent");
        while (log.firstChild) {
            log.removeChild(log.firstChild);
        }
        addLog(`Le monstre niveau ${niveauMonstre} est vaincu !`);
        attaque.disabled = true;
        heal.disabled = true;
        boutique.classList.remove("absent");



    }

    //si defaite
    else if (playerHp <= 0) {
        playerHp = 0;
        document.getElementById("player").textContent = playerHp;
        document.getElementById("defaite").classList.remove("absent");
        attaque.disabled = true;
        heal.disabled = true
        document.getElementById("restart").classList.remove("absent");
    }
});


//soin
heal.addEventListener("click", () => {

    //calcul du soin
    soin = Math.floor(Math.random() * 11) + 10;
    playerHp = playerHp + soin;
    if (playerHp > playermaxhp) {
        playerHp = playermaxhp;
    }
    document.getElementById("player").textContent = playerHp;

    //calcul des degats du monstre
    monsterdamage = Math.floor(Math.random() * monstermaxdamage) + monstermindamage;

    //calcul du dodge
    if (Math.random() < 0.1) {
        document.getElementById("playerdodge").classList.remove("absent");
        monsterdamage = 0;
    }

    //mets les degats si pas dodge
    else {

        playerHp = playerHp - monsterdamage;
        document.getElementById("playerdodge").classList.add("absent");
    }

    //enleve 1 potion du stock
    pot = pot - 1;
    document.getElementById("potion").textContent = pot;
    if (pot <= 0) {
        heal.disabled = true;
    }

    //ajout dans le journal de combat
    addLog(`Tu te soignes de ${soin} HP.`);
    addLog(`Le monstre t'attaque pour ${monsterdamage} dégâts.`);
    document.getElementById("player").textContent = playerHp;

    //si defaite
    if (playerHp <= 0) {
        playerHp = 0;
        document.getElementById("player").textContent = playerHp;
        document.getElementById("defaite").classList.remove("absent");
        document.getElementById("restart").classList.remove("absent");
                attaque.disabled = true;
        heal.disabled = true;
    }
});


//rejouer
restart.addEventListener("click", () => {
    playerHp = 100;
    playermaxhp = 100;
    monsterHp = 80;
    damage = 0;
    mindamage = 5;
    maxdamage = 16;
    monsterdamage = 0;
    soin = 0;
    crit = 0;
    pot = 3;
    maxpot = 3;
    niveauMonstre = 1;
    monsterMaxHp = 80;
    monstermindamage = 1;
    monstermaxdamage = 18;
    document.getElementById("potion").textContent = pot;
    document.getElementById("maxpotion").textContent = maxpot;
    document.getElementById("player").textContent = playerHp;
    document.getElementById("playermax").textContent = playermaxhp;
    document.getElementById("monster").textContent = monsterHp;
    document.getElementById("monstermax").textContent = monsterMaxHp
    document.getElementById("niv").textContent = niveauMonstre;
    heal.disabled = false;
    attaque.disabled = false;
    document.getElementById("restart").classList.add("absent");
    document.getElementById("defaite").classList.add("absent");
    document.getElementById("egalite").classList.add("absent");
    document.getElementById("monsterdodge").classList.add("absent");
    document.getElementById("playerdodge").classList.add("absent");
    document.getElementById("crit").classList.add("absent");
    while (log.firstChild) {
        log.removeChild(log.firstChild);
    }
});

//fonction pour ajouter dans le log
function addLog(message) {
    const log = document.getElementById("log");
    const p = document.createElement("p");
    p.textContent = message;
    log.appendChild(p);

    // scroll automatique vers le bas
    log.scrollTop = log.scrollHeight;
    logligne++;
}

//monstre plus fort

function spawnNextMonster() {
    //augmente le niveau du monstre
    if (niveauMonstre > max) {
        max = niveauMonstre;
        document.getElementById("maxbeat").textContent = max;
    }

    niveauMonstre++;
    monsterMaxHp += 10;
    monsterHp = monsterMaxHp;
    monstermindamage += 1;
    monstermaxdamage += 1;
    document.getElementById("niv").textContent = niveauMonstre;
    document.getElementById("monstermax").textContent = monsterMaxHp;
    pot = maxpot;

    // mise à jour de l'affichage
    document.getElementById("monster").textContent = monsterHp;
    document.getElementById("potion").textContent = pot;

    // réactive le bouton soin
    heal.disabled = false;
    attaque.disabled = false;
    addLog(`Un monstre niveau ${niveauMonstre} apparaît avec ${monsterHp} PV !`);
}


function upgradeAtk() {
    mindamage += 3;
    maxdamage += 2;
    boutique.classList.add("absent");
    spawnNextMonster();
}
function upgradePot() {
    maxpot += 1;
    pot = maxpot;
    document.getElementById("maxpotion").textContent = maxpot;
    boutique.classList.add("absent");
    spawnNextMonster();
}
function fullHeal() {
    playerHp = playermaxhp;
    document.getElementById("player").textContent = playerHp;
    boutique.classList.add("absent");
    spawnNextMonster();
}
function upgradeVie() {
    playerHp += 20;
    playermaxhp += 20;
    document.getElementById("player").textContent = playerHp;
    document.getElementById("playermax").textContent = playermaxhp;
    boutique.classList.add("absent");
    spawnNextMonster();
}