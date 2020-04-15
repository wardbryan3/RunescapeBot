const robot = require('./node_modules/robotjs');
let botting = require('./bottingModule/bottingModule');

robot.setMouseDelay(300);


function main() {
    console.log("Starting...");
    botting.sleep(4000);

    let timesLooped = 0;

    while (timesLooped <= 500) {

        if (!checkInventoryFull()) {
            console.log("The inventory is full");
            goToBank();
            //deposit();

        }

        let tree = findTree();

        if (tree === false) {
            //console.log('Could not find tree,rotating camera');
            botting.rotateCamera();
            continue;
        }

        while (confirmPreviousTree(tree.x, tree.y)) {

            robot.moveMouseSmooth(tree.x, tree.y);
            robot.mouseClick();


            botting.sleep(8000 + botting.getRandomInt(10, 2000));


            if (!checkInventoryFull()) {
                console.log("The inventory is full");
                goToBank();
                break;

            }


        }

        botting.rotateCamera();
        timesLooped++;

    }
    console.log("Done.");
}


function dropLogs() {
    var invenory_x = 1690;
    var inventory_y = 800;
    var inventory_log_color = "a58243"

    var pixelColor = robot.getPixelColor(invenory_x, inventory_y);
    //console.log(pixelColor);
    var waitCycles = 0;
    var maxWaitCycles = 9;
    while (pixelColor !== inventory_log_color && waitCycles <= maxWaitCycles) {
        //waiting a bit longer to see if chopping is finished
        botting.sleep(1000 + botting.getRandomInt(0, 1000));
        pixelColor = robot.getPixelColor(invenory_x, inventory_y);
        //increment our wait counter
        waitCycles++;

    }
    //drop logs only if item in spot matches log color
    if (pixelColor === inventory_log_color) {
        robot.moveMouseSmooth(invenory_x, inventory_y);
        robot.mouseClick('right');
        botting.sleep(1000);
        robot.moveMouseSmooth(invenory_x + botting.getRandomInt(0, 10), inventory_y + 45);
        botting.sleep(300);
        robot.mouseClick();
        botting.sleep(1000);
    }

}


function findTree() {
    console.log("findtree called")
    const x = 800, y = 300, width = 700, height = 400;
    let img = robot.screen.capture(x, y, width, height);

    const tree_colors = ["2a2614", "4f4829", "3e391f", "4c4527", "423b21", "494224"];
    for (let i = 0; i < 10000; i++) {
        let random_x = botting.getRandomInt(0, width - 1);
        let random_y = botting.getRandomInt(0, height - 1);
        let sampleColor = img.colorAt(random_x, random_y);


        if (tree_colors.includes(sampleColor)) {
            let screen_x = random_x + x;
            let screen_y = random_y + y;

            robot.moveMouseSmooth(screen_x, screen_y)

            if (confirmTree(screen_x, screen_y)) {
                console.log("Found tree at: " + screen_x + ", " + screen_y);
                return {
                    x: screen_x,
                    y: screen_y
                }

            } else {
                //console.log("Unconfirmed tree at" + screen_x + ", " + screen_y + "color= " + sampleColor);
            }

        }
    }
    // did not find a tree_color in our screenshot;
    return false;
}


function confirmPreviousTree(screen_x, screen_y) {
    console.log("confirmPreviousTree");
    //Setting up a variable to count the number of blue pixels found

    var foundBluePixel = false;
    //first move mouse to possible tree
    robot.moveMouseSmooth(screen_x, screen_y);
    //wait a minute for help text
    botting.sleep(300);
    //now check color of action text

    let numberOfBluePixels = botting.countNumberOfBluePixels();

    return numberOfBluePixels >= 84 && numberOfBluePixels <= 105;


}

function confirmTree(screen_x, screen_y) {

    console.log(" confirmTree ");
    //Setting up a variable to count the number of blue pixels found

    //first move mouse to possible tree
    robot.moveMouseSmooth(screen_x, screen_y);
    //wait a minute for help text
    botting.sleep(300);
    //now check color of action text


    let numberOfBluePixels = botting.countNumberOfBluePixels();
    return numberOfBluePixels >= 84 && numberOfBluePixels <= 105;

}


function checkInventoryFull() {
    let inventoryNotFullColor = "3e3529";
    let detectedColor = robot.getPixelColor(1794, 1024);

    return inventoryNotFullColor == detectedColor;

}

function goToBank() {

    const bankColor = "e9ce4b";
    const x = 1722, y = 23, width = 160, height = 172;
    let img = robot.screen.capture(x, y, width, height);
    let bank_x = 0;
    let bank_y = 0;

    for (let i = 0; i < width - 1; i++) {
        for (let j = 0; j < height - 1; j++) {
            let foundColors = img.colorAt(i, j);
            if (bankColor == foundColors) {
                //console.log("found bank");
                bank_x = i;
                bank_y = j;
                break;

            }
        }
    }
    robot.moveMouseSmooth((x + bank_x), (y + bank_y));
    robot.mouseClick();
    console.log("going to bank");
    botting.sleep(10000)
    deposit();

    //leave bank
    robot.moveMouseSmooth(1780, 152);
    botting.sleep(30);
    robot.mouseClick();

    robot.keyToggle("down", "down");
    botting.sleep(3500 + botting.getRandomInt(0, 500));
    robot.keyToggle('down', 'up');
    botting.sleep(5000);
}

function deposit() {

    console.log("moving to deposit box");
    // first make sure the camera is pointing north for consistency
    robot.moveMouseSmooth(1724, 45);
    robot.mouseClick();
    //also scroll out for max zoom
    robot.moveMouseSmooth(1030, 600);
    robot.scrollMouse(50, -10);
    //hold up arrow to get top view
    robot.keyToggle("up", "down");
    botting.sleep(3500 + botting.getRandomInt(0, 500));
    robot.keyToggle('up', 'up');

    //then click on deposit box
    const x = 1010, y = 550, width = 400, height = 600;
    let img = robot.screen.capture(x, y, width, height);
    let foundDeposit = false;

    const colorsDepositBox = ["483305", "563c05", "433005", "6f6666"];
    for (let i = 0; i < 1000; i++) {
        let random_x = botting.getRandomInt(0, width - 1);
        let random_y = botting.getRandomInt(0, height - 1);
        let sample_color = img.colorAt(random_x, random_y);

        if (colorsDepositBox.includes(sample_color)) {
            let screen_x = random_x + x;
            let screen_y = random_y + y;

            robot.moveMouseSmooth(screen_x, screen_y)
            let blueText = botting.countNumberOfBluePixels();
            if (blueText > 20) {
                foundDeposit = true;
                console.log("found deposit box");

                //move mouse to deposit box
                robot.moveMouseSmooth(screen_x, screen_y);
                //wait a moment
                botting.sleep(300);
                robot.mouseClick();
                break;
            }

        }
    }
    if (!foundDeposit) {
        console.log("did not find deposit box")
        deposit();
    }


    botting.sleep(5000)
    console.log("depositing");
    //then deposit all except for the last  item in inventory
    robot.moveMouseSmooth(928, 516);
    let numberOfItems = 27
    let count = 0;
    while (count <= 27 + botting.getRandomInt(0, 5)) {
        robot.mouseClick();
        botting.sleep(400 + botting.getRandomInt(100, 1000))
        count++;
    }
    console.log("deposited all but one item");
}


main();
