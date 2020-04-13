const robot = require('robotjs');
const fs = require('fs');




function main(){
    console.log("Starting...");
    sleep(4000);

    let timesLooped = 0;
    while (timesLooped <= 500) {

        let tree = findTree();

        if (tree === false){
            console.log('Could not find tree,rotating camera');
            rotateCamera();
            continue;
        }

        while(confirmPreviousTree(tree.x, tree.y)){
            robot.moveMouseSmooth(tree.x, tree.y);
            robot.mouseClick();

            sleep(3000+getRandomInt(10,1000));
            dropLogs();

            timesLooped++;
        }


    }
    console.log("Done.");
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



function confirmPreviousTree(screen_x,screen_y){
    //first move mouse to possible tree
    robot.moveMouseSmooth(screen_x,screen_y);
    //wait a minute for help text
    sleep(300);
    //now check color of action text



    const desiredHelpTextColors = createArrayOfHelpHex();

    const x = 143, y = 28, width = 26,height = 10;

    let img = robot.screen.capture(x,y,width,height);

    let helpTextColor = robot.getPixelColor(167,34);
    console.log("found help text color: " + helpTextColor);
    if( desiredHelpTextColors.includes(helpTextColor)){
        return true;


    }

}
// function confirmTree(screen_x,screen_y){
//     //first move mouse to possible tree
//     robot.moveMouseSmooth(screen_x,screen_y);
//     //wait a minute for help text
//     sleep(300);
//     //now check color of action text
//
//
//
//     const desiredHelpTextColors = createArrayOfHelpHex();
//
//     const x = 161, y = 31, width = 7,height = 8;
//
//     let img = robot.screen.capture(x,y,width,height);
//
//             let helpTextColor = robot.getPixelColor(170,37);
//             console.log("found help text color: " + helpTextColor);
//             if( desiredHelpTextColors.includes(helpTextColor)){
//                 return true;
//
//
//         }
//
// }

function confirmTree(screen_x,screen_y){
    //first move mouse to possible tree
    robot.moveMouseSmooth(screen_x,screen_y);
    //wait a minute for help text
    sleep(300);
    //now check color of action text



    const desiredHelpTextColors = createArrayOfHelpHex();

    const x = 168, y = 33, width = 5,height = 4;

    let img = robot.screen.capture(x,y,width,height);
        img.saveBitmap
            for(let i= 0; i < width-1;i++){
                for(let j = 0; j< height-1; j++){
                    let helpTextColor = img.colorAt(i,j);


                    if( desiredHelpTextColors.includes(helpTextColor)){
                        console.log("found help text color: " + helpTextColor + " at x: " + i + "y: " + j);
                        return true;

                    }
            }


        }return false;

}

function createArrayOfHelpHex(){
    let desiredHelpTextColors = []
    //creating a range of hex

    for (var r = 0; r <= 25; r++) {
        //all possible red values get looped through i.e 0 through 255

        for(var g=190;g <=255;g++){
            //all possible green values get looped through
            for(var b=190;b <=255;b++){
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

//basic fucntion that return a  random value between the min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//borrowed function that allows for wait times between actions

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

//function that allows us to convert one color (r, g, or b) to its hex value
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

//concatatanates r g and b hex values
function rgbToHex(r, g, b) {
    return  componentToHex(r) + componentToHex(g) + componentToHex(b);
}

main();