
var bingo = require("./bingoHelper"),
	assert = require("assert");
	

describe('Bingo tests', function () {
	var card ,
		client = {
			emit: function() {
				console.info("BINGO!!!");
			}
		};
	before(function() {
		card = {
				"B":[2,6,11,12,18],
				"I":[20,28,30,34,35],
				"N":[39,44,46,48,53],
				"G":[57,62,64,68,69],
				"O":[73,74,81,84,90]
			};
	});
	it('should mark the right field', function () {
			var number = "O90",
				changed = bingo.process(number, card);
			assert.equal(changed, false);
	});

	it('should not mark any field', function () {
			var number = "B16",
				changed = bingo.process(number, card);
			assert.equal(changed, false);
	});

	it('should check for horizontal correctly', function() {
		card = {
				"B":[2,6,11,12,18],
				"I":[20,28,30,34,35],
				"N":[-1,-1,-1,-1,-1],
				"G":[57,62,64,68,69],
				"O":[73,74,81,84,90]
			};
		var num = bingo.checkHorizontal(card);
		assert.equal(num, 1);

	});

	it('should check for horizontal and fail', function() {
		card = {
				"B":[2,6,11,12,18],
				"I":[20,28,30,34,35],
				"N":[-1,-1,-1,-1,39],
				"G":[57,62,64,68,69],
				"O":[73,74,81,84,90]
			};
		var num = bingo.checkHorizontal(card);
		assert.equal(num, 0);

	});


	it("should check for vertical correctly", function(){
		card = {
			"B":[2,6,11,12,-1],
			"I":[20,28,30,34,-1],
			"N":[39,44,46,48,-1],
			"G":[57,62,64,68,-1],
			"O":[73,74,81,84,-1]
		};
		var num = bingo.checkVertical(card);
		assert.equal(num, 1);
		//console.info("Bingo times ", num);
	});


	it("should check for vertical and fail", function(){
		card = {
			"B":[2,6,11,12,-1],
			"I":[20,28,30,34,-1],
			"N":[39,44,46,48,-1],
			"G":[57,62,64,68,-1],
			"O":[73,74,81,84,63]
		};
		var num = bingo.checkVertical(card);
		//console.info("Bingo times ", num);
		assert.equal(num, 0);
	});

	it('should check for diagonal correctly', function() {
		card = {
			"B":[2,6,11,12,-1],
			"I":[20,28,30,-1,35],
			"N":[39,44,-1,48,53],
			"G":[57,-1,64,68,69],
			"O":[-1,74,81,84,90]
		};
		var num = bingo.checkDiagonal(card);
		assert.equal(num, 1);
	});

	it('should check for diagonal and fail', function() {
		card = {
			"B":[2,6,11,12,-1],
			"I":[20,28,30,-1,35],
			"N":[39,44,-1,48,53],
			"G":[57,-1,64,68,69],
			"O":[71,74,81,84,90]
		};
		var num = bingo.checkDiagonal(card);
		assert.equal(num, 0);
	});

});