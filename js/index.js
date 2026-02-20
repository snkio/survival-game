const mainText = document.querySelector('.h1__text')
const hpStatus = document.querySelector('#hp-status')
const hpPotions = document.querySelector('#potions')
const potionsMount = document.querySelector('#potionsMount')
const gameStatus = document.querySelector('#status')
const gameScore = document.querySelector('#score')
const gameEnd = document.querySelector('#end')
const gameRestart = document.querySelector('#restartGame')
const playBtn = document.querySelector('#playGame')
const PLAYER = {
	hp: 100,
	score: 0,
	hppotions: 5
}

gameRestart.addEventListener('click', () => {
	location.reload()
})

hpPotions.addEventListener('click', () => {
	if (PLAYER.hppotions <= 0) {
		PLAYER.hppotions = 0
		gameStatus.textContent = `У вас не хватает зелий восстановления`
		return
	}

	if (PLAYER.hp >= 75) {
		gameStatus.textContent = 'Поберегите зелья!'
		return
	}

	PLAYER.hp += 25
	PLAYER.hppotions--

	if (PLAYER.hp > 100) {
		PLAYER.hp = 100
	}

	gameStatus.textContent = `Вы выпили зелье! Осталось еще: ${PLAYER.hppotions}`

	hpStatus.textContent = PLAYER.hp
	potionsMount.textContent = `Зелий здоровья: ${PLAYER.hppotions}`
})

playBtn.addEventListener('click', () => {
	playBtn.textContent = 'Продолжить'

	const CHANCE = Math.random()
	const DAMAGE = () => Math.floor(Math.random() * 15) + 1


	mainText.style.display = 'block'
	gameScore.style.display = 'block'
	gameStatus.style.display = 'block'
	hpPotions.style.display = 'block'
	potionsMount.style.display = 'block'


	if (CHANCE < 0.1) {
		gameStatus.textContent = 'Вы смогли отбиться от противнка, идем дальше!'
		PLAYER.score += 50
	} else if (CHANCE < 0.3) {
		const dmg = DAMAGE()
		gameStatus.textContent = `На вас напали! Потеряно: ${dmg} HP`
		PLAYER.hp -= dmg
		PLAYER.score += 5
	} else {
		gameStatus.textContent = 'На пути никого. Спокойно...'
		PLAYER.score += 15
	}


	gameScore.textContent = `Ваш счёт: ${PLAYER.score}`
	hpStatus.textContent = PLAYER.hp

	if (PLAYER.score >= 500 && !PLAYER.reward500) {
		PLAYER.hppotions++
		PLAYER.reward500 = true
		gameStatus.textContent = 'Награда за 500 очков: 1 зелье!'
	}

	potionsMount.textContent = `Зелий здоровья: ${PLAYER.hppotions}`

	if (PLAYER.hp <= 15) {
		gameStatus.textContent = 'Генерал решил вас перевести в госпиталь вы были слишком ранены'
		mainText.style.display = 'none'
		gameScore.style.display = 'none'
		playBtn.style.display = 'none'
		hpPotions.style.display = 'none'
		potionsMount.style.display = 'none'

		gameRestart.style.display = 'block'

		gameEnd.textContent = `Игра закончена ваш итоговый счёт: ${PLAYER.score}`
		return
	}

})

