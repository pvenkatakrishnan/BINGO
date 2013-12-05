/*global require: true, global module: true, console:true*/
'use strict';
var io = require("socket.io-client"),
	bingo = require("./bingoHelper");

var client = io.connect('ws://yahoobingo.herokuapp.com');
var card;

function emitBingo(numTimes) {
	var i;
	for (i=0; i < numTimes; i++) {
		client.emit('bingo');
	}
}

function decideIfBingo() {
	var numBingo,
		i;
	//check horizontal
	numBingo = bingo.checkHorizontal(card);
	emitBingo(numBingo);

	//check for vertical
	numBingo = bingo.checkVertical(card);
	emitBingo(numBingo);

	//check for diagonal
	bingo.checkDiagonal(card);
	emitBingo(numBingo);
}



client.emit('register', {
	name: 'Poornima Venkatakrishnan',
	email: 'poo.leo@gmail.com',
	url: 'https://github.com/pvenkatakrishnan/BINGO'
});


client.on('connect', function () {
	console.info("connected to the server");
});

client.on('card', function (payload) {
	//console.info("payload: ", payload);
	card = payload.slots;
	console.info("slots:" + JSON.stringify(card));
	client.on('number', function (number) {
		console.info("Received number:" + number);
		bingo.process(number, card);
		decideIfBingo();
	});
});


client.on('win', function (message) {
	console.info("I won:" + message);
});

client.on('lose', function (message) {
	console.info("I lost:" + message);
});

client.on('disconnect', function () {
	console.info("I have been disconnected from Bingo server");
});

