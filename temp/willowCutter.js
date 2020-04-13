const robot = require('robotjs');
const fs = require('fs');




function main(){
    console.log("Starting...");
    sleep(4000);

    var timesLooped = 0;
    while (timesLooped <= 500) {

        var tree = findTree();
        if (tree == false){
            console.log('Could not find tree,rotating camera');
            rotateCamera();
            continue;
        }
        robot.moveMouseSmooth(tree.x, tree.y);
        robot.mouseClick();

        sleep(3000+getRandomInt(10,1000));
        dropLogs();

        timesLooped++;

    }
    console.log("Done.");
}


function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function dropLogs(){
    var invenory_x = 1690;
    var inventory_y = 800;
    var inventory_log_color = "a58243"

    var pixelColor = robot.getPixelColor(invenory_x,inventory_y);
    //console.log(pixelColor);
    var waitCycles = 0;
    var maxWaitCycles = 9;
    while(pixelColor !== inventory_log_color && waitCycles <= maxWaitCycles){
        //waiting a bit longer to see if chopping is finished
        sleep(1000 + getRandomInt(0,1000));
        pixelColor = robot.getPixelColor(invenory_x,inventory_y);
        //increment our wait counter
        waitCycles++;

    }
    //drop logs only if item in spot matches log color
    if(pixelColor === inventory_log_color){
        robot.moveMouseSmooth(invenory_x,inventory_y);
        robot.mouseClick('right');
        sleep(1000);
        robot.moveMouseSmooth(invenory_x + getRandomInt(0,10),inventory_y+ 45);
        sleep(300);
        robot.mouseClick();
        sleep(1000);
    }

}

function testScreenCap(){
    //take a fullscreen screenshot of monitor 1;
    var img = robot.screen.capture(0,0,1920,1080);

    var pixel_color = img.colorAt(30,18);


}

function findTree() {
    var x = 160, y = 300, width = 1400,height = 700;
    var img = robot.screen.capture(x,y,width,height);

    var tree_colors =["876436","5b4324","785830"];
    for(var i = 0; i < 10000; i++) {
        var random_x = getRandomInt(0, width-1);
        var random_y = getRandomInt(0, height-1);
        var sample_color = img.colorAt(random_x,random_y);

        if(tree_colors.includes(sample_color)){
            var screen_x = random_x + x;
            var screen_y  = random_y + y;


            if(confirmTree(screen_x,screen_y)){
                console.log("Found tree at" + screen_x + ", " + screen_y + "color= " + sample_color);
                return {x: screen_x,
                    y: screen_y
                }

            }else {
                console.log("Unconfirmed tree at" + screen_x + ", " + screen_y + "color= " + sample_color);
            }

        }
    }
    // did not find a tree_color in our screenshot;
    return false;
}



function rotateCamera(){
    robot.keyToggle('right','down');
    sleep(2200+ getRandomInt(0,500));
    robot.keyToggle('right', 'up');
}

function confirmTree(screen_x,screen_y){
    //first move mouse to possible tree
    robot.moveMouseSmooth(screen_x,screen_y);
    //wait a minute for help text
    sleep(300);
    //now check color of action text



    var desiredHelpTextColors = createArrayOfHelpHex();
    var x = 161, y = 31, width = 7,height = 8;
    var img = robot.screen.capture(x,y,width,height);

    var helpTextColor = robot.getPixelColor(167,34);
    console.log("found help text color: " + helpTextColor);
    if( desiredHelpTextColors.includes(helpTextColor)){
        return true;


    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createArrayOfHelpHex(){
    let desiredHelpTextColors = []
    //creating a range of hex

    for (var r = 0; r <= 25; r++) {
        componentToHex(r);
        //console.log(r);

        for(var g=190;g <=255;g++){
            componentToHex(g);
            //console.log(g);

            for(var b=190;b <=255;b++){
                componentToHex(b);
                //console.log(b);

                desiredHelpTextColors.push(rgbToHex(r, g, b,))
            }
        }

    }
    //console.dir(desiredHelpTextColors, {'maxArrayLength': null});
    //fs.writeFile("hugearray.txt", desiredHelpTextColors, function (err) {

    //});
    return desiredHelpTextColors;


}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return  componentToHex(r) + componentToHex(g) + componentToHex(b);
}
//createArrayOfHelpHex();
main();