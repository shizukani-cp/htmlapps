
const mainImage = document.getElementById("mainImage");
const scoreE = document.querySelector("p");
const binaryModeE = document.getElementById("binaryMode");
const upgradeCostE = document.getElementById("upgradeCost");
const helperCostE = document.getElementById("helperCost");
const buyGunCostE = document.getElementById("buyGunCost");
let score = 0;
let money = 0;
let clickIncrease = 1;
let baseCost = 10;
let currentCost = baseCost;
let upgradeCost = 10;
let helperCost = 20;
let buyGunCost = 1000000;
let autoClickers = [];
let gunBought = false;


class Helper {
  static interval = 300;


  constructor() {
    this.time = 0;
  }


  tick() {
    this.time++;
    if (this.time % Helper.interval === 0) {
      this.time = 0;
      document.getElementById("clickArea").click();
      updateScore();
    }
  }
}


class Gun {
  static interval = 1;


  constructor() {
    this.time = 0;
    gunBought = true;
  }


  tick() {
    this.time++;
    if (this.time % Gun.interval === 0) {
      this.time = 0;
      document.getElementById("clickArea").click();
      updateScore();
    }
  }
}


updateScore();
updateUpgradeCost();
updateHelperCost();
updateBuyGunCost();


function get_guideline(n) {
  const guidelines = {
    6429000000000:"アメリカの国家予算",
    3983000000000:"中国の国家予算",
    1785000000000:"ドイツの国家予算",
    1756000000000:"日本の国家予算",
    1427000000000:"フランスの国家予算",
    998006000000:"イギリスの国家予算",
    901494000000:"イタリアの国家予算",
    686718000000:"カナダの国家予算",
    604135000000:"ロシアの国家予算",
    546084000000:"スペインの国家予算",
    495007000000:"インドの国家予算",
    479330000000:"オーストラリアの国家予算",
    424196000000:"ブラジルの国家予算",
    396687000000:"オランダの国家予算",
    378552000000:"韓国の国家予算",
    267105000000:"ベルギーの国家予算",
    264261000000:"メキシコの国家予算",
    259170000000:"スウェーデンの国家予算",
    247093000000:"サウジアラビアの国家予算",
    244485000000:"ポーランドの国家予算",
    239767000000:"スイスの国家予算",
    218480000000:"オーストリアの国家予算",
    212810000000:"クロアチアの国家予算",
    210536000000:"トルコの国家予算",
    185645000000:"デンマークの国家予算",
    185338000000:"ノルウェーの国家予算",
    150823000000:"アルゼンチンの国家予算",
    140643000000:"フィンランドの国家予算",
    139374000000:"イスラエルの国家予算",
    130872000000:"インドネシアの国家予算",
    129741000000:"アラブ首長国連邦の国家予算",
    104689000000:"タイの国家予算",
    103838000000:"チェコの国家予算",
    102052000000:"ポルトガルの国家予算",
    99784000000:"アイルランドの国家予算",
    98523000000:"ギリシャの国家予算",
    94985000000:"コロンビアの国家予算",
    94943000000:"台湾の国家予算",
    84190000000:"南アフリカの国家予算",
    77988000000:"クウェートの国家予算",
    77736000000:"マレーシアの国家予算",
    76694000000:"ニュージーランドの国家予算",
    72193000000:"ルーマニアの国家予算",
    71173000000:"フィリピンの国家予算",
    71160000000:"エジプトの国家予算",
    70830000000:"ハンガリーの国家予算",
    70124000000:"香港の国家予算",
    65922000000:"カタールの国家予算",
    64895000000:"ベトナムの国家予算",
    60714000000:"イランの国家予算",
    59974000000:"シンガポールの国家予算",
    55185000000:"アルジェリアの国家予算",
    55160000000:"チリの国家予算",
    54520000000:"キューバの国家予算",
    51534000000:"イラクの国家予算",
    45983000000:"ペルーの国家予算",
    43495000000:"スロバキアの国家予算",
    750000:"ピトケアン諸島の国家予算",
    2.15:"絶対的貧困",
    1:"一ドルショップに行ける"
  };
  for (let m in guidelines) {
    if (n / 35000000000000000 >= m) {
      return guidelines[m];
    }
  }
  return "どこでもない";
}


