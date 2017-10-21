// You REALLY want async = true.
// Otherwise, it'll block ALL execution waiting for server response.
let async = true;

let imeiBox = document.getElementById("imei-box");
let usernameBox = document.getElementById("username-box");
let passwordBox = document.getElementById("password-box");
let applySettingsButton = document.getElementById("setup-submit-button");
let transceiverSetup = document.getElementById("transceiver-setup");
let setupForm = document.getElementById("setup-form");

let displaySetup = document.getElementById("display-setup");
let displaySetupButton = document.getElementById("display-setup-button");

let sendMessageButton = document.getElementById("send-message-button");
let sendMessageBox = document.getElementById("send-message-box");

let IMEI = "";
let USERNAME = "";
let PASSWORD = "";

let msgUrl = "https://core.rock7.com/rockblock/MT";
let method = "POST";
let postData = "";

function sendMessage() {
    let message = sendMessageBox.value;
    let hexMessage = hexify(message);
    let messageObject = {
        imei: IMEI,
        username: USERNAME,
        password: PASSWORD,
        data: hexMessage
    };
    let preppedObject = JSON.stringify(messageObject);
    
    method = "POST";
    postData = preppedObject;
    
    let request = new XMLHttpRequest();
    // Before we send anything, we first have to say what we will do when the
    // server responds. This seems backwards (say how we'll respond before we send
    // the request? huh?), but that's how Javascript works.
    // This function attached to the XMLHttpRequest "onload" property specifies how
    // the HTTP response will be handled.
    request.onload = function () {
        // Because of javascript's fabulous closure concept, the XMLHttpRequest "request"
        // object declared above is available in this function even though this function
        // executes long after the request is sent and long after this function is
        // instantiated. This fact is CRUCIAL to the workings of XHR in ordinary
        // applications.
        
        let status = request.status;
        let data = request.responseText;
        Console.log("Status: " + status);
        Console.log("Return data: " + data);
    };
    request.open(method, url, async);
    
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Or... request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    // Or... whatever
    
    // Actually sends the request to the server.
    request.send(postData);
}

function hexify(val) {
    let hex, i;
    
    let result = "";
    for (i=0; i<val.length; i++) {
        hex = val.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    
    return result;
}

function dehexify(val) {
    let j;
    let hexes = val.match(/.{1,4}/g) || [];
    let back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    
    return back;
}

function applySettings() {
    //Start with toggling the display of the setup menu
    toggleSetup();
    
    //Record transceiver configuration data
    IMEI = imeiBox.value;
    USERNAME = usernameBox.value;
    PASSWORD = passwordBox.value;
}

function toggleSetup() {
    if (setupForm.style.display === "none") {
        setupForm.style.display = "block";
        displaySetup.style.display = "none"
    } else {
        setupForm.style.display = "none";
        displaySetup.style.display = "block";
    }
}
