 /*************************************************************
 *           Thesh Ooter's Roman Numeral Convertor            *
 *                                                            *
 * For converting between integers and Roman Numerals as well *
 * as checking the validity of Roman Numerals and correcting  *
 * some common Roman Numeral mistakes.                        *
 *                                                            *
 * This script should work with any web browser that supports *
 * ECMAScript V3 (specifically try and catch) and the DOM2    *
 * method 'getElementById()'; this has been tested to work    *
 * in IE5+ and Mozilla 1.7 (although it should work with      *
 * earlier versions, it is untesed) as well as Opera 7.5. I   *
 * do not have access to a KHTML based browser like Safari or *
 * Konqueror, but I expect this to work in recent versions.   *
 *                                                            *
 * This script was written by Scott Hulberg (AKA Thesh Ooter) *
 * scott_hulberg@yahoo.com                                    *
 *************************************************************/

var undefined; //needed for this to work in IE5

 /***********************************
 * These first arrays are used by   *
 * the functions which convert      *
 * roman numerals into integers.    *
 ***********************************/

var counter = new Array(7);

var romans = new Array(7);
romans["I"] = 1;
romans["V"] = 5;
romans["X"] = 10;
romans["L"] = 50;
romans["C"] = 100;
romans["D"] = 500;
romans["M"] = 1000;

var subs = new Array(4);
subs["I"] = true;
subs["X"] = true;
subs["C"] = true;
subs["M"] = true;

 /***********************************
 * This next array stores the data  *
 * needed to convert integers into  *
 * roman numerals.                  *
 ***********************************/

var getChar = new Array(7);
getChar[0] = "I";
getChar[1] = "V";
getChar[2] = "X";
getChar[3] = "L";
getChar[4] = "C";
getChar[5] = "D";
getChar[6] = "M";

 /***********************************
 * This first function is a pretty  *
 * simple and generic function used *
 * to define and throw errors       *
 ***********************************/

 function createError(ErrorName, ErrorMessage) {
	 var theError = new Error();
	 theError.name = ErrorName;
	 theError.message = ErrorMessage;
	 throw theError;
 }

 /***********************************
 * These next four functions are    *
 * used to test for errors in the   *
 * input and convert roman numerals *
 * into integers.                   *
 ***********************************/

function checkRom(Rcur, Rnext, lSub, n, l) {
	if ((romans[Rcur] == undefined) || ((romans[Rnext] == undefined) && ((n + 1) < l))) {
		createError("InputError", "Bukan Angka romawi");
	}
	else if (romans[Rcur] >= lSub) {
		createError("InputError", "Tak satu Angkapun dibentuk");
	}
}

function testSub(cR, nR, pR) {
	if (romans[cR] < romans[nR]) {
		if ((romans[pR] == romans[nR]) && (subs[nR] != true)) {
			createError("InputError", "Tak satu Angkapun dibentuk");
		}
		else if ((subs[cR] == true) && (10*romans[cR] >= romans[nR])) {
			return true;
		}
		else {
			createError("InputError", "Tak satu Angkapun dibentuk");
		}
	}
	return false;
}

function testRom(rome) {
	if (counter[rome] < 3) {
		return true;
	}
	else {
		createError("InputError", "Tak satu Angkapun dibentuk");
	}
	return false;
}

function parseRomanToInt(rNumb, strict) {
	counter["I"] = 0;
	counter["V"] = 2;
	counter["X"] = 0;
	counter["L"] = 2;
	counter["C"] = 0;
	counter["D"] = 2;
	counter["M"] = Number.NEGATIVE_INFINITY;
	var intNumb = 0;
	var lastNumb = Number.POSITIVE_INFINITY;
	var thisNumb = 0;
	var lastSub = Number.POSITIVE_INFINITY;
	rNumb = rNumb.toString().toUpperCase()
	for (var i=0; i<rNumb.length; i++) {
		var currentR = rNumb.charAt(i);
		var nextR = rNumb.charAt(i + 1);
		var prevR = rNumb.charAt(i - 1);
		try {
			if (strict != false) {
				checkRom(currentR, nextR, lastSub, i, rNumb.length);
				if (testSub(currentR, nextR, prevR) == true) {
					thisNumb = (romans[nextR] - romans[currentR]);
					i++;
					lastSub = romans[currentR];
				}
				else if (testRom(currentR) == true){
					thisNumb = romans[currentR];
					counter[currentR]++;
				}
				if (thisNumb > lastNumb) {
					createError("InputError", "Tak satu Angkapun dibentuk");
				}
				else {
					intNumb += thisNumb;
					lastNumb = thisNumb;
				}
			}
			else {
				if ((romans[currentR] == undefined) || ((romans[nextR] == undefined) && ((i + 1) < rNumb.length))) {
					createError("InputError", "Bukan angka romawi");
				}
				else if (romans[currentR] < romans[nextR]) {
					thisNumb = (romans[nextR] - romans[currentR]);
					i++;
				}
				else {
					thisNumb = romans[currentR];
				}
				intNumb += thisNumb;
			}
		}

		catch(e) {
			intNumb = e.name + ": " + e.message;
			break;
		}
	}
	return intNumb;
}

 /***********************************
 * The next two functions are used  *
 * for converting an integer into a *
 * roman Numeral.                   *
 ***********************************/

function ints(pos, iValue) {
	var charValue = "";
	var s = 2*pos;
	if (pos > 2) {
		for (var i=0; i<iValue*Math.pow(10,(pos-3)); i++) {
			charValue += "M";
		}
	}
	else if (iValue < 4) {
		for (var i=0; i<iValue; i++) {
			charValue += getChar[s];
		}
	}
	else if (iValue == 4) {
		charValue = getChar[s] + getChar[s+1];
	}
	else if (iValue < 9) {
		charValue = getChar[s+1];
		for (var i=0; i<iValue-5; i++) {
			charValue += getChar[s];
		}
	}
	else if (iValue == 9) {
		charValue = getChar[s] + getChar[s+2];
	}
	return new String(charValue);
}

function parseIntToRoman(intNumb, whichError) {
	var romNumb;
	var romNumbFinal = "";
	if ((parseInt(intNumb, 10) != intNumb) || (parseInt(intNumb,10) < 0)) {
		try {		
			if (whichError == 0) {
				createError("InputError", "Tidak mampu membuat bilangan Romawi yang valid");
			}
			else {
				createError("InputError", "Bukan bilangan positif");
			}
		}
		catch(err) {
			romNumbFinal = err.name.toString() + ": " + err.message.toString();
		}
	}
	else {
		intNumb = parseInt(intNumb, 10).toString();
		for (var k=0; k<intNumb.length; k++) {
			var currentI = parseInt(intNumb.charAt(intNumb.length - (k + 1)));
			romNumb = romNumbFinal;
			romNumbFinal = ints(k, currentI) + romNumb;
		}
	}
	return romNumbFinal;
}

 /***********************************
 * These next functions are used to *
 * interact with the input in the   *
 * forms in the page - modify as    *
 * needed.                          *
 ***********************************/
function convertRoman() {
	var rominput = document.getElementById("roman").value;
	document.getElementById("number").value = parseRomanToInt(rominput, true);
}
function convertToRoman() {
	var intput = document.getElementById("number").value;
	document.getElementById("roman").value = parseIntToRoman(intput, 1);
}
//The next function should fix common mistakes, and at least put out a valid numeral
function correctRoman() {
	var wrongput = document.getElementById("roman2").value;
	document.getElementById("roman").value = parseIntToRoman(parseRomanToInt(wrongput, false), 0);
}
