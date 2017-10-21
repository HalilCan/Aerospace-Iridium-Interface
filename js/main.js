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

function sendMessage() {
    let message = sendMessageBox.value;
    let hexMessage = hexify(message);
    
    let messageObject = {
        imei: IMEI,
        username: USERNAME,
        password: PASSWORD,
        data: hexMessage
    }
    let preppedObject = JSON.stringify(messageObject);
    
    let xhr = new XMLHttpRequest();
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
    
    xhr.onloadend = function () {
        // done
    };
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
