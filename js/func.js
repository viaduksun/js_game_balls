
//  ============================================
// СОЗДАНИЕ СТАРТБЛОКА (ЗАГЛУШКИ)
// ============================================
function createStartblock() {
	// СОЗДАНИЕ <div id="startblock_id">
	startblock = document.createElement("div");
	startblock.id = "startblock_id";
	startbutton = document.createElement("button");
	startbutton.id = "startbutton_id";
	startbutton.innerText = "СТАРТ";

	div = document.createElement("div");
	div.id = "helloPhrase";
	div.innerText = "Привет! Ваша цель набрать " + gamePointsGoal + " очков и не упустить ни одного шарика! Вперед!";

	startblock.appendChild(startbutton);
	startblock.appendChild(div);
	gamefield.appendChild(startblock);


	// КЛИК ПО КНОПКЕ СТАРТ
	startbutton.onclick = startGame;
}

// =============================================
//         СОЗДАНИЕ ИНФОБЛОКА
// =============================================
function createinfoblock() {
	var h2 = document.createElement("h2");
	infoblock.appendChild(h2);
	h2.innerText = "game time:";
	timer = document.createElement("span");
	timer.id = "timer";
	timer.innerText = "20";
	h2.appendChild(timer);
}
// ============================================
//        СОЗДАНИЕ СЧЕТЧИКА ОЧКОВ
// ============================================
function pointscreate() {
	gamepoints = document.createElement("div");
	gamepoints.id = "pointsid";
	gamepoints.innerText = pointsNumber;
	gamefield.appendChild(gamepoints);
}
//  ==========================================
// СОЗДАНИЕ lifesNumbermax = 7 ЖИЗНЕЙ
// ==========================================
function createlifes() {
	lifes = document.createElement("div");
	lifes.id = "lifesid";
	gamefield.appendChild(lifes);

	var lifesNumberCurrent = 0;
	while (lifesNumberCurrent < lifescount) {
		var span = document.createElement("span");
		span.id = "lifescountid";
		lifes.appendChild(span);
		lifesNumberCurrent = lifesNumberCurrent + 1
	}
}

