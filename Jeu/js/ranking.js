
var updateScore = function(player, scoreMinute, scoreSeconds){
	console.log("i update the palmares");
	
	var palmares = JSON.parse(localStorage.getItem("palmares"));
	
	var placeInPalmares = palmares.length;
	var cpt = 0;
	var isSet = false;
	
	palmares.forEach(function (element){
		var infoScore = element.split('|');	
		if(infoScore[1]>=scoreMinute && infoScore[2]>=scoreSeconds && !isSet){
			placeInPalmares = cpt;
            isSet = true;
		}
		cpt++;
	});
	
	console.log("My place in the palmares : " + placeInPalmares);
	
	palmares.splice(placeInPalmares, 0, player+ ' from ' + geoLocUser + '|' + scoreMinute +'|' + scoreSeconds);

    localStorage.setItem("palmares", JSON.stringify(palmares));
}

var displayRanking = function(){
	//window.localStorage.clear();
	var ranking = document.getElementById("ranking");
	ranking.innerHTML="<tr><th> Place</th><th>Nom</th><th>Temps</th></tr>";
	var palmares = JSON.parse(localStorage.getItem("palmares"));
	
	var cpt=1;
	
    palmares.forEach(function (element) {
        if (cpt <= 5) {
            var infoScore = element.split('|');
            var newScore = '<tr class="player"><td>' + cpt + '</td><td> ' + infoScore[0] + '</td><td>' + infoScore[1]+":"+infoScore[2] + ' min</td></tr>';
            ranking.insertAdjacentHTML('beforeend', newScore);
            cpt++;
        }
    });
	
}
window.onload = displayRanking;