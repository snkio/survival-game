const gameName = document.querySelector(".h1__text");
const gitHub = document.querySelector("#github");
const hpText = document.querySelector(".hp__sec");
const hpStatus = document.querySelector("#hp-status");
const hpLine = document.querySelector("#hpline");
const hpStyle = document.querySelector(".hp__line");
const hpPotions = document.querySelector("#potions");
const potionsMount = document.querySelector("#potionsMount");
const gameStatus = document.querySelector("#status");
const gameScore = document.querySelector("#score");
const gameEnd = document.querySelector("#end");
const gameRestart = document.querySelector("#restartGame");
const playBtn = document.querySelector("#playGame");

const PLAYER = {
  hp: 100,
  score: 0,
  hppotions: 5,
  nextReward: 500,
};

gameRestart.addEventListener("click", () => {
  location.reload();
  console.log("Restart Page");
});

hpPotions.addEventListener("click", () => {
  if (PLAYER.hppotions <= 0) {
    PLAYER.hppotions = 0;
    gameStatus.textContent = `У вас не хватает зелий восстановления`;
    return;
  }

  if (PLAYER.hp >= 75) {
    gameStatus.textContent = "Поберегите зелья!";
    return;
  }

  PLAYER.hp += 25;
  PLAYER.hppotions--;

  if (PLAYER.hp > 100) {
    PLAYER.hp = 100;
  }

  gameStatus.textContent = `Вы выпили зелье! Осталось еще: ${PLAYER.hppotions}`;

  hpStatus.textContent = PLAYER.hp;
  hpLine.style.width = PLAYER.hp + "%";
  potionsMount.textContent = `Зелий здоровья: ${PLAYER.hppotions}`;
  console.log(`HP = ${PLAYER.hp}`);
});

playBtn.addEventListener("click", () => {
  playBtn.textContent = "Продолжить";

  const CHANCE = Math.random();
  const DAMAGE = () => Math.floor(Math.random() * 15) + 1;

  console.log("Clicked!");

  hpText.style.display = "flex";
  gameScore.style.display = "block";
  gameStatus.style.display = "block";
  hpPotions.style.display = "block";
  potionsMount.style.display = "block";
  gameName.style.display = "none";
  gitHub.style.display = "none";

  if (CHANCE < 0.1) {
    gameStatus.textContent = "Вы смогли отбиться от противника, идем дальше!";
    PLAYER.score += 50;
  } else if (CHANCE < 0.3) {
    const dmg = DAMAGE();
    gameStatus.textContent = `На вас напали! Потеряно: ${dmg} HP`;
    PLAYER.hp -= dmg;
    PLAYER.score += 5;
  } else {
    gameStatus.textContent = "На пути никого. Спокойно...";
    PLAYER.score += 15;
  }

  if (PLAYER.hp <= 30) {
    hpLine.style.background = "orange";
  }

  gameScore.textContent = `Ваш счёт: ${PLAYER.score}`;
  hpStatus.textContent = PLAYER.hp;
  hpLine.style.width = PLAYER.hp + "%";

  if (PLAYER.score >= PLAYER.nextReward) {
    PLAYER.hppotions++;
    PLAYER.nextReward += 500;
    gameStatus.textContent = "Вы получили зелье за каждые 500 очков";
  }

  potionsMount.textContent = `Зелий здоровья: ${PLAYER.hppotions}`;

  if (PLAYER.hp <= 15) {
    gameStatus.textContent =
      "Генерал решил вас перевести в госпиталь вы были слишком ранены";
    hpText.style.display = "none";
    gameScore.style.display = "none";
    playBtn.style.display = "none";
    hpPotions.style.display = "none";
    potionsMount.style.display = "none";
    gameName.style.display = "block";
    gitHub.style.display = "block";
    gameRestart.style.display = "block";
    gameEnd.textContent = `Игра закончена ваш итоговый счёт: ${PLAYER.score}`;
    console.log("LOSE!!!");
    return;
  }
});
