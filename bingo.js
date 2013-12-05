var io = require("socket.io-client"),
	bingo = require("./bingoHelper");

var client = io.connect('ws://yahoobingo.herokuapp.com');
var card;

function emitBingo(numTimes) {
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
	email: 'pvenkatakrishnan@paypal.com',
	url: 'https://github.com/pvenkatakrishnan'
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


client.on('win', function () {
	console.info("I won");
});

client.on('lose', function () {
	console.info("I lost");
});

client.on('disconnect', function () {
	console.info("I have been disconnected from Bingo server");
});

