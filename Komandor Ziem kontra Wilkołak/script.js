function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
function completeAnimation(){
    player1.animationComplete = true;
}

// =============================================================================       Dźwięki

let QziemBlastSound = new Audio('sounds/QziemBlast.wav');
let AttractedSound = new Audio('sounds/Attracted.wav');
let BrickSound = new Audio('sounds/Brick.wav');
let ThrowSound = new Audio('sounds/Throw.wav');
let QziemShieldSound = new Audio('sounds/QziemShield.wav');
let BandaidSound = new Audio('sounds/Bandaid.wav');
let MeatHealSound = new Audio('sounds/MeatHeal.mp3');
let FlutePlaySound = new Audio('sounds/FlutePlay.wav');
let BadGradeSound = new Audio('sounds/BadGrade.mp3');
let ThinkingBrakeSound = new Audio('sounds/ThinkingBrake.mp3');

let FingerBiteSound = new Audio('sounds/FingerBite.mp3');
let RibBreakSound = new Audio('sounds/RibBreak.mp3');
let RipSound = new Audio('sounds/Rip.mp3');
let SteelFurSound = new Audio('sounds/SteelFur.mp3');
let StudentSoulSound = new Audio('sounds/StudentSoul.mp3');
let DrinkBloodSound = new Audio('sounds/DrinkBlood.wav');
let DeceptionSound = new Audio('sounds/Deception.wav');
let TunnelSound = new Audio('sounds/Tunnel.mp3');
let SharpenSound = new Audio('sounds/Sharpen.mp3');

// =============================================================================       Akordeon przycisków z umiejętnościami
document.getElementById("p1Offensive").addEventListener("click", ()=>{
    document.getElementById("QziemBlast").classList.toggle("displayButton");
    document.getElementById("BrickThrow").classList.toggle("displayButton");
    document.getElementById("Attracted").classList.toggle("displayButton");
})
document.getElementById("p1Defensive").addEventListener("click", ()=>{
    document.getElementById("QziemShield").classList.toggle("displayButton");
    document.getElementById("MeatHeal").classList.toggle("displayButton");
    document.getElementById("Bandaid").classList.toggle("displayButton");
})
document.getElementById("p1Boosters").addEventListener("click", ()=>{
    document.getElementById("FlutePlay").classList.toggle("displayButton");
    document.getElementById("BadGrade").classList.toggle("displayButton");
    document.getElementById("ThinkingBrake").classList.toggle("displayButton");
})

document.getElementById("p2Offensive").addEventListener("click", ()=>{
    document.getElementById("FingerBite").classList.toggle("displayButton");
    document.getElementById("RibBreak").classList.toggle("displayButton");
    document.getElementById("Rip").classList.toggle("displayButton");
})
document.getElementById("p2Defensive").addEventListener("click", ()=>{
    document.getElementById("SteelFur").classList.toggle("displayButton");
    document.getElementById("StudentSoul").classList.toggle("displayButton");
    document.getElementById("DrinkBlood").classList.toggle("displayButton");
})
document.getElementById("p2Boosters").addEventListener("click", ()=>{
    document.getElementById("Deception").classList.toggle("displayButton");
    document.getElementById("Tunnel").classList.toggle("displayButton");
    document.getElementById("Sharpen").classList.toggle("displayButton");
})

