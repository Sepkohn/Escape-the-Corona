var updateScore = function(player, scoreMinute, scoreSeconds){
	
	var palmares = JSON.parse(localStorage.getItem("palmares"));
	
	var placeInPalmares = palmares.length;
	var cpt = 0;
	var isSet = false;
	
	palmares.forEach(function (element){
		var infoScore = element.split('|');	
		if(infoScore[1]>=scoreMinute&&infoScore[2]>scoreSeconds&&!isSet){
			placeInPalmares = cpt;
            isSet = true;
			console.log("I am in the PAlMARES !!");
		}
		cpt++;
	});
	
	console.log("My place in the palmares : " + placeInPalmares);
	
	palmares.splice(placeInPalmares, 0, player+ ',' + geoUser + '|' + scoreMinute +'|' + scoreSeconds);

    localStorage.setItem("palmares", JSON.stringify(palmares));
}

var displayRanking = function(){
	var ranking = document.getElementById("third");
	ranking.innerHTML="";
	var palmares = JSON.parse(localStorage.getItem("palmares"));
	
	var cpteur=1;
	
    palmares.forEach(function (element) {
        if (cpteur <= 5) {
            var infoScore = element.split('|');
            var newScore = '<div id="player1" class="player"><div id="numero">' + cpteur + '. ' + infoScore[0] + '</div><div id="score">' + infoScore[1]+":"+infoScore[2] + ' minutes</div></div>';
            ranking.insertAdjacentHTML('beforeend', newScore);
            cpteur++;
        }
    });
	
}