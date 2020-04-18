const robot = require('robotjs');
const runescape = require('../runescapeModule/runescapeModule')


exports.rotateCameraRandom = function () {
    return rotateCameraRandom();
}

function rotateCameraRandom() {
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


exports.findBank = function () {
    return findBank();
}

function findBank() {
    //makes camera point north
    robot.moveMouseSmooth(1712 + getRandomInt(0, 23), 35 + getRandomInt(0, 20));
    robot.mouseClick();
    const bankColor = "e9ce4b";

    let img = robot.screen.capture(runescape.compassSearchArea.x, runescape.compassSearchArea.y, runescape.compassSearchArea.width, runescape.compassSearchArea.height);

    for (let i = 0; i < runescape.compassSearchArea.width - 1; i++) {
        for (let j = 0; j < runescape.compassSearchArea.height - 1; j++) {
            let foundColors = img.colorAt(i, j);
            if (bankColor === foundColors) {
                //console.log("found bank");
                return {
                    x: i + runescape.compassSearchArea.x,
                    y: j + runescape.compassSearchArea.y
                };

            }
        }
    }
    return false;
}

exports.goToBank = function (bankX, bankY) {
    return goToBank(bankX, bankY);
}

function goToBank(bankX, bankY) {


    robot.moveMouseSmooth(bankX, (bankY));
    robot.mouseClick();
    console.log("going to bank");
    // wait time to get to bank
    sleep(10000 + getRandomInt(10, 2500));


}

exports.checkInventoryFull = function () {
    return checkInventoryFull();
}

function checkInventoryFull() {
    let inventoryNotFullColor = "3e3529";
    let detectedColor = robot.getPixelColor(1794, 1024);

    return inventoryNotFullColor === detectedColor;

}

exports.bankingProcess = function (bankArea) {
    if (!checkInventoryFull()) {
        console.log('The inventory is full');
        let bank = findBank();

        if (bank === false) {
            rotateCameraRandom();
            console.log('no bank could be found')
        } else {
            goToBank(bank.x, bank.y);
            return deposit(bankArea.bankDepositSearchAreaX, bankArea.bankDepositSearchAreaY, bankArea.bankDepositSearchAreaWidth, bankArea.bankDepositSearchAreaHeight);
        }


    }
}


//moves the camera in a standard position and then attempts to find a deposit box in the provided area
//if it finds a deposit box it will deposit everything in the inventory except for the last slot
//currently does not support stacked items!
exports.deposit = function (x, y, width, height) {
    return deposit(x, y, width, height);
}

function deposit(x, y, width, height) {
    {

        console.log("moving to deposit box");
        // first make sure the camera is pointing north for consistency
        robot.moveMouseSmooth(1712 + getRandomInt(0, 23), 35 + getRandomInt(0, 20), getRandomInt(1, 10));
        robot.mouseClick();
        //also scroll out for max zoom
        robot.moveMouseSmooth(1100 + getRandomInt(0, 500), 200 + getRandomInt(1, 500), getRandomInt(1, 10));
        robot.scrollMouse(50, -10);
        //hold up arrow to get top view
        robot.keyToggle("up", "down");
        sleep(3500 + getRandomInt(0, 500));
        robot.keyToggle('up', 'up');

        //then click on deposit box
        let img = robot.screen.capture(x, y, width, height);
        let foundDeposit = false;
        let depositTries = 0;

        const colorsDepositBox = ["483305", "563c05", "433005", "6f6666"];
        while (!foundDeposit) {
            for (let i = 0; i < 1000; i++) {
                let random_x = getRandomInt(0, width - 1);
                let random_y = getRandomInt(0, height - 1);
                let sample_color = img.colorAt(random_x, random_y);

                if (colorsDepositBox.includes(sample_color)) {
                    let screen_x = random_x + x;
                    let screen_y = random_y + y;

                    robot.moveMouseSmooth(screen_x, screen_y)
                    let blueText = countNumberOfBluePixels();
                    if (blueText > 20) {
                        foundDeposit = true;
                        console.log("found deposit box");

                        //move mouse to deposit box
                        robot.moveMouseSmooth(screen_x, screen_y);
                        //wait a moment
                        sleep(300);
                        robot.mouseClick();
                        break;
                    }

                }
            }

            if (!foundDeposit) {
                console.log("did not find deposit box");
                depositTries++;
                if (depositTries >= 5) {
                    return false;

                }
            }


        }


        sleep(5000)
        console.log("depositing");
        //then deposit all except for the last  item in inventory
        robot.moveMouseSmooth(928, 516);
        let count = 0;
        while (count <= 27 + getRandomInt(0, 5)) {
            robot.mouseClick();
            sleep(200 + getRandomInt(100, 500))
            count++;
        }
        console.log("deposited all but one item");
        return true;
    }
}

//Logs out
exports.logOut = function () {
    robot.moveMouseSmooth(1751 + getRandomInt(0, 20), 1047 + getRandomInt(0, 20), getRandomInt(0, 5));
    sleep(500 + getRandomInt(0, 500));
    robot.mouseClick();
    robot.moveMouseSmooth(1700 + getRandomInt(0, 127), 989 + getRandomInt(0, 21), getRandomInt(0, 5));
    robot.mouseClick();

}

//logs in with the  given password if the username has been saved
exports.logIn = function (password) {
    robot.moveMouseSmooth(986 + getRandomInt(0, 131), 299 + getRandomInt(0, 27), getRandomInt(0, 10));
    robot.mouseClick();
    robot.typeStringDelayed(password, getRandomInt(160, 250));
    robot.keyTap('enter');
}


/* Non--specific use case functions and variables go below here i.e sleep() and getRandomInt()



 */

//multiply by this to get a random number of minutes (used in log in and out times)
exports.oneMinuteInMilliSeconds = 60000;

//returns true if it detects an item in the last indicated spot of the inventory
exports.detectInventory = function (start, stop) {
    return detectInventory(start, stop);
}

function detectInventory(start, stop) {

    for (let i = start; i <= stop; i++) {

        let x = runescape.inventorySpaceCenterCoords[i].x;
        let y = runescape.inventorySpaceCenterCoords[i].y;

        let invColor = robot.getPixelColor(x, y);

        if (runescape.emptyInventoryColors.includes(invColor)) {
            //console.log('inventory spot:'+ i + 'empty');
            console.log(invColor);
        } else {
            // console.log('inventory spot:'+ i + 'contains item');
            //console.log(invColor);
        }
    }

    let lastX = runescape.inventorySpaceCenterCoords[stop].x;
    let lastY = runescape.inventorySpaceCenterCoords[stop].y;

    let lastInvColor = robot.getPixelColor(lastX, lastY);

    return !runescape.emptyInventoryColors.includes(lastInvColor);


}

exports.dropInventory = function (start, stop) {
    return dropInventory(start, stop);
}

function dropInventory(start, stop) {
    robot.keyToggle('shift', 'down');
    sleep(2000 + getRandomInt(11, 200));

    for (let i = start; i <= stop; i++) {


        robot.keyToggle('shift', 'down');

        let x = runescape.inventorySpaceCoords[i].x;
        let y = runescape.inventorySpaceCoords[i].y;

        robot.moveMouseSmooth(x, y, 4 + getRandomInt(0, 2));
        robot.mouseClick();
        sleep(200 + getRandomInt(11, 200));

    }
    robot.keyToggle('shift', 'up');

}

//function that allows for wait times between actions
exports.sleep = function (ms) {
    return sleep(ms);
}

function sleep(ms) {
    return Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

exports.getRandomInt = function (min, max) {
    return getRandomInt(min, max);
}

//basic function that return a  random value between the min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

exports.countNumberOfBluePixels = function () {
    return countNumberOfBluePixels();
}

function countNumberOfBluePixels() {
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
    //console.log("number of blue pixels is: " + numberOfBluePixels);
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
