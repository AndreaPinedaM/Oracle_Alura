const wordContainer= document.getElementById('wordContainer');
const start= document.getElementById('start');
const usedLettersElement= document.getElementById('usedLetters');

var words = ["ballena", "lobo", "cuervo", "espada", "lanza", "colmillo"];

let canvas= document.getElementById('canvas');
let ctx= canvas.getContext("2d");
/*Set el alto y ancho del canvas a cero*/
ctx.canvas.width=0;
ctx.canvas.height=0;

const bodyParts=[
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter =>{
    const letterElement = document.createElement('span');
    letterElement.innerHTML= letter;
    /*A la seccion de letras usadas se le agraga el span recien creado en esta función */
    usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle='#FFFF';
    ctx.fillRect(...bodyPart);
}

const wrongLetter = () =>{
    addBodyPart(bodyParts[mistakes]);
    mistakes++;

    if(mistakes == bodyParts.length){
        alert("Has perdido ☹");
        endGame();
    }
}

const endGame = () =>{
    document.removeEventListener('keydown', letterEvent);
    start.style.display= 'block';
}

const correctLetter = letter => {
    /*Obtener todos los spans del contenedor*/ 
    const { children } =  wordContainer;

    for(let i=0; i< children.length; i++){
        if(children[i].innerHTML == letter){

            /*Eliminar la clase hidden paa que el usuario pueda visualizarla*/
            children[i].classList.toggle('hidden');
            /*Sumar aciertos*/
            hits++;
        }
    }
    if(hits == selectedWord.length){
        alert("¡FELICIDADES! Has ganado ☺");
        endGame();

    } 
}

const letterInput = letter => {
    if(selectedWord.includes(letter)){
        correctLetter(letter);
    }else{
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
}

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();

    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)){
        letterInput(newLetter);
    } 
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement= document.createElement('span'); 
        letterElement.innerHTML= letter;
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

function randomWord(){
    var word = words[Math.floor(Math.random()*words.length)].toUpperCase();
    selectedWord = word.split("");
}

function drawHangman() {
    ctx.canvas.width=120;
    ctx.canvas.height=160;
    ctx.scale(20,20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle= "#de26e7";
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
}

const startGame= () =>{
    usedLetters= [0];
    mistakes = 0;
    hits =0;
    wordContainer.innerHTML ='';
    usedLettersElement.innerHTML='';
    start.style.display='none';
    drawHangman();
    randomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};



var accepted= /^[a-zA-Z]+$/ ;

function imprimir(){
    var palabra =document.getElementById("secret").value;
    
    if(palabra.match(accepted)){
        verify();
        addWord();
        alert("Palabra " + palabra + " aceptada. ¡Guardada con éxito!");
    }else if (palabra.length==0){
        verify();
        alert("Ingrese una palabra");
    }else{
        verify();
        alert("Intente con otra palabra, respetando las restricciones");
    }
}

function verify(){
    var palabra =document.getElementById("secret").value;
    var save_start= document.getElementById("Save&Start");
    
    if(palabra.match(accepted)){
        save_start.onclick= location.href='./page3.html';
    }else if (palabra.length==0){
        save_start.onclick= location.href='./page2.html';
    }else{
        save_start.onclick= location.href='./page2.html';
    }
}




start.addEventListener('click',startGame);