// =============================================================================    GRACZ 1
const player1 = {
    health: 100,
    defense: 5,
    ability_power: 6,
    bleeding: 0,
    actions: 2,
    animationComplete: true,
    updateHealthBar: function() {
        if(this.health>100) {
            this.health = 100;
        }
        if(this.health<21){
            document.getElementById('p1__healthContainer').style = `background-color: #FF6B6B; width: `+this.health+`%`;
        }else if(this.health<51) {
            document.getElementById('p1__healthContainer').style = `background-color: #FFD93D; width: `+this.health+`%`;
        }else {
            document.getElementById('p1__healthContainer').style = `background-color: #6BCB77; width: `+this.health+`%`;
        }
        document.getElementById('p1Health').innerHTML = Math.round((this.health + Number.EPSILON) * 100) / 100;
    },
    checkBleeding: function() {
        if(this.bleeding>0){
            this.health -= this.bleeding;
            player1.hurt();
        }
    },
    isDed: function() {
        if(this.health<=0){
            document.getElementById('p1Comment').innerHTML = "💀💀💀";
            document.getElementById('p2Comment').innerHTML = "MUAHAHAHAHAHA TA SZKOŁA JEST MOJA!!!";
            document.getElementById('p1Sprite').style = `display: none`;
            setTimeout("alert('Wilkołak wygrał arghhhhh! Teraz pożre wszystkich uczniów w szkole!')", 400);
            setTimeout("location.reload(true);", 450);
        }else {
            return 0;
        }
    },
    updateActions: function() {
        this.actions-=1;
        if(this.actions<=0){
            player2.actions+=2;
        }
        document.getElementById('p1Actions').innerHTML = "AKCJE: "+this.actions;
        document.getElementById('p2Actions').innerHTML = "AKCJE: "+player2.actions;
    },
    updateStats: function() {
        document.getElementById('p1Actions__AbilityPower').innerHTML = "☄️"+this.ability_power;
        document.getElementById('p1Actions__Defense').innerHTML = "⛊"+this.defense;
        document.getElementById('p1Actions__Bleeding').innerHTML = "🩸"+this.bleeding;
    },
    hurt: function() {
        document.getElementById('p1Sprite').src = "QuziemHurt.png";
        setTimeout('document.getElementById("p1Sprite").src = "Qzm.png";', 300)
    },
    //========================= OFENSYWNE ================================
    QziemBlast: function() {
        if(this.actions>0){
            damage = this.ability_power * 2 + getRandomInt(8) - player2.magic_resist;
            if(damage>0){
                player2.health -= damage;
                player2.hurt();
            }
            let line = getRandomInt(3);
            if(damage<=0){
                document.getElementById('p1Comment').innerHTML = "*pierd*";
                document.getElementById('p2Comment').innerHTML = "Potężny czarodziej XD";
            }else if(line=1){
                document.getElementById('p1Comment').innerHTML = "QZIEM BLAST!";
                document.getElementById('p2Comment').innerHTML = "Moja głowa AAAAAH!";
            }else if(line=2){
                document.getElementById('p1Comment').innerHTML = "QZIEM BLAST!";
                document.getElementById('p2Comment').innerHTML = "Ciemność widzę!";
            }else{
                document.getElementById('p1Comment').innerHTML = "QZIEM BLAST!";
                document.getElementById('p2Comment').innerHTML = "Fizyk umie czarować 💀";
            }
            player2.updateHealthBar();
            player2.isDed();
            this.checkBleeding();
            this.updateHealthBar();
            this.isDed();
            QziemBlastSound.play();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Skończyła mi się mana!";
            document.getElementById('p2Comment').innerHTML = "Staruszek się zmęczył XD";
        }
    },
    BrickThrow: function() {
        if(this.actions>0 && this.animationComplete){
            this.animationComplete = false;
            damage = this.ability_power + getRandomInt(4) - player2.magic_resist;
            if(damage>0){
                player2.health -= damage;
                setTimeout('player2.hurt();', 500)
            }
            let line = getRandomInt(3);
            if(line=1){
                document.getElementById('p1Comment').innerHTML = "Dawaj Rick! Rozprosz go!";
                document.getElementById('p2Comment').innerHTML = "Jaki on słodki :3";
            }else if(line=2){
                document.getElementById('p1Comment').innerHTML = "Aport!";
                document.getElementById('p2Comment').innerHTML = "Szczek sczek! AŁA MOJE ZĘBY!";
            }else{
                document.getElementById('p1Comment').innerHTML = "Lecisz Bogdan!";
                document.getElementById('p2Comment').innerHTML = "Jaki on przystojny, niezły twardziel.";
            }
            ThrowSound.play();
            document.querySelector('.p1BrickAttackSprite').id = 'p1BrickAttackSpriteActive';
            setTimeout("document.querySelector('.p1BrickAttackSprite').removeAttribute('id')", 550);
            setTimeout("BrickSound.play();", 500);
            setTimeout("completeAnimation()", 560);
            player2.magic_resist-=4;
            player2.scariness-=1;
            setTimeout(`
            player2.updateHealthBar();
            player2.isDed();
            player2.updateStats();
            `, 500);
            this.checkBleeding();
            this.updateHealthBar();
            this.isDed();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Rick i Bogdan jeszcze nie wrócili do domu :/";
            document.getElementById('p2Comment').innerHTML = "I oby nigdy nie wrócili!";
        }
    },
    Attracted: function() {
        if(this.actions>0){
            damage = this.ability_power + getRandomInt(5) - player2.magic_resist;
            if(player2.isThereTunnel){
                damage+=75;
            }
            if(damage>0){
                player2.health -= damage;
                player2.hurt();
            }
            let line = getRandomInt(3);
            if(player2.isThereTunnel){
                player2.isThereTunnel = false;
                document.getElementById('p1Comment').innerHTML = "PRZYCIĄGAMY SIĘ?! Wpadłeś jak śliwka w kompot!";
                document.getElementById('p2Comment').innerHTML = "AAAAAAAAAAAAAAAAAAA! *łubu dubu* *benc*";
            }else if(line=1){
                document.getElementById('p1Comment').innerHTML = "Przyciągamy się?";
                document.getElementById('p2Comment').innerHTML = "Nie wiem"; 
            }else if(damage<=0){
                document.getElementById('p1Comment').innerHTML = "Przyciągamy się?";
                document.getElementById('p2Comment').innerHTML = "TAK!";
            }else{
                document.getElementById('p1Comment').innerHTML = "Przyciągamy się?";
                document.getElementById('p2Comment').innerHTML = "NIE!";
            }
            player2.updateHealthBar();
            player2.isDed();
            this.checkBleeding();
            this.updateHealthBar();
            this.isDed();
            AttractedSound.play();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Skończyła mi się mana!";
            document.getElementById('p2Comment').innerHTML = "Staruszek się zmęczył XD";
        }
    },
    //========================= DEFENSYWNE ================================
    QziemShield: function() {
        if(this.actions>0){
            if(this.defense>15){
                document.getElementById('p1Comment').innerHTML = "QZIEM SZILD! Co za dużo to zdrowo!";
                document.getElementById('p2Comment').innerHTML = "Muszę poznać swoje prawa...";
            }else if(this.defense>4){
                document.getElementById('p1Comment').innerHTML = "QZIEM SZILD!";
                document.getElementById('p2Comment').innerHTML = "Kto pisał ten skrypt? Fizyk używa magii? Grrr!";
            }else{
                document.getElementById('p1Comment').innerHTML = "QZIEM SZILD! Dobrze, że się w porę spostrzegłem.";
                document.getElementById('p2Comment').innerHTML = "Odbiorę ci tę tarczę i użyje jej do ściągania na sprawdzianie!";
            }
            QziemShieldSound.play();
            this.defense += 3;
            this.updateStats();
            this.checkBleeding();
            this.updateHealthBar();
            this.isDed();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Skończyła mi się mana!";
            document.getElementById('p2Comment').innerHTML = "Staruszek się zmęczył XD";
        }
    },
    MeatHeal: function() {
        if(this.actions>0){
            if(this.health>=80){
                this.health=100;
            }else{
                this.health+=40;
            }
            this.ability_power+=1;
            this.updateHealthBar();
            MeatHealSound.play();
            let line = getRandomInt(3);
            if(line == 1){
                document.getElementById('p1Comment').innerHTML = "Mmmmm... Karkóweczka!";
                document.getElementById('p2Comment').innerHTML = "Woof Woof Szczek Szczek! Daj trochę! A może lepiej nie...";
            }else if(line == 2){
                document.getElementById('p1Comment').innerHTML = "To co, może karkóweczka?";
                document.getElementById('p2Comment').innerHTML = "Nieeee! Tylko nie karkówka!";
            }else {
                document.getElementById('p1Comment').innerHTML = "Wyciągamy karkóweczki!";
                document.getElementById('p2Comment').innerHTML = "Zgłaszam nieprzygotowa- kurde nie mam :(";
            }
            this.checkBleeding();
            this.updateHealthBar();
            this.isDed();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Nie jestem jeszcze głodny.";
            document.getElementById('p2Comment').innerHTML = "Majówka się jeszcze nie zaczęła";
        }
    },
    Bandaid: function() {
        if(this.actions>0){
            if(this.bleeding>=7){
                this.bleeding -= 7;
            }else {
                this.bleeding = 0;
            }
            BandaidSound.play();
            this.updateStats();
            let line = getRandomInt(3);
            if(line == 1){
                document.getElementById('p1Comment').innerHTML = "Rahu ciachu i po strachu.";
                document.getElementById('p2Comment').innerHTML = "Grrrr, to odbiera smaka...";
            }else if(line == 2){
                document.getElementById('p1Comment').innerHTML = "Nie mam czasu na wodę utlenioną!";
                document.getElementById('p2Comment').innerHTML = "Będziesz potrzebował więcej niż ten jeden plaster! Całej szkoły nim nie opatrzysz";
            }else {
                document.getElementById('p1Comment').innerHTML = "Nawet nie szczypało!";
                document.getElementById('p2Comment').innerHTML = "Mniej krwi, mniej zabawy :(";
            }
            this.checkBleeding();
            this.updateHealthBar();
            this.isDed();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Skończyły się plasterki w jednorożce :(";
            document.getElementById('p2Comment').innerHTML = "Zjadłem je!";
        }
    },
    //========================= WSPARCIE ================================
    FlutePlay: function() {
        if(this.actions>0){
            player2.scariness -= getRandomInt(3) + 1;
            if(player2.actions>-1){
                player2.actions-=1;
            }
            if(player2.scariness<=0){
                player2.scariness = 0;
            }
            FlutePlaySound.play();
            let line = getRandomInt(3);
            if(line=1){
                document.getElementById('p1Comment').innerHTML = "🎵🎵🎶🎵🎶🎶🎶🎵🎶🎶🎶🎶";
                document.getElementById('p2Comment').innerHTML = "Nie dość że fizyk, to jeszcze muzyk!";
            }else if(line=2){
                document.getElementById('p1Comment').innerHTML = "Nie czarodziejska tylko magiczna i nie fujarka tylko flet...";
                document.getElementById('p2Comment').innerHTML = "Magiczna flet!";
            }else{
                document.getElementById('p1Comment').innerHTML = "Nie czarodziejska tylko magiczna i nie fujarka tylko flet...";
                document.getElementById('p2Comment').innerHTML = "Magiczna flet!";
            }
            this.checkBleeding();
            this.updateHealthBar();
            this.isDed();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Muszę wpierw złapać oddech";
            document.getElementById('p2Comment').innerHTML = "HAHAHA! Staruszek się zdyszał!";
        }
    },
    BadGrade: function() {
        if(this.actions>0){
            player2.magic_resist-=getRandomInt(6)+1;
            player2.scariness-=getRandomInt(4)+3;
            BadGradeSound.play()
            let line=getRandomInt(3);
            if(player2.magic_resist<1){
                document.getElementById('p1Comment').innerHTML = "Dostajesz jedynkę!";
                document.getElementById('p2Comment').innerHTML = "Zaczynam dostawać depresji, powinienem wyostrzyć swoje zmysły";
            }else if(line=1){
                document.getElementById('p1Comment').innerHTML = "Dlaczego mam 2 twoje kartkówki i na jednej są same liczby 666?";
                document.getElementById('p2Comment').innerHTML = "Ja nic nie wiem! Wrobiono mnie!";
            }else if(line=2){
                document.getElementById('p1Comment').innerHTML = "Wstawiam Ci jedynkę!";
                document.getElementById('p2Comment').innerHTML = "O nieeee... I co powiedzą na to moi rodzice...";
            }else {
                document.getElementById('p1Comment').innerHTML = "Nie zdajesz!";
                document.getElementById('p2Comment').innerHTML = "Ale przecież mam dobrą frekwencję!";
            }
            player2.updateStats();
            this.checkBleeding();
            this.updateHealthBar();
            this.isDed();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "A niech to! Librus się popsuł...";
            document.getElementById('p2Comment').innerHTML = "Frekwencja.edu.pl też nie działa...";
        }
    },
    ThinkingBrake: function() {
        if(this.actions>0){
            this.ability_power += getRandomInt(4)+3;
            ThinkingBrakeSound.play();
            document.getElementById('p1Comment').innerHTML = "Hmmmmmmmmm... 🤔";
            document.getElementById('p2Comment').innerHTML = "Nie myśl bo cię głowa rozboli!";
            this.updateStats();
            this.checkBleeding();
            this.updateHealthBar();
            this.isDed();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Duńska lewica jest antyimigracyjna, dzięki czemu wygrała 3 wybory z rzędu i cały czas cieszy się dużą popularnością oraz poparciem";
            document.getElementById('p2Comment').innerHTML = "OK boomer";
        }
    }
};

// =============================================================================    GRACZ 2

const player2 = {
    health: 100,
    magic_resist: 5,
    scariness: 2,
    actions: 0,
    isThereTunnel: false,
    studentEaten: false,
    updateHealthBar: function() {
        if(this.health>100) {
            this.health = 100;
        }
        if(this.health<21){
            document.getElementById('p2__healthContainer').style = `background-color: #FF6B6B; width: `+this.health+`%`;
        }else if(this.health<51) {
            document.getElementById('p2__healthContainer').style = `background-color: #FFD93D; width: `+this.health+`%`;
        }else {
            document.getElementById('p2__healthContainer').style = `background-color: #6BCB77; width: `+this.health+`%`;
        }
        document.getElementById('p2Health').innerHTML = Math.round((this.health + Number.EPSILON) * 100) / 100;
    },
    isDed: function() {
        if(this.health<=0){
            document.getElementById('p1Comment').innerHTML = "Precz bestio! I nigdy więcej mi się na oczy nie pokazuj!";
            document.getElementById('p2Comment').innerHTML = "💀💀💀";
            document.getElementById('p2Sprite').style = `display: none`;
            setTimeout("alert('Komandor Ziem uratował szkołę przed złym wilkołakiem! Uczniowe przestaną teraz znikać!')", 400);
            setTimeout("location.reload(true);", 450);
        }else {
            return 0;
        }
    },
    updateActions: function() {
        this.actions-=1;
        if(this.actions<=0){
            player1.actions+=2;
        }
        document.getElementById('p2Actions').innerHTML = "AKCJE: "+this.actions;
        document.getElementById('p1Actions').innerHTML = "AKCJE: "+player1.actions;
    },
    updateStats: function() {
        document.getElementById("p2Actions__Scariness").innerHTML = "🗡️"+this.scariness;
        document.getElementById("p2Actions__MagicResist").innerHTML = "🛡️"+this.magic_resist;
    },
    hurt: function() {
        document.getElementById('p2Sprite').src = "WilkolakHurt.png";
        setTimeout('document.getElementById("p2Sprite").src = "Wilkolakaaa.png";', 300)
    },
    //========================= OFENSYWNE ================================
    FingerBite: function() {
        if(this.actions>0){
            damage = this.scariness + getRandomInt(4) - player1.defense;
            if(this.Tunnel){
                damage*=2;
                this.isThereTunnel=false;
            }
            if(damage>0){
                player1.health -= damage;
                player1.bleeding += 1;
                player1.ability_power -= 4;
                player1.hurt();
            }
            let line = getRandomInt(3);
            if(damage<=0){
                document.getElementById('p1Comment').innerHTML = "Zdala od moich palców pajacu!";
                document.getElementById('p2Comment').innerHTML = "💩 nic nie zrobiłem 💩";
            }else if(line == 1){
                document.getElementById('p1Comment').innerHTML = "AUAAA! Jak ja teraz będę czarował?";
                document.getElementById('p2Comment').innerHTML = "Nie będziesz!";
            }else if(line == 2){
                document.getElementById('p1Comment').innerHTML = "Muszę pomedytować!";
                document.getElementById('p2Comment').innerHTML = "Twoje palce są teraz w lepszym miejscu 😋";
            }else {
                document.getElementById('p1Comment').innerHTML = "Bez palców nie mogę wciskać wszystkich dziurek w moim flecie!";
                document.getElementById('p2Comment').innerHTML = "Nawet nie umiesz na nim grać!";
            }
            player1.updateStats();
            player1.checkBleeding();
            player1.updateHealthBar();
            player1.isDed();
            FingerBiteSound.play();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Nuh uh!";
            document.getElementById('p2Comment').innerHTML = "😔";
        }
    },
    RibBreak: function() {
        if(this.actions>0){
            damage = this.scariness + Math.floor(player1.defense)/2 + getRandomInt(3);
            if(this.Tunnel){
                damage*=2;
                this.isThereTunnel=false;
            }
            if(damage>0){
                player1.health -= damage;
                player1.hurt();
            }
            if(damage>10){
                document.getElementById('p1Comment').innerHTML = "AUA! I po co ja dawałem tyle w obronę?";
                document.getElementById('p2Comment').innerHTML = "Ściąganie na sprawdzianie to sama przyjemność!";
            }else if(player1.defense<5){
                document.getElementById('p1Comment').innerHTML = "Wyczuwam kłopoty! Powinienem użyć tarczy!";
                document.getElementById('p2Comment').innerHTML = "Odbiorę ci tę tarczę i użyje jej do ściągania na sprawdzianie!";
            }else if(damage>0) {
                document.getElementById('p1Comment').innerHTML = "Arggghhh! Moje żebra!";
                document.getElementById('p2Comment').innerHTML = "SZCZEK SZCZEK, ŻEBERKA!!!";
            }else{
                document.getElementById('p1Comment').innerHTML = "HAHAHA! Chcesz mieć łatwiejszy dostęp do mojego serduszka?";
                document.getElementById('p2Comment').innerHTML = "Odbiorę ci tę tarczę i użyje jej do ściągania na sprawdzianie!";
            }
            player1.bleeding += 1;
            player1.defense -= 4;
            player1.checkBleeding();
            player1.updateHealthBar();
            player1.isDed();
            player1.updateStats();
            RibBreakSound.play();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Spróbuj wsadzić do ryżu, szybciej się rozmrozi.";
            document.getElementById('p2Comment').innerHTML = "Żeberka jeszcze się nie rozmroziły.";
        }
    },
    Rip: function(){
        if(this.actions>0){
            damage = this.scariness + player1.bleeding - player1.defense;
            player1.checkBleeding();
            if(this.Tunnel){
                damage*=2;
                this.isThereTunnel=false;
            }
            if(damage>7){
                player1.bleeding += 2;
                player1.health -= damage;
                player1.hurt();
            }else if (damage>0){
                player1.bleeding += 1;
                player1.health -= damage;
                player1.hurt();
            }
            player1.updateStats();
            if(damage>7){
                document.getElementById('p1Comment').innerHTML = "🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸";
                document.getElementById('p2Comment').innerHTML = "SOK POMIDOROWY!!!!";
            }else if(damage>0) {
                document.getElementById('p1Comment').innerHTML = "Auć! Przestań mnie drapać!";
                document.getElementById('p2Comment').innerHTML = "Drapu drapu drapu drap, żyli sobie bez żadnych rad!";
            }else{
                document.getElementById('p1Comment').innerHTML = "Ty diabelska bestio! Skaleczyłeś mnie!";
                document.getElementById('p2Comment').innerHTML = "Drapię, łapię, kasa wpada, taka drapu jest zasada!";
            }
            player1.bleeding += 1
            player1.updateHealthBar();
            player1.isDed();
            RipSound.play();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Zjadłem go!";
            document.getElementById('p2Comment').innerHTML = "Zgubiłem gdzieś skalpel.";
        }
    },
    //========================= DEFENSYWNE ================================
    SteelFur: function() {
        if(this.actions>0){
            this.magic_resist+=4;
            let line = getRandomInt(3);
            if(line == 1){
                document.getElementById('p1Comment').innerHTML = "To ty je tak rozwalasz!?";
                document.getElementById('p2Comment').innerHTML = "Konduktor naprawił szafki! Pora zebrać metal!";
            }else if(line == 2){
                document.getElementById('p1Comment').innerHTML = "To ty je tak rozwalasz!?";
                document.getElementById('p2Comment').innerHTML = "Konduktor naprawił szafki! Pora zebrać metal!";
            }else{
                document.getElementById('p1Comment').innerHTML = "To ty je tak rozwalasz!?";
                document.getElementById('p2Comment').innerHTML = "Konduktor naprawił szafki! Pora zebrać metal!";
            }
            this.updateStats();
            player1.checkBleeding();
            player1.updateHealthBar();
            player1.isDed();
            SteelFurSound.play();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Dobrze, że ponaklejałem naklejki na szafeczki";
            document.getElementById('p2Comment').innerHTML = "NIEEEE! TE NAKLEJKI SĄ STRASZNE!!";
        }
    },
    StudentSoul: function() {
        if(this.actions>0){
            if(this.studentEaten){
                this.health=0;
                this.updateHealthBar();
                setTimeout("alert('Głupi wilczur, nie wiesz, że je się z dłuższymi przerwami?');", 1);
            }else{
                this.health=100;
                this.scariness+=1;
                this.studentEaten=true;
            }
            this.updateStats();
            let line = getRandomInt(3);
            if(line=1){
                document.getElementById('p1Comment').innerHTML = "Nieeeeee! Tylko nie Stefan!";
                document.getElementById('p2Comment').innerHTML = "Hop do pyska! *Odgłos odkurzacza*";
            }else if(line=2){
                document.getElementById('p1Comment').innerHTML = "Nieeeeee! Tylko nie... A nie, tego nie lubiłem. Nie duża strata.";
                document.getElementById('p2Comment').innerHTML = "*Odgłos odkurzacza* Mmmmm, pyszności 😋";
            }else{
                document.getElementById('p1Comment').innerHTML = "Zgładzę cię Wilkołaku! To ostatni uczeń, którego zjadłeś!";
                document.getElementById('p2Comment').innerHTML = "*Odgłos odkurzacza*";
            }
            player1.checkBleeding();
            player1.updateHealthBar();
            player1.isDed();
            this.updateHealthBar();
            this.isDed();
            this.updateActions();
            StudentSoulSound.play();
        }else{
            document.getElementById('p1Comment').innerHTML = "😨";
            document.getElementById('p2Comment').innerHTML = "Jeszcze nie pora na uczniora!";
        }
    },
    DrinkBlood: function() {
        if(this.actions>0){
            this.health+=player1.bleeding;
            let line = getRandomInt(3);
            if(line == 1){
                document.getElementById('p1Comment').innerHTML = "Zostaw mój sok pomidorowy!";
                document.getElementById('p2Comment').innerHTML = "*siorb*";
            }else if(line == 2){
                document.getElementById('p1Comment').innerHTML = "Głupi komar!";
                document.getElementById('p2Comment').innerHTML = "*siorb*";
            }else{
                document.getElementById('p1Comment').innerHTML = "Napijemy się po walce!";
                document.getElementById('p2Comment').innerHTML = "*siorb*";
            }
            player1.checkBleeding();
            player1.updateHealthBar();
            player1.isDed();
            this.updateHealthBar();
            DrinkBloodSound.play();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Nie dla psa sok pomidorowy!";
            document.getElementById('p2Comment').innerHTML = "Nie mam teraz ochoty na sok pomidorowy...";
        }
    },
    //========================= WSPARCIE ================================
    Deception: function() {
        if(this.actions>0){
            if(player1.actions>-1){
                player1.actions-=1;
            }
            let line = getRandomInt(3);
            if(line == 1){
                document.getElementById('p1Comment').innerHTML = "Co? Gdzie?";
                document.getElementById('p2Comment').innerHTML = "Spójrz tam!";
            }else if(line == 2){
                document.getElementById('p1Comment').innerHTML = "Co? Gdzie?";
                document.getElementById('p2Comment').innerHTML = "Spójrz! Uczennica w krótkiej spódniczce!";
            }else{
                document.getElementById('p1Comment').innerHTML = "Kto tam?";
                document.getElementById('p2Comment').innerHTML = "Puk puk";
            }
            player1.checkBleeding();
            player1.updateHealthBar();
            player1.isDed();
            DeceptionSound.play();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Przewidziałem twój plan!";
            document.getElementById('p2Comment').innerHTML = "Niee! Jak to możliwe?";
        }
    },
    Tunnel: function() {
        if(this.actions>0 && !this.isThereTunnel){
            document.getElementById('p1Comment').innerHTML = "A co gdybym sam cię wrzucił do tego dołu?";
            document.getElementById('p2Comment').innerHTML = "Jestem krasnoludem i kopię dół! Kopu-kopu-dół!";
            player1.checkBleeding();
            player1.updateHealthBar();
            player1.isDed();
            this.isThereTunnel = true;
            TunnelSound.play();
            this.updateActions();
        }else if(this.isThereTunnel){
            document.getElementById('p1Comment').innerHTML = "Twój grób jest już wykopany!";
            document.getElementById('p2Comment').innerHTML = "Podkop jest już zrobiony!";
        }else{
            document.getElementById('p1Comment').innerHTML = "Psinka się zmęczyła?";
            document.getElementById('p2Comment').innerHTML = "😪";
        }
    },
    Sharpen: function() {
        if(this.actions>0){
            this.scariness+=4;
            let line = getRandomInt(3);
            if(line == 1){
                document.getElementById('p1Comment').innerHTML = "Czemu akurat długopisem";
                document.getElementById('p2Comment').innerHTML = "Podziel się długopisem!";
            }else if(line == 2){
                document.getElementById('p1Comment').innerHTML = "Nie słyszę mojej pięknej muzyki AAAAAA!";
                document.getElementById('p2Comment').innerHTML = "*Odgłos szlifierki*";
            }else{
                document.getElementById('p1Comment').innerHTML = "Moje uszy AAAA!";
                document.getElementById('p2Comment').innerHTML = "*Odgłos szlifierki*";
            }
            this.updateStats();
            player1.checkBleeding();
            player1.updateHealthBar();
            player1.isDed();
            SharpenSound.play();
            this.updateActions();
        }else{
            document.getElementById('p1Comment').innerHTML = "Fiu fiu";
            document.getElementById('p2Comment').innerHTML = "To nie czas na ostrzenie pazurków!";
        }
    }

};