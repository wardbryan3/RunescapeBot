const robot = require('robotjs');


exports.rotateCamera = function () {
    let randomInt = getRandomInt(0, 5);

    switch (randomInt) {
        case 0:
            robot.keyToggle('right', 'down');
            sleep(200 + getRandomInt(0, 500));
            robot.keyToggle('right', 'up');
            break;
        case 1:
            robot.keyToggle('left', 'down');
            sleep(200 + getRandomInt(0, 500));
            robot.keyToggle('left', 'up');
            break;
        case 2:
            robot.keyToggle('down', 'down');
            sleep(1200 + getRandomInt(0, 500));
            robot.keyToggle('down', 'up');
            break;
        case 3:
            robot.keyToggle('right', 'down');
            sleep(1200 + getRandomInt(0, 500));
            robot.keyToggle('right', 'up');
            break;
        case 4:
            robot.keyToggle('right', 'down');
            sleep(2200 + getRandomInt(0, 500));
            robot.keyToggle('right', 'up');
            break;
        case 5:
            robot.keyToggle('left', 'down');
            sleep(2200 + getRandomInt(0, 500));
            robot.keyToggle('left', 'up');
            break;
    }

}

//borrowed function that allows for wait times between actions
exports.sleep = function (ms) {
    return sleep(ms);
}

function sleep(ms) {
    return Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

exports.getRandomInt = function (min, max) {
    return getRandomInt(min, max);
}


exports.countNumberOfBluePixels = function () {
    let numberOfBluePixels = 0
    const desiredHelpTextColors = createArrayOfHelpHex(0, 25, 190, 255, 190, 255);

    const x = 143, y = 28, width = 26, height = 10;

    let img = robot.screen.capture(x, y, width, height);

    let helpTextColor = robot.getPixelColor(167, 34);

    for (let i = 0; i < width - 1; i++) {
        for (let j = 0; j < height - 1; j++) {
            helpTextColor = img.colorAt(i, j);
            if (desiredHelpTextColors.includes(helpTextColor)) {
                numberOfBluePixels++;


            }

        }
    }
    console.log("number of blue pixels is: " + numberOfBluePixels);
    return numberOfBluePixels;
}

createArrayOfHelpHex = function (redStart, redEnd, greenStart, greenEnd, blueStart, blueEnd) {

    let desiredHelpTextColors = []
    //creating a range of hex

    for (var r = redStart; r <= redEnd; r++) {
        //all possible red values get looped through i.e 0 through 255

        for (var g = greenStart; g <= greenEnd; g++) {
            //all possible green values get looped through
            for (var b = blueStart; b <= blueEnd; b++) {
                //all possible blue values get looped through
                //and for each loop we add them to the desiredHelpTextColors array
                desiredHelpTextColors.push(rgbToHex(r, g, b,))
            }
        }

    }
    //console.dir(desiredHelpTextColors, {'maxArrayLength': null});
    //fs.writeFile("hugearray.txt", desiredHelpTextColors, function (err) {

    //});
    //and then return the array
    return desiredHelpTextColors;


}

//function that allows us to convert one color (r, g, or b) to its hex value
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

//concatenates r g and b and converts them to hex values
function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}


//basic function that return a  random value between the min and max
