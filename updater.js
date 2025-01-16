var ampapi = require("@cubecoders/ampapi");
const env = require('dotenv').config().parsed;

async function login(url, user, pass, token="") {
    var API = new ampapi.AMPAPI(url);
    try {
        //Perform first-stage API initialization.
        var APIInitOK  = await API.initAsync();
        if (!APIInitOK) {
            console.log("API Init failed");
            return;
        }
        //The third parameter is either used for 2FA logins, or if no password is specified to use a remembered token from a previous login, or a service >
        var loginResult = await API.Core.LoginAsync(user, pass, token, false);
        if (loginResult.success) {
            console.log("Login successful");
            API.sessionId = loginResult.sessionID;
            //console.log(loginResult)

            //Perform second-stage API initialization, we only get the full API data once we're logged in.
            APIInitOK = await API.initAsync();

            if (!APIInitOK) {
                console.log("API Stage 2 Init failed");
                return;
            }

            return API;
        }
        else {
            console.log("Login failed");
            console.log(loginResult);
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function start() {
    try {
        var ADS = await login(env.AMP_SERVER_URL, env.USERNAME, env.PASSWORD);
        var instances = await ADS.ADSModule.GetInstancesAsync(false);
        var minst = instances[0];
        var idata = minst.AvailableInstances.find((a) => a.FriendlyName === env.FRIENDLY_NAME);

        //console.log(idata);
        
        var resp1 = await ADS.ADSModule.ManageInstanceAsync(idata.InstanceID, ADS.sessionId);
        var ltoken = resp1.Result;
        //console.log(resp1);

        var Instance = await login(`${env.AMP_SERVER_URL}/API/ADSModule/Servers/${idata.InstanceID}/`, env.USERNAME, "", ltoken);
        var triggers = await Instance.Core.GetScheduleDataAsync();
        //console.log(triggers);

        var targetTrigger = triggers.PopulatedTriggers.find((a) => a.Description === env.EVENT_DESCRIPTION);
        if (targetTrigger) {
            var tresp = await Instance.Core.RunEventTriggerImmediatelyAsync(targetTrigger.Id, Instance.sessionId);
            //console.log(tresp);
        }

        console.log("Trigger sent!");
    }
    catch (err) {
        console.log(err);
    }
}

start();
