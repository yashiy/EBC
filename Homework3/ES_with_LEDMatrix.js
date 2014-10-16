var b = require('bonescript');
var util = require('util');
var i2c = require('i2c');
var address = 0x70;
var wire = new i2c(0x70, {device: '/dev/i2c-1'});

//setUp LED
wire.writeBytes(0x21, 0x00);
wire.writeBytes(0x81, 0x00);
wire.writeBytes(0xE7, 0x00);

//clear LED
for(var i=0; i<16; i+=2){
	wire.writeBytes(i, [{},{}]);
}

//Initialize 2darray

var grid = new Array(8);
var xPos = 0;
var yPos = 0;

for (var i = 0; i < grid.length; i++){
        grid[i] = new Array(8);
        for(var j = 0; j < grid[i].length; j++){
                grid [i][j] = ' ';
        }
}

var button1 = 'P8_19';
var button2 = 'P8_15';
var button3 = 'P8_11';
var button4 = 'P8_17';

var led1= 'P8_13';
var led2= 'P8_24';
var led3= 'P8_12';
var led4= 'P8_18';

b.pinMode(button1, b.INPUT, 7, 'pulldown');
b.pinMode(button2, b.INPUT, 7, 'pulldown');
b.pinMode(button3, b.INPUT, 7, 'pulldown');
b.pinMode(button4, b.INPUT, 7, 'pulldown');

b.pinMode(led1, b.OUTPUT);
b.pinMode(led2, b.OUTPUT);
b.pinMode(led3, b.OUTPUT);
b.pinMode(led4, b.OUTPUT);

b.attachInterrupt(button1, true, b.CHANGE, checkButtonUp);
b.attachInterrupt(button2, true, b.CHANGE, checkButtonLeft);
b.attachInterrupt(button3, true, b.CHANGE, checkButtonDown);
b.attachInterrupt(button4, true, b.CHANGE, checkButtonRight);

function printGrid(grid){
        util.print(' 0 1 2 3 4 5 6 7 \n');
        for (var i = 0; i < grid.length; i++){
                util.print(util.format("%d: ", i));
                for(var j = 0; j<grid[i].length; j++){
                        util.print(util.format("%s ", grid[i][j]));
                }
                util.print("\n");
        }
}

printGrid(grid);

function checkButtonUp(x) {

        if( yPos < 0 ){
                yPos = 0;
        }else{
                yPos = yPos - 1;
        }
        wire.writeBytes(yPos, [0x00, Math.pow(2,xPos)]);


//        //b.digitalWrite('P8_13', b.HIGH);
//        grid[yPos][xPos] = '*';
//        yPos = yPos - 1;
//        if ( yPos < 0 ){
//                yPos = 0;
//        }
//        grid[yPos][xPos] = '+';
//        printGrid(grid);
}

function checkButtonLeft(x) {
        if( xPos < 0 ){
                xPos = 0;
        }else{
                xPos = xPos - 1;
        }
        wire.writeBytes(yPos, [0x00, Math.pow(2,xPos)]);


//        grid[yPos][xPos] = '*';
//        xPos = xPos - 1;
//        if ( xPos < 0 ){
//                xPos = 0;
//        }
//        grid[yPos][xPos] = '+';
//        printGrid(grid);
}

function checkButtonDown(x) {
        if( yPos > 7 ){
                yPos = 7;
        }else{
                yPos = yPos + 1;
        }
        wire.writeBytes(yPos, [0x00, Math.pow(2,xPos)]);


//        grid[yPos][xPos] = '*';
//        yPos = yPos + 1;
//        if ( yPos > 7 ){
//                yPos = 7;
//        }
//        grid[yPos][xPos] = '+';
//        printGrid(grid);

}

function checkButtonRight(x) {
	
	if( xPos > 7 ){
		xPos = 7;
	}else{
		xPos = xPos + 1;
	}
	wire.writeBytes(yPos, [0x00, Math.pow(2,xPos)]);

//       grid[yPos][xPos] = '*';
//        xPos = xPos + 1;
//        if ( xPos > 7 ){
//                xPos = 7;
//        }
//        grid[yPos][xPos] = '+';
//        printGrid(grid);

}

