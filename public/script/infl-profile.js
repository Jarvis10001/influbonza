$(document).ready(function () {

    $("#txtemail").val(localStorage.getItem("activeuser"));
    $("#searchspn").html("");
    // $("#updt").click(function(){
    // alert()
    let obj1 = {
        type: 'post',
        url: '/check-sub',
        data: {
            txtemail: localStorage.getItem("activeuser")
        }
    }
    // alert()
    $.ajax(obj1).done(function (result) {
        // alert() //this alert not
        // alert(JSON.stringify(result));
        if (result== "0") {
            // alert("sub work")
            // alert()
            $("#updta").css("display", "none");
        }
        else {
            $("#subm").css("display", "none");
            // alert("updt work")

            let obj = {
                type: 'post',
                url: '/search-process',
                data: {
                    // txtname: $("#txtname").val(),
                    // txtgender: $("#txtgender").val(),
                    // dob: $("#dob").val(),
                    // txtadd: $("#txtadd").val(),
                    // txtcity: $("#txtcity").val(),
                    // txtno: $("#txtno").val(),
                    // str: $("#str").val(),
                    // txtinsta: $("#txtinsta").val(),
                    // txtface: $("#txtface").val(),
                    // txtyou: $("#txtyou").val(),
                    // txtinfo: $("#txtinfo").val(),
                    // ppic: $("#ppic").val(),
                    txtemail: localStorage.getItem("activeuser")
                }
            }
            $.ajax(obj).done(function (jsonary) {
                if (jsonary.length == 0) {
                    $("#searchspn").html("Invalid email");
                    return;
                }
                else {
                    let str = jsonary[0].fields;
                    let ary = $.map(str.split(','), function (word) {
                        return $.trim(word);
                    })
                    $("#txtname").val(jsonary[0].name);
                    $("#txtgender").val(jsonary[0].gender);
                    $("#dob").val(jsonary[0].dob);
                    $("#txtadd").val(jsonary[0].address);
                    $("#txtcity").val(jsonary[0].city);
                    $("#txtno").val(jsonary[0].mobile);
                    $("#fields").val(ary);
                    $("#txtinsta").val(jsonary[0].insta);
                    $("#txtface").val(jsonary[0].face);
                    $("#txtyou").val(jsonary[0].you);
                    $("#txtinfo").val(jsonary[0].info);
                    $("#ppic").val(jsonary[0].pic);
                    $("#txtemail").val(jsonary[0].email);
                    $("#ppic").prop("src", "uploaded/" + jsonary[0].pic)
                    $("#hdn").val(jsonary[0].pic);
                    // $("#searchspn").html("Data Retreived");
                    $("#searchspn").html("Data Retreived");
                }
            }).fail(function (err) {
                alert(err.statusText);
            })
        }
    })
    // })
    // $("#updt").trigger("click");
});