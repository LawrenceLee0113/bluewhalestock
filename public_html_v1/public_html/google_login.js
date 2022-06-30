function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('googleUser: '+googleUser)
    // console.log("")
    // console.log("googleUser get id"+googleUser.getId())
    // console.log("googleUser isSignedIn"+googleUser.isSignedIn())
    // console.log("googleUser getHostedDomain"+googleUser.getHostedDomain())
    // console.log("googleUser GoogleUser.getGrantedScopes()"+googleUser.getGrantedScopes())
    // console.log("")
    id_token = googleUser.getAuthResponse().id_token
    // console.log(id_token)
    
    // console.log("")

    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    $.post("https://43.254.19.106:5107/google_login", {"token_id":id_token},
        function (data, textStatus, jqXHR) {
            console.log(data)
            if(data.user_id = googleUser.getId()){
                $(".container").hide();
                console.log("login seccuss")
            }
        },
        "json"
    );
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

console.log("import google js success")