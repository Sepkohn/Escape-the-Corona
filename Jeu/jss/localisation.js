/*Geolocation part*/
//var geoUser = "";

if (localStorage.getItem("geoUserMemo") === null) {
    localStorage.setItem("geoUserMemo", JSON.stringify(geoUser));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("geolocation not supported");
    }
}


function showPosition(position) {

    var getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };

    getJSON('http://open.mapquestapi.com/geocoding/v1/reverse?key=A5AOlcOT3M0rfeqBbrwMLBfHMZWDF1vZ&location=' + position.coords.latitude + ',' + position.coords.longitude + '&includeRoadMetadata=true&includeNearestIntersection=true', function (err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            var thisGeoUser = data["results"]["0"]["locations"]["0"]["adminArea5"] + "-" + data["results"]["0"]["locations"]["0"]["adminArea1"];
            localStorage.setItem("geoUserMemo", JSON.stringify(thisGeoUser));
        }
    });
}



/*End geolocations part*/