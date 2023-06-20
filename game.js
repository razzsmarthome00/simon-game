var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentLevel = 0;

$("body").keypress(function () {
    if (level === 0) {
        level = 1;
        currentLevel = 1;
        $("h1").text("Level " + level);
        nextSequence();
    }
});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
        console.log("success");
        this.currentLevel++;
        console.log(currentLevel);
    }
    else {
        console.log("wrong");
        $("h1").text("You Failed!");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.level = 0;
        this.currentLevel = 0;
    }
}

function nextSequence() {
    var randomNumber = Math.floor(4 * Math.random());
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("." + gamePattern[gamePattern.length - 1]).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");

    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}


$(".btn").click(function (userChosenColor) {
    if (level !== 0) {
        var userChosenColor = userChosenColor.target.id;
        userClickedPattern.push(userChosenColor);
        console.log("user:" + userClickedPattern);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(currentLevel);
        if (currentLevel > level) {
            level++;
            console.log(level);
            currentLevel = 1;
            userClickedPattern = [];
            $("h1").text("Level " + level);
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
})



