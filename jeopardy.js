$(document).ready(function(){
    $("#btnSignIn").click(function() {
        var username = $("#lg_username").val();
        var password = $("#lg_password").val();
        var payload = {
            userID: username,
            password: password
        };

        fetch("http://localhost:8000/auth/signin", {
            method: "POST",
            headers: {
                'Accept':'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        }).then(function(res){ return res.json(); })
            .then(function(data){
                console.log(JSON.stringify(data))
            })
    });
});
