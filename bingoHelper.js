/*global module: true, console:true*/
'use strict';
var keys = ['B', 'I', 'N', 'G', 'O'];
module.exports = {

	process : function(num, card) {
		var changed = false,
			entries = card[num.charAt(0)];
		num = num.slice(1);
		for(var i=0; i< 5; i++) {
			if (entries[i] == num){
				entries[i] = -1;
				changed = true;
			}
		}
		console.info("card:", card);
		return changed;
	},

	checkHorizontal:function(card) {
		var i = 0,
			numBingo = 0;
		function check(key) {
			var isBingo = true;
			for (i=0;i < 5; i++) {
				if(card[key][i] !== -1) {
					isBingo = false;
					break;
				}
			}
			return isBingo;
		}
		keys.forEach(function(key) {
			if(check(key)){
				++numBingo;
			}
		});
		return numBingo;

	},

	checkVertical:function(card) {
		var i,
			numBingo =0;
		function check(idx) {
			var isBingo = true,
				i;
			for (i=0;i < 5; i++) {

				if(card[keys[i]][idx] !== -1) {
					isBingo = false;
					break;
				}
			}
			return isBingo;
		}
		for(i=0; i<5; i++) {
			if(check(i)) {
				++numBingo;
			}
		}
		return numBingo;
	},

	checkDiagonal:function(card) {
		var numBingo = 0;
		if(card['B'][0] === -1 &&
			card['I'][1] === -1 &&
			card['N'][2] === -1 &&
			card['G'][3] === -1 &&
			card['O'][4] === -1) {
			++numBingo;
		}

		if(card['B'][4] === -1 &&
			card['I'][3] === -1 &&
			card['N'][2] === -1 &&
			card['G'][1] === -1 &&
			card['O'][0] === -1) {
			++numBingo;
		}
		return numBingo;
	}
};