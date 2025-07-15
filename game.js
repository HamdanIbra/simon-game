// Array to store the user's sequence of clicks
var userClickedPattern = [];

// Array to store the game's generated pattern
var gamePattern = [];

// Available button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Track the current level
var currentLevel = 0;

// Whether the game has started yet
var started = false;

// 🔊 Play a sound given the color name
function playSound(name) {
    const sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

// 💡 Animate the button press by adding/removing the CSS class
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// 🚀 Generate the next color in the sequence
function nextSequence() {
    userClickedPattern = []; // reset user's input for this level

    currentLevel++;
    $("h1").text("Level " + currentLevel);

    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    // Delay the animation & sound slightly
    setTimeout(() => {
        $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }, 300);
}

// ✅ Check the user's most recent click
function checkAnswer(currentIndex) {
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
        // If the user has finished the sequence correctly
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        // ❌ Wrong click
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

// 🔄 Reset game state
function startOver() {
    currentLevel = 0;
    gamePattern = [];
    started = false;
}

// 🎮 Handle button clicks
$(".btn").click(function () {
    if (!started) {
        // Ignore clicks if the game hasn't started yet
        return;
    }

    const buttonId = $(this).attr("id");
    userClickedPattern.push(buttonId);

    animatePress(buttonId);
    playSound(buttonId);

    // Check the most recent click
    checkAnswer(userClickedPattern.length - 1);
});

// ⌨️ Start the game on keydown
$(document).keydown(function () {
    if (!started) {
        $("h1").text("Level 0");
        nextSequence();
        started = true;
    }
});