function executeAutoClick() {
  for (let ac of autoClickers) {
    ac.tick();
  }
}


// スコア表示を更新する関数
function updateScore() {
  if (binaryModeE.checked) {
    scoreE.textContent = `スコア:${score.toString(2)} お金:${money.toString(2)}ジンバブエドル 目安:${get_guideline(money)}`
  } else {
    scoreE.textContent = `スコア:${score} お金:${money}ジンバブエドル 目安:${get_guideline(money)}`;
  }
}


// アップグレードコスト表示を更新する関数
function updateUpgradeCost() {
  if (binaryModeE.checked) {
    upgradeCostE.textContent = upgradeCost.toString(2);
  } else {
    upgradeCostE.textContent = upgradeCost;
  }
}


// 助っ人召喚コスト表示を更新する関数
function updateHelperCost() {
  if (binaryModeE.checked) {
    helperCost.textContent = helperCost.toString(2);
  } else {
    helperCost.textContent = helperCost;
  }
}


function updateBuyGunCost() {
  if (binaryModeE.checked) {
    buyGunCostE.textContent = buyGunCost.toString(2);
  } else {
    buyGunCostE.textContent = buyGunCost;
  }
}


// クリックイベントを処理する関数
function handleClick() {
  score += clickIncrease;
  money += clickIncrease;
  updateScore();




  if (!gunBought) {
    // クリックした画像を一時的に大きくする
    mainImage.style.transform = "scale(1.2)";


  // 0.3秒後に元の大きさに戻す
    setTimeout(() => {
      mainImage.style.transform = "scale(1)";
    }, 300);
  }
}


// クリックイベントをクリックエリアに追加する
document.getElementById("clickArea").addEventListener("click", handleClick);


// アップグレードボタンのクリックイベントを処理する関数
document.getElementById("upgradeButton").addEventListener("click", handleUpgrade);


// アップグレードボタンの処理
function handleUpgrade() {
  if (money >= upgradeCost) {
    money -= upgradeCost;
    score += upgradeCost;
    clickIncrease = Math.ceil(clickIncrease * 1.2); // 増加量を1.2倍にする
    upgradeCost = Math.ceil(upgradeCost * 1.5);
    updateScore();
    updateUpgradeCost();
  }
}


// 助っ人を召喚するボタンのクリックイベントを処理する関数
document.getElementById("summonHelperButton").addEventListener("click", handleSummonHelper);


// 助っ人を召喚する関数
function handleSummonHelper() {
  if (money >= helperCost) {
    score += helperCost;
    money -= helperCost;
    helperCost = Math.ceil(helperCost * 1.5);
    autoClickers.push(new Helper());
    updateHelperCost();
    updateScore();
  }
}


document.getElementById("buyGunButton").addEventListener("click", handleBuyGun);


function handleBuyGun() {
  if (money >= buyGunCost) {
    score += buyGunCost;
    money -= buyGunCost;
    buyGunCost = Math.ceil(buyGunCost * 1.5);
    autoClickers.push(new Gun());
    updateBuyGunCost();
    updateScore();
  }
}


function autoButtonClick() {
  if (document.getElementById("autoClickUpgradeButton").checked) {
    handleUpgrade();
  }
  if (document.getElementById("autoClickSummonHelperButton").checked) {
    handleSummonHelper();
  }
  if (document.getElementById("autoClickBuyGunButton").checked) {
    handleBuyGun();
  }
}


setInterval(executeAutoClick, 1);
setInterval(autoButtonClick, 1);


binaryModeE.addEventListener("change", () => {
  updateScore();
  updateUpgradeCost();
  updateHelperCost();
  updateBuyGunCost();
});
