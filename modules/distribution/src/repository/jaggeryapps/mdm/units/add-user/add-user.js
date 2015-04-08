/**
 * Returns the state to be viewed by add-user page.
 * 
 * @param context
 * @returns {*} A context object that returns the next state of this page to be presented
 */
function onRequest(context){
    var carbon = require('carbon');
    var tenantId = carbon.server.tenantId();
    var url = carbon.server.address('https') + "/admin/services/";
    var server = new carbon.server.Server(url);
    var userManager = new carbon.user.UserManager(server, tenantId);

    var allRoles = userManager.allRoles();

    var i = 0;
    var filteredRoles = [];
    while(allRoles[i]) {
        if (allRoles[i] != "Internal/subscriber" && allRoles[i] != "Internal/everyone") {
            filteredRoles.push(allRoles[i]);
        }
        i++;
    }

    context.roles = filteredRoles;
    return context;
}