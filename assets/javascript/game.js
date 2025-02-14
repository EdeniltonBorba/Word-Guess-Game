//VARIABLES
var words = ["wewillrockyou", "itsonlyrocknroll", "mygeneration", "stairwaytoheaven", "entersandman", "anotherbrickinthewall", "backinblack"];

//Empty variables to store values later
var randomWord = "";
var lettersOfWord = [];
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;



// ALL FUNCTIONS

//GAME START FUNCTION

function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord);
    console.log(blanks);
    console.log(blanksAndCorrect);
}


//__________________________________________________________
//AUDIO FUNCTION
//__________________________________________________________

//variables for audio function
var a = document.getElementById("Queen");
var r = document.getElementById("TheRollingStones");
var theWho = document.getElementById("TheWho");
var ledZeppelin = document.getElementById("LedZeppelin");
var metallica = document.getElementById("Metallica");
var pinkFloyd = document.getElementById("PinkFloyd");
var acdc = document.getElementById("ACDC");


function aud() {
    //Queen Audio & Image
    //---------------------------
    if (randomWord === words[0]) {
        ledZeppelin.pause();
        metallica.pause();
        pinkFloyd.pause();
        acdc.pause();
        theWho.pause();
        r.pause();
        a.play();
        document.getElementById("image").src = "./assets/images/We Will Rock You – Queen.jpg";
    }
    //Rolling Stones Audio & Image
    //---------------------------
    else if (randomWord === words[1]) {
        ledZeppelin.pause();
        metallica.pause();
        pinkFloyd.pause();
        acdc.pause();
        theWho.pause();
        a.pause();
        r.play();
        document.getElementById("image").src = "./assets/images/It's Only Rock 'N' Roll – Rolling Stones.jpg";
    }
    //The Who Audio & Image
    //---------------------------
    else if (randomWord === words[2]) {
        ledZeppelin.pause();
        metallica.pause();
        pinkFloyd.pause();
        acdc.pause();
        r.pause();
        a.pause();
        theWho.play();
        document.getElementById("image").src = "./assets/images/My Generation – The Who.jpg";
    }
    //Led Zeppelin Audio & Image
    //---------------------------
    else if (randomWord === words[3]) {
        metallica.pause();
        pinkFloyd.pause();
        acdc.pause();
        theWho.pause();
        r.pause();
        a.pause();
        ledZeppelin.play();
        document.getElementById("image").src = "./assets/images/Stairway To Heaven – Led Zeppelin.jpg";
    }
    //Metallica Audio & Image
    //---------------------------
    else if (randomWord === words[4]) {
        pinkFloyd.pause();
        acdc.pause();
        theWho.pause();
        r.pause();
        a.pause();
        ledZeppelin.pause();
        metallica.play();
        document.getElementById("image").src = "./assets/images/Enter Sandman – Metallica.jpg";
    }
    //Pink Floyd Audio & Image
    //---------------------------
    else if (randomWord === words[5]) {
        metallica.pause();
        acdc.pause();
        theWho.pause();
        r.pause();
        a.pause();
        ledZeppelin.pause();
        pinkFloyd.play();
        document.getElementById("image").src = "./assets/images/Another Brick In The Wall – Pink Floyd..jpg";
    }
    //ACDC Audio & Image
    //---------------------------
    else if (randomWord === words[6]) {
        metallica.pause();
        pinkFloyd.pause();
        theWho.pause();
        r.pause();
        a.pause();
        ledZeppelin.pause();
        acdc.play();
        document.getElementById("image").src = "./assets/images/ac-dc-back-in-black.jpg";
    }
};

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//__________________________________________________________
//FINAL COMPLETE FUNCTION
//__________________________________________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        aud()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/tryAgain.png"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//_____________________________________________________
// EXECUTE CODE 
//_____________________________________________________

//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}

