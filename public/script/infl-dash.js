// const { type } = require("os");

$(document).ready(function(){
    $("#spnpost").html("");
    $("#txtemail").val(localStorage.getItem("activeuser"))
    $("#updemail").val(localStorage.getItem("activeuser"));
    $("#lgout").click(function(){
        localStorage.removeItem("activeuser");
        location.href="index.html";
    })
    $("#btnpost").click(function(){
        let obj={
            type:'post',
            url:'/post-process',
            data:{
                txtemail:localStorage.getItem("activeuser"),
                txttitle:$("#txttitle").val(),
                date:$("#date").val(),
                txttime:$("#txttime").val(),
                txtcity:$("#txtcity").val(),
                txtvenue:$("#txtvenue").val()
            }
        }
        $.ajax(obj).done(function(res){
            $("#spnpost").html(res);
        }).fail(function(err){
            alert(err.statusText)
        })
    })
    $("#btnupd").click(function(){
        // alert();
        
        // if($("#newpwd").val()==$("#newpwd2").val()){
            // alert();
            alert($("#oldpwd").val());
            let obj={
                type:'post',
                url:'/pwd-process',
                data:{
                    email:$("#updemail").val(),
                    npwd:$("#newpwd").val(),
                    opwd:$("#oldpwd").val()
                    
                }
            }
            $.ajax(obj).done(function(result){
                $("#spnpt").html(result);
    
            }).fail(function(err){
                alert(err.statusText);
            })
        // }
        // else{
        //     $("#spnnew").html("Passwords Don't Match")
        // }
        

    })
});