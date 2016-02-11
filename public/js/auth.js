var CLIENT_ID = '327428769696-ua3t49lhe5k6htuki1o4dqlovav6c46f.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/tasks'];

var ACCESS_TOKEN;

function saveToke(access_token) {
    ACCESS_TOKEN = access_token;
    Backbone.$.ajaxSetup({
        headers: {'authorization': 'Bearer ' + access_token}
    });
}
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        saveToke(authResult.access_token);
        var token = {
            access_token: authResult.access_token,
            expires_in  : authResult.expires_in,
            state       : authResult.state
        };
        gapi.auth.setToken(token);
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        initApp();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
    return false;
}