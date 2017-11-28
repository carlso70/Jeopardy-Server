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
                if (data.authToken) {
                    console.log(JSON.stringify(data));
                    localStorage.setItem("token", data.authToken);
                }else {
                    alert("ERROR SIGNING IN");
                }
            });
    });

    $("#btnSearch").click(function() {
        var payload = {};
        var catTitle = $("#lg_catTitle").val();
        if (catTitle && catTitle.length > 0)
            payload.categoryTitle = catTitle;
        var dolValue = $("#lg_dollarValue").val();
        if (dolValue && dolValue.length > 0)
            payload.dollarValue = dolValue;
        var quesTxt = $("#lg_quesTxt").val();
        if (quesTxt && quesTxt.length > 0)
            payload.questionText = quesTxt;
        var ansTxt = $("#lg_ansTxt").val();
        if (ansTxt && ansTxt.length > 0)
            payload.answerText = ansTxt;
        var showNum = $("#lg_showNumber").val();
        if (showNum)
            payload.showNumber = showNum;
        var airDate = $("#lg_airDate").val();
        if (airDate)
            payload.airDate = airDate;

        var token = localStorage.getItem("token");
        if (token) {
            payload.auth = token;
        }

        var query = $.param(payload);
        var url = "http://localhost:8000/questions";
        if (query.length > 0) {
            url = url +"?"+ query;
        }
        console.log(url)
        fetch(url , {
            method: "GET",
        }).then(function(res){ return res.json(); })
            .then(function(data){
                if (data) {
                    var $table = $("#table");
                    $(function() {
                        $("#table").bootstrapTable("destroy");
                        $("#table").bootstrapTable({data: data});
                    });
                }
            });
    });
});
