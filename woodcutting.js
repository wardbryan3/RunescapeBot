const robot = require('./node_modules/robotjs');
const botting = require('./bottingModule/bottingModule');
const runescape = require('./runescapeModule/runescapeModule');


robot.setMouseDelay(300);

const password = 'placeholder123'
const bankLocation = runescape.draynor;
const treeType = bankLocation.trees;
const powerMine = false;
const firstInventorySpot = 1;
const lastInventorySpot = 27;


function main() {
    console.log('Starting...');
    botting.sleep(2000);

    let timesLooped = 0;
    let treesNotFound = 0;
    let maxLoops = 30 + botting.getRandomInt(0, 0);
    //5 loops takes about 3 min
    //100 loops is about an hour

    while (timesLooped <= maxLoops) {

        if (powerMine) {
            if (botting.detectInventory(firstInventorySpot, lastInventorySpot)) {
                botting.dropInventory(firstInventorySpot, lastInventorySpot);
            }
        } else {
            if (botting.bankingProcess(bankLocation)) {

                treeType.leaveBank();
            }
        }


        let tree = findTree(treeType.colors);

        if (tree === false) {
            //console.log('Could not find tree,rotating camera');
            botting.rotateCameraRandom();
            treesNotFound++;
            if (treesNotFound >= 5) {
                botting.logOut();
                process.exit(20);
            }
            continue;
        } else {
            robot.mouseClick();
            treesNotFound = 0;
        }

        while (confirmTree(tree.x, tree.y, treeType.bluePixelRange)) {

            robot.mouseClick();

            if (powerMine) {
                if (botting.detectInventory(firstInventorySpot, lastInventorySpot)) {
                    botting.dropInventory(firstInventorySpot, lastInventorySpot);
                }
            } else {
                if (botting.bankingProcess(bankLocation)) {

                    treeType.leaveBank();
                }
            }

            botting.sleep(8000 + botting.getRandomInt(10, 2000));

        }

        botting.rotateCameraRandom();
        timesLooped++;
        console.log('loops left: ' + (maxLoops - timesLooped));
    }
    takeBreak()

}


function findTree(treeColors) {
    //console.log("findTree called")


    const x = 800, y = 300, width = 700, height = 400;
    let img = robot.screen.capture(x, y, width, height);
    for (let i = 0; i < 10000; i++) {
        let random_x = botting.getRandomInt(0, width - 1);
        let random_y = botting.getRandomInt(0, height - 1);
        let sampleColor = img.colorAt(random_x, random_y);


        if (treeColors.includes(sampleColor)) {
            let screen_x = random_x + x;
            let screen_y = random_y + y;

            robot.moveMouseSmooth(screen_x, screen_y)

            if (confirmTree(screen_x, screen_y, treeType.bluePixelRange)) {
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

function confirmTree(screen_x, screen_y, treeArrayOfBluePixels) {

    //console.log(" confirmTree ");
    //Setting up a variable to count the number of blue pixels found

    //first move mouse to possible tree
    robot.moveMouseSmooth(screen_x, screen_y);
    //wait a minute for help text
    botting.sleep(300);
    //now check color of action text
    let numberOfBluePixels = botting.countNumberOfBluePixels();

    //console.log(numberOfBluePixels);

    for (let i = 0; i <= treeArrayOfBluePixels.length - 1; i++) {
        if (treeArrayOfBluePixels[i] === numberOfBluePixels) {

            return true;
        }
    }
    return false;


}

function takeBreak(min, max) {
    console.log('Taking break.');

    let bank = botting.findBank();
    botting.goToBank(bank.x, bank.y);

    botting.logOut();
    let randomNumberOfMinutes = ((botting.oneMinuteInMilliSeconds * botting.getRandomInt(min, max))) + botting.getRandomInt(0, botting.oneMinuteInMilliSeconds);
    console.log('break will be ' + randomNumberOfMinutes / 60000 + 'minutes long. ');
    botting.sleep(randomNumberOfMinutes);
    console.log('break is over');
    botting.logIn(password);
    botting.sleep(10000);
    treeType.leaveBank();
}

main();