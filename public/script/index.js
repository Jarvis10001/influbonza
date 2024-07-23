$(document).ready(function(){
    $("#spnemail").html("");
    $("#spnpwd").html("");
    $("#spnsignup").html("");
    $("#spnlogin").html("");
    $("#txtemail").blur(function(){
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        let email=$(this).val();
        if(pattern.test(email)==true){
            $("#spnemail").html("");
            $("#txtemail").removeClass("is-invalid")  
            // $("#validemail").addClass("was-validated");
        }
        else{
            $("#txtemail").addClass("is-invalid")
            // $("#spnemail").html("Enter Valid Email Address!! ");
        }
    });
    $("#txtpwd").blur(function(){
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        let pwd=$(this).val();
        if(regularExpression.test(pwd)==true){
            $("#spnpwd").html("");
            $("#txtpwd").removeClass("is-invalid")
        }
        else{
            // $("#spnpwd").html("Pass weak");
            $("#txtpwd").addClass("is-invalid");
        }
    })
    $("#btnsignup").click(function(){
        let obj={
            type:'post',
            url:'/signup-process',
            data:{
                txtemail:$("#txtemail").val(),
                txtpwd:$("#txtpwd").val(),
                txtfname:$("#txtfname").val(),
                txtlname:$("#lname").val(),
                utype:$("#utype").val()
            }
        }
        $.ajax(obj).done(function(resp){
            $("#spnsignup").html(resp);
        }).fail(function(err){
            alert(err.statusText);
        })
    })
    // $("#btnlogin").click(function(){
    //     // alert();
    //     let obj={
    //         type:'post',
    //         url:'/login-process',
    //         data:{
    //             txtemaillgn:$("#txtemaillgn").val(),
    //             txtpwdlgn:$("#txtpwdlgn").val()
    //         }
    //     }
    //     $.ajax(obj).done(function(jsonary){
    //         // alert();
    //         if(jsonary.length==0){
    //             $("#spnlogin").html("Invalid Email/Password");
    //             return;
    //         }
    //         let utype=jsonary[0].utype;
    //         if(jsonary[0].status==1){
    //             // alert("1");
    //             // alert()
    //             $("#spnlogin").html(`Logged in as ${utype}`);
    //             if(utype=="Influencer"){
    //                 location.href="infl-dash.html"
    //                 localStorage.setItem("activeuser",$("#txtemaillgn").val());
    //             }
    //             else if(utype=="admin"){
    //                 location.href="admin-dash.html";
    //                 localStorage.setItem("activeuser",$("#txtemaillgn").val());
    //             }
    //             // else if(utype=="Recruiter"){
    //             //     location.href="user-dash.html";
    //             //     localStorage.setItem("activeuser",$("#txtemaillgn").val());
    //             // }
                

    //         }   

    //         }).fail(function(err){
    //         alert(err.statusText);
    //     });
    // })
    $("#btneye1").click(function(){
        if($("#txtpwdlgn").prop("type")=="password"){
            $("#txtpwdlgn").prop("type","text");
            $("#eye").addClass("fa-eye").removeClass("fa-eye-slash");

        }
        else if($($("#txtpwdlgn").prop("type")=="text")){
            $("#txtpwdlgn").prop("type","password");
            $("#eye").addClass("fa-eye-slash").removeClass("fa-eye");
        }
    })
    $("#btneye").click(function(){
        if($("#txtpwd").prop("type")=="password"){
            $("#txtpwd").prop("type","text");
            $("#eye1").addClass("fa-eye").removeClass("fa-eye-slash");

        }
        else if($($("#txtpwd").prop("type")=="text")){
            $("#txtpwd").prop("type","password");
            $("#eye1").addClass("fa-eye-slash").removeClass("fa-eye");
        }
    })
    // ====================================================
    // ====================================================
    // ====================================================
    $("#aj").click(function(){
        let obj={
            type:"post",
            url:"/mail-otp",
            data:{
                txtemail:$("#otpemail").val(),
            }
        }
        $.ajax(obj).done(function(resp){
            $("#otpspn").html(resp);
        }).fail(function(err){
            alert(err.statusText);
        })
    })
    $("#chkotp").click(function(){
        let obj={
            type:'post',
            url:'/check-otp',
            data:{
                otpp:$("#txtotp").val(),
                txtemail: $("#otpemail").val()
            }
        }
        $.ajax(obj).done(function(resp){
            alert(resp);
            if(resp==="true"){
                
                $("#newpwd").prop("type","text");
                $("#dis").css("display", "block");
                alert("true");
            }
            else{
                $("#incotp").html("Incorrect Otp");
                // alert("falseeeeeeeeeeeeeeee");
            }
        }).fail(function(err){
            alert(err.statusText);
        })
    })

});