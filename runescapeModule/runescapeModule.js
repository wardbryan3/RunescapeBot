const robot = require('../node_modules/robotjs');
const botting = require('../bottingModule/bottingModule.js');


//search area for the compass in the top right corner;
exports.compassSearchArea = {
    x: 1752,
    y: 50,
    width: 100,
    height: 100
}

//search area for the deposit box in draynor bank
exports.draynor = {

    bankDepositSearchAreaX: 1010,
    bankDepositSearchAreaY: 550,
    bankDepositSearchAreaWidth: 400,
    bankDepositSearchAreaHeight: 600,

// trees types below this line
    trees: {
        colors: ["876436", "5b4324", "785830", "231a0d", "5e4526",/*light green*/"6f7d35"],

        bluePixelRange: bluePixels(51, 69),

        leaveBank: function () {
            robot.moveMouseSmooth(1836, 103);
            botting.sleep(30);
            robot.mouseClick();
            botting.sleep(5000);
            robot.keyToggle("down", "down");
            botting.sleep(3500 + botting.getRandomInt(0, 500));
            robot.keyToggle('down', 'up');
        }
    },
    willows: {
        colors: ["2a2614", "4f4829", "3e391f", "4c4527", "423b21", "494224"],

        bluePixelRange: bluePixels(84, 105),

        leaveBank: function () {
            console.log('leaving bank for willows');


            robot.moveMouseSmooth(1772 + getRandomInt(0, 20), 136 + getRandomInt(0, 30));
            botting.sleep(30);
            robot.mouseClick();

            robot.keyToggle("down", "down");
            botting.sleep(3500 + botting.getRandomInt(0, 500));
            robot.keyToggle('down', 'up');
            botting.sleep(6000 + botting.getRandomInt(0, 1000));
            return true;
        }
    }
}

exports.catherby = {}


//inventory and banking below this line


exports.emptyInventoryColors = ["3e3529", "40362c", "40382d", "3b3226"];

exports.inventorySpaceCoords = {

    1: {
        x: 1685 + getRandomInt(4, 21),
        y: 790 + getRandomInt(5, 25)
    },
    2: {
        x: 1726 + getRandomInt(4, 21),
        y: 790 + getRandomInt(5, 25)
    },
    3: {
        x: 1768 + getRandomInt(4, 21),
        y: 790 + getRandomInt(5, 25)
    },
    4: {
        x: 1810 + getRandomInt(4, 21),
        y: 790 + getRandomInt(5, 25)
    },
    5: {
        x: 1685 + getRandomInt(4, 21),
        y: 826 + getRandomInt(5, 25)
    },
    6: {
        x: 1726 + getRandomInt(4, 21),
        y: 826 + getRandomInt(5, 25)
    },
    7: {
        x: 1768 + getRandomInt(4, 21),
        y: 826 + getRandomInt(5, 25)
    },
    8: {
        x: 1810 + getRandomInt(4, 21),
        y: 826 + getRandomInt(5, 25)
    },
    9: {
        x: 1685 + getRandomInt(4, 21),
        y: 864 + getRandomInt(5, 25)
    },
    10: {
        x: 1726 + getRandomInt(4, 21),
        y: 864 + getRandomInt(5, 25)
    },
    11: {
        x: 1768 + getRandomInt(4, 21),
        y: 864 + getRandomInt(5, 25)
    },
    12: {
        x: 1810 + getRandomInt(4, 21),
        y: 864 + getRandomInt(5, 25)
    },
    13: {
        x: 1685 + getRandomInt(4, 21),
        y: 898 + getRandomInt(5, 25)
    },
    14: {
        x: 1726 + getRandomInt(4, 21),
        y: 898 + getRandomInt(5, 25)
    },
    15: {
        x: 1768 + getRandomInt(4, 21),
        y: 898 + getRandomInt(5, 25)
    },
    16: {
        x: 1810 + getRandomInt(4, 21),
        y: 898 + getRandomInt(5, 25)
    },
    17: {
        x: 1685 + getRandomInt(4, 21),
        y: 935 + getRandomInt(5, 25)
    },
    18: {
        x: 1726 + getRandomInt(4, 21),
        y: 935 + getRandomInt(5, 25)
    },
    19: {
        x: 1768 + getRandomInt(4, 21),
        y: 935 + getRandomInt(5, 25)
    },
    20: {
        x: 1810 + getRandomInt(4, 21),
        y: 935 + getRandomInt(5, 25)
    },
    21: {
        x: 1685 + getRandomInt(4, 21),
        y: 972 + getRandomInt(5, 25)
    },
    22: {
        x: 1726 + getRandomInt(4, 21),
        y: 972 + getRandomInt(5, 25)
    },
    23: {
        x: 1768 + getRandomInt(4, 21),
        y: 972 + getRandomInt(5, 25)
    },
    24: {
        x: 1810 + getRandomInt(4, 21),
        y: 972 + getRandomInt(5, 25)
    },
    25: {
        x: 1685 + getRandomInt(4, 21),
        y: 1007 + getRandomInt(5, 25)
    },
    26: {
        x: 1726 + getRandomInt(4, 21),
        y: 1007 + getRandomInt(5, 25)
    },
    27: {
        x: 1768 + getRandomInt(4, 21),
        y: 1007 + getRandomInt(5, 25)
    },
    28: {
        x: 1810 + getRandomInt(4, 21),
        y: 1007 + getRandomInt(5, 25)
    },

}


exports.inventorySpaceCenterCoords = {

    1: {
        x: 1699,
        y: 804
    },
    2: {
        x: 1741,
        y: 804
    },
    3: {
        x: 1783,
        y: 804
    },
    4: {
        x: 1825,
        y: 804
    },
    5: {
        x: 1699,
        y: 841
    },
    6: {
        x: 1741,
        y: 841
    },
    7: {
        x: 1783,
        y: 841
    },
    8: {
        x: 1825,
        y: 841
    },
    9: {
        x: 1699,
        y: 877
    },
    10: {
        x: 1741,
        y: 877
    },
    11: {
        x: 1783,
        y: 877
    },
    12: {
        x: 1825,
        y: 877
    },
    13: {
        x: 1699,
        y: 913
    },
    14: {
        x: 1741,
        y: 913
    },
    15: {
        x: 1783,
        y: 913
    },
    16: {
        x: 1825,
        y: 913
    },
    17: {
        x: 1699,
        y: 949
    },
    18: {
        x: 1741,
        y: 949
    },
    19: {
        x: 1783,
        y: 949
    },
    20: {
        x: 1825,
        y: 949
    },
    21: {
        x: 1699,
        y: 985
    },
    22: {
        x: 1741,
        y: 985
    },
    23: {
        x: 1783,
        y: 985
    },
    24: {
        x: 1825,
        y: 985
    },
    25: {
        x: 1699,
        y: 1020
    },
    26: {
        x: 1741,
        y: 1020
    },
    27: {
        x: 1783,
        y: 1020
    },
    28: {
        x: 1825,
        y: 1020
    }

}


//necessary functions


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function bluePixels(min, max) {
    let numberOfBluePixels = [];
    for (let i = min; i <= max; i++) {
        numberOfBluePixels.push(i);
    }
    return numberOfBluePixels;
}