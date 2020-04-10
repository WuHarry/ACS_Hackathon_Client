function HttpRequest() {
    this.http = new XMLHttpRequest();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
HttpRequest.prototype.get = function (url, callback) {


    this.http.open('GET', url, true);
    this.http.timeout = 5000;
    let access_token = getCookie("access_token");
    if(access_token){
        this.http.setRequestHeader('Access-Token', access_token);
    }
    let self = this;
    this.http.onload = function () {
        if (self.http.status === 200) {
            callback(null, JSON.parse(self.http.responseText));
        } else {
            callback('Error: ' + self.http.status);
        }
    };
    this.http.ontimeout = (e) => {
        this.http.abort();
        return callback(null, {"error": "get request timed out"});
    };
    this.http.send();
};

HttpRequest.prototype.post = function (url, data, callback) {
    this.http.open('POST', url, true);
    this.http.timeout = 5000;
    this.http.setRequestHeader('Content-type', 'application/json');
    let self = this;
    this.http.onload = function () {
        callback(null, JSON.parse(self.http.responseText));
    };
    this.http.ontimeout = (e) => {
        this.http.abort();
        return callback(null, {"error": "get request timed out"});
    };
    this.http.send(JSON.stringify(data));
};