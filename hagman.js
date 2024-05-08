Hangman.prototype.revealBodyPart = function(){
    this.remainingBadGuessed -= 1;
    function reveal(id){
        var container = document.getElementById(id);
        container.classList.remove('intact');
    }
    if(this.remainingBadGuessed === 5){
        reveal('head');
    }else if(this.remainingBadGuessed === 4){
        reveal('body');
    }else if(this.remainingBadGuessed === 3){
        reveal('arm-left');
    }else if(this.remainingBadGuessed === 2){
        reveal('arm-right');
    }else if(this.remainingBadGuessed === 1){
        reveal('leg-left');
    }
};

// helper function include
function includes(char, string){
    for (var i = 0; i< string.length; i++){
        var currentStringChar = string[i];
        if(char === currentStringChar){
            return true;
        }
    }
    return false;
}
// createDivWithText 
function createDivWithText(text){
    var div = document.createElement('div');
    div.innerHTML = text;
    return div;
}

// getrandomentry funcition
function getRandomEntry(array){
    var randomIdx = Math.floor(Math.random() * array.length);
    console.log(randomIdx)
    return array[randomIdx];

}

// Inicialize Hangman objec

function Hangman(secretWord){
    this.originalGameState = document.body.innerHTML;
    this.secretWord = secretWord;
    this.charactersGuessed = '';
    this.remainingBadGuessed = 6;
}

Hangman.prototype.playerLost = function(){
    return this.remainingBadGuessed === 0;
};



Hangman.prototype.showGameEnd = function(){
    var gameContainer = document.getElementById('game');
    gameContainer.classList.add('game-inactive');
    var gameEndContainer = document.getElementById('game-end');
    gameEndContainer.classList.remove('no-display');
    var messageContainer = document.getElementById('game-end-message');
    if(this.playerLost()){
        messageContainer.innerHTML = 'You Lose!'
    }else{
        messageContainer.innerHTML = 'You WINNER!'
    }
    var secretcontainer = document.getElementById('revealed-secret');
    secretcontainer.innerHTML = 'the secret was: ' + this.secretWord; 
};



//check if player your lost

Hangman.prototype.playerWon = function(){
    for (var i = 0;i<this.secretWord.length; i++){
        var secretChar = this.secretWord[i];
        if(!includes(secretChar, this.charactersGuessed)){
            return false;
        }
            
    }
    return true;
};

Hangman.prototype.addToCharactersGuessed = function (char){
    this.charactersGuessed += char;
};

// insert the guessed key on HTML

Hangman.prototype.appendGuessedCharacter = function(key){
    var guessedCharDiv = createDivWithText(key);
    guessedCharDiv.classList.add('character');
    var container = document.getElementById('guessed-characters');
    container.append(guessedCharDiv);
};

Hangman.prototype.updateSecretCharacter = function(char){
    var allSecretChars = document.getElementsByClassName('secret-character');
    for (var i = 0; i < allSecretChars.length; i++){
        var secretChar = allSecretChars[i];
        if( char.toLowerCase() === secretChar.innerHTML.toLowerCase()){
            secretChar.classList.remove('hidden');
            Hangman.prototype.revealBodyPart = function(){
                this.remainingBadGuessed -= 1;
                function reveal(id){
                    var container =document.getElementById(id);
                    container.classList.remove('intact');
                }
                if(this.remainingBadGuessed === 5){
                    reveal('head');
                }else if(this.remainingBadGuessed === 4){
                    reveal('body');
                }else if(this.remainingBadGuessed === 3){
                    reveal('arm-left');
                }else if(this.remainingBadGuessed === 2){
                    reveal('arm-right');
                }else if(this.remainingBadGuessed === 1){
                    reveal('leg-right');
                }


            };
        }
    }
};

Hangman.prototype.renderRemainingGuesses = function(){
    var container = document.getElementById('remaining-guesses');
    container.innerHTML = this.remainingBadGuessed;
}

Hangman.prototype.resetGameState= function(){
    document.body.innerHTML = this.originalGameState;
};

// insert secret word into html

Hangman.prototype.initializeSecretWord = function () {
    var container = document.getElementById('secret-word');
    for (var i = 0; i < this.secretWord.length; i++){
        var secretChar = this.secretWord[i];
        var div = createDivWithText(secretChar);
        div.classList.add('secret-character', 'hidden');
        container.append(div);
    }
};


// check if tthe was alredy guessed

Hangman.prototype.alreadyGuessed = function(guessedKey){
    return includes(guessedKey, this.charactersGuessed);
};


// check if key not a alphabetic
Hangman.prototype.isInValidGuess = function(guessedKey){
    var isAlphabetic = includes(guessedKey, 'abcdefghijklmnopqrstuvwxyz');
    return !isAlphabetic;
};

// print messague tha key was guessed 
Hangman.prototype.updateGameMessage = function(msg){
    var messageContainer = document.getElementById('game-message');
    messageContainer.innerHTML = msg;
};

Hangman.prototype.clearGameMessage = function(){
    var messageContainer = document.getElementById('game-message');
    messageContainer.innerHTML= '';
};

Hangman.prototype.correctGuess = function(guessedKey){
    return includes(guessedKey, this.secretWord);
};

function initialize(){
    var wordBank = [ // Data of Word for the Game
        'amor',
        'fio',
        'cucaracha',
    ];
    var randomWord = getRandomEntry(wordBank);
    var game = new Hangman(randomWord);
    game.initializeSecretWord();
    document.addEventListener('keydown', function(event){
        if(game.playerWon() || game.playerLost()){
            return;
        }
        var guessedKey = event.key.toLowerCase();
        if(game.isInValidGuess(guessedKey)){
            return;
        }
        if(game.alreadyGuessed(guessedKey)){
            game.updateGameMessage('You Alredy guessed '+ guessedKey);
            return;
        }
        game.addToCharactersGuessed(guessedKey);
        game.appendGuessedCharacter(guessedKey);
        if(game.correctGuess(guessedKey)){
            game.updateGameMessage('Yes the secret contains '+ guessedKey);
            game.updateSecretCharacter(guessedKey);
        }
        else{
            game.updateGameMessage('Nope, the secret does not have a : '+guessedKey);
            game.revealBodyPart();
        }
        if(game.playerWon() || game.playerLost()){
            game.showGameEnd();
            return;
        }
    });

    var playAgaintButton = document.getElementById('restart-game');
    playAgaintButton.addEventListener('click', function (){
        game.resetGameState();
        initialize();
    });
    
}

initialize();





// keydown event listener































