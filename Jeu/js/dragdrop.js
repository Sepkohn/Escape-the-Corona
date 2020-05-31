/****************************************
	All function for Drag and Drop
****************************************/

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("image", ev.target.id);    
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var data2 =  ev.dataTransfer.getData("image"); //to return the name of picture to get it in play game

    if (ev.target.className == "imgPlayer") {
        
        document.getElementById("imgPlayer").src = data;
        document.getElementById("imgPlayer").name = data2;
    }

}