// ========================================
//       ФУНКЦИЯ ТАЙМЕРА / СТОП ИГРА
// ========================================
function timerIgra() {
	var clock = setInterval(function () {
		timer.innerText = timer.innerText - 1;

		if (timer.innerText == 0 || lifescount == 0 || pointsNumber == gamePointsGoal) {
			clearInterval(clock);
			gameover();
		}
		if (pointsNumber == gamePointsGoal) {
			clearInterval(clock);
			gameover();
		}

	}, 1000);

}
// =================================================
// РАНДОМЫ
// ================================================
//  ПОЛУЧАЕМ СЛУЧАЙНОЕ ЧИСЛО ОТ 1 ДО (max)
function random(max) {
	var rand = 1 + Math.random() * (max + 1)
	rand = Math.floor(rand);
	return rand;
}
//  ПОЛУЧАЕМ СЛУЧАЙНОЕ ЧИСЛО ОЧКОВ
function randomp(max) {
	var randp = Math.random() * (max + 1)
	randp = Math.floor(randp);
	return randp;
}
// ==============================================
//      СОЗДАНИЕ ШАРИКА В ИГРОВОМ ПОЛЕ
// ==============================================
function createball() {
	var ball = document.createElement("div");

	var side = random(2); // 1 = left 2 = right
	if (side == 1) {
		ball.className = "ball left";
	} else {
		ball.className = "ball right";
	}


	// =============================================
	//          КЛИК ПО ШАРИКУ
	// =============================================
	ball.onmousemove = function () {
		// это для предотвращения повторных кликов на том же шарике
		if (ball.className != "ball dead") {
			// ПОДВЯЗКА СЧЕТА ОЧКОВ
			pointsNumber = pointsNumber + 1;
			gamepoints.innerText = pointsNumber;
			ball.style.opacity = "0";

			setTimeout(function () {
				// УДАЛЕНИЕ ШАРИКА
				ball.remove();
				// ПРОВЕРЯЕМ ЕСТЬ ЛИ ШАРИКИ НА ПОЛЕ
				var ballexist = document.querySelector(".ball")
				if (ballexist == null) {
					// ЕСЛИ ШАРОВ НЕТ СОЗДАЕМ СЛУЧАЙНОЕ ЧИСЛО ШАРОВ
					var ballNumbermax = random(5);
					var ballNumberCurrent = 0;

					while (ballNumberCurrent < ballNumbermax) {
						createball();
						ballNumberCurrent = ballNumberCurrent + 1;
					}
				}
			}, 1000);
			ball.className = "ball dead"
		}
	};
	// ----------------КОНЕЦ СОБЫТИЯ ONCLICK-----------------------
	setTimeout(function () {
		ball.style.top = random(350) + "px";
		ball.style.left = random(550) + "px";
	}, 200);
	// ПАДЕНИЕ ШАРИКА И ЕГО УДАЛЕНИЕ
	setTimeout(function () {
		ball.style.transition = "all 0.5s";
		// ФУНКЦИЯ ПАДЕНИЯ ШАРИКА
		var ball_lifetime = setInterval(function () {
			ball.style.top = ball.offsetTop + 200 + "px";
			// ЕСЛИ ШАРИК ВЫШЕЛ ЗА ПРЕДЕЛЫ ПОЛЯ ТО УДАЛЯЕМ И СОЗДАЕМ НОВЫЙ
			if (ball.offsetTop > 450) {
				ball.remove();
				// УМЕНЬШАЕМ КОЛИЧЕСТВО ЖИЗНЕЙ
				lifescount = lifescount - 1;
				lifesRemove();
				createlifes();
				createball();
				// УДАЛЯЕМ ТАЙМЕР
				clearInterval(ball_lifetime);
			}
			// уменьшили до 10 так как падал очень медленно
		}, 10)

	}, 1000);


	// ПРОВЕРКА ГЛОБАЛЬНОГО СТАТУСА ИГРЫ (ЕСЛИ НЕ ВЫКЛ ТО СОЗДАЕМ ШАРИК)
	if (gamestatus != "game_off") {
		gamefield.appendChild(ball);
	}
}
// ===========================================================
// ПАНЕЛЬ СТОП ИГРА
// ==========================================================
function gameoverPanelCreate() {
	var gameStopPanel = document.createElement("div");
	gameStopPanel.id = "gameover-panel";
	gamefield.appendChild(gameStopPanel);

	var gameoverbutton = document.createElement("button");
	gameoverbutton.id = "gameover-button";
	gameoverbutton.innerText = "GAME OVER (restart)";
	gameStopPanel.appendChild(gameoverbutton);

	var yourpoints = document.createElement("div");
	yourpoints.id = "yourpoints_id"
	yourpoints.innerText = "Победа! Вы набрали: " + pointsNumber + " очков!";
	if (pointsNumber == 20) {
		gameStopPanel.appendChild(yourpoints);
	}


	var yourpoints = document.createElement("div");
	yourpoints.id = "yourpoints_id"
	yourpoints.innerText = "Упс...Ваше время истекло, попробуйте еще раз!";
	if (timer.innerText == 0) {
		gameStopPanel.appendChild(yourpoints);
	}


	var yourpoints = document.createElement("div");
	yourpoints.id = "yourpoints_id"
	yourpoints.innerText = "Упс...Вы упустили 3 шарика. Попробуйте еще раз!";
	if (lifescount == 0) {
		gameStopPanel.appendChild(yourpoints);
	}

	// "Your points: " + pointsNumber + " ";	
	//клик по геймовербатон перезапускает игру
	gameoverbutton.onclick = gameRestart;
}

// Функция для обновления страницы при клике на кнопку завершения игры
function gameRestart() {
	location.reload()
}

// =============================================
//       УДАЛЕНИЕ ЭЛЕМЕНТОВ
// =============================================
function startblockremove() {
	startblock.remove();
}
function lifesRemove() {
	lifes.remove();
}
function pointsRemove() {
	gamepoints.remove();
}
function gameFieldClearing() {
	gamefield.innerText = "";
}

function gameover() {
	gamestatus = "game_off";
	lifesRemove();
	pointsRemove();
	gameFieldClearing();
	gameoverPanelCreate();
}