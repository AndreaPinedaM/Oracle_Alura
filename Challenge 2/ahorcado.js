/* Caracteres aceptados */
var accepted= /^[a-zA-Z]+$/ ;

function imprimir(){
    var palabra =document.getElementById("secret").value;
    
    if(palabra.match(accepted)){
        verify();
        alert("Palabra aceptada. ¡Guardada con éxito!");
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


