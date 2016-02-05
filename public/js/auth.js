var CLIENT_ID = '433275033379-h1vbmg66vsrno3k6mp2pkcra9aju7m61.apps.googleusercontent.com';

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
        initializeView();
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

/**
 * init marionette routes & view:
 */
function initializeView() {
    initWorkspace();
}