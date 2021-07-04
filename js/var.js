// Переменная на игровое поле
var gamefield = document.querySelector("#gamefield");
//жизни
var lifes = null;
var lifescount = 3;
//очки на игровом поле
var gamepoints = null;

var timer = null;
//Стартовая панель 
var gameoverpanel = document.querySelector("#gameover-panel");
var gameoverbutton = document.querySelector("#gameover-button");

//переменная для счета очков
var pointsNumber = 0;
var gamePointsGoal = 20;

var gamestatus = "start";
//Стартовая панель
var startblock = null;
var startbutton = null;

var infoblock = document.querySelector("#infoblock");
