var express = require("express");
var mysql2 = require("mysql2");
var nodemailer = require("nodemailer");
var fileupload = require("express-fileupload");
var crypto = require("crypto");
let app = express();
app.listen(3132, function () {
    console.log("server started at 3132 ===>");
})
app.use(express.static("public"));
app.use(express.urlencoded("true"));
app.use(fileupload());
// let config = {
//     host: "127.0.0.1",
//     user: "root",
//     password: "MySql@2291",
//     database: "project",
//     dateStrings: true
// }
let config = {
    host: "bvtn6xeldxhhc7sladvj-mysql.services.clever-cloud.com",
    user: "uymgl8s6d5ixt1hs",
    password: "uymgl8s6d5ixt1hs",
    database: "bvtn6xeldxhhc7sladvj",
    dateStrings: true,
    keepAliveInitialDelay:10000,
    enableKeepAlive:true,
}
// git init
// git remote add origin https://github.com/Jarvis10001/influbonza.git    (your repository link)
//  git add .
// git commit -m "done"
//  git push (then real line will come)
var mysql = mysql2.createConnection(config);
mysql.connect(function (err) {
    if (err == null) {
        console.log("Connected To Database Successfulllyyyy");
    }
    else {
        console.log(err.message + "   #######");
    }
});
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'mailer100001@gmail.com',
        pass: 'tenj xxln rnzm crzz'
    }
});

//=================================================
//=================================================

app.post("/", function (req, resp) {
    let path = __dirname + "/public/index3.html";
    resp.sendFile(path);
})
app.post("/signup-process", function (req, resp) {
    let txtemail = req.body.txtemail;
    let txtpwd = req.body.txtpwd;
    let txtfname = req.body.txtfname;
    let txtlname = req.body.txtlname;
    let utype = req.body.utype;

    mysql.query("insert into users values(?,?,?,?,?,?)", [txtemail, txtpwd, txtfname, txtlname, utype, 1], function (err) {
        if (err == null) {
            resp.send("Signed Up Successfully");
        }
        else {
            resp.send(err.message);
        }
    })
})
app.post("/login-process", function (req, resp) {
    let txtemaillgn = req.body.txtemaillgn;
    let txtpwdlgn = req.body.txtpwdlgn;
    // if(txtemaillgn=='admin@gmail.com'){
    //     mysql.query("select * from users where email=?",[txtemaillgn],function(err,result){
    //         if(err!=null){
    //             resp.send(err.message);
    //             return;
    //         }
    //         // if(result[0].pwd==txtpwdlgn)
    //         // resp.send('admin');
    //         resp.send(result);

    //     })
    // }

    mysql.query("select * from users where email=? and pwd=?", [txtemaillgn, txtpwdlgn], function (err, jsonary) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        resp.send(jsonary);
    })
})

app.get("/kuch", function (req, resp) {
    let path = __dirname + "/public/infl-dash.html"
    resp.sendFile(path);
})
app.get("/kuch2", function (req, resp) {
    let path = __dirname + "/public/admin-dash.html"
    resp.sendFile(path);
})

app.get("/infl-profile", function (req, resp) {
    let path = __dirname + "/public/infl-profile.html";
    resp.sendFile(path);
})
app.post("/submit-process", function (req, resp) {
    let ppic = "";
    if (req.files != null) {
        ppic = req.files.ppicsrc.name;
        let path = __dirname + "/public/uploaded/" + ppic;
        req.files.ppicsrc.mv(path);
    } else {
        ppic = "nopic.jpg";
    }

    let txtemail = req.body.txtemail;
    let txtname = req.body.txtname;
    let txtgender = req.body.txtgender;
    let dob = req.body.dob;
    let txtadd = req.body.txtadd;
    let txtcity = req.body.txtcity;
    let txtno = req.body.txtno;
    let ary = req.body.fields;
    let txtinsta = req.body.txtinsta;
    let txtface = req.body.txtface;
    let txtyou = req.body.txtyou;
    let txtinfo = req.body.txtinfo;
    let str = "";
    if (Array.isArray(ary)) {
        for (i = 0; i < ary.length; i++) {
            str += ary[i] + ",";
        }
    }
    else {
        str = ary;
    }

    mysql.query("insert into info values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [txtemail, txtname, txtgender, dob,
        txtadd, txtcity, txtno, str, txtinsta, txtface, txtyou, txtinfo, ppic], function (err, result) {
            if (err != null) {
                resp.send(err.message);
                console.log(err.message);
                return;
            }
            console.log(result);
            // resp.send(result);
            resp.redirect("result.html")

        })

})
app.post("/submit-process-user", function (req, resp) {
    let ppic = "";
    if (req.files != null) {
        ppic = req.files.ppicsrc.name;
        let path = __dirname + "/public/uploaded/" + ppic;
        req.files.ppicsrc.mv(path);
    } else {
        ppic = "nopic.jpg";
    }

    let txtemail = req.body.txtemail;
    let txtname = req.body.txtname;
    let txtgender = req.body.txtgender;
    let dob = req.body.dob;
    let txtadd = req.body.txtadd;
    let txtcity = req.body.txtcity;
    let txtno = req.body.txtno;
    let txtorg=req.body.txtorg;
    // let ary = req.body.fields;
    // let txtinsta = req.body.txtinsta;
    // let txtface = req.body.txtface;
    // let txtyou = req.body.txtyou;
    // let txtinfo = req.body.txtinfo;
    // let str = "";
    // if (Array.isArray(ary)) {
    //     for (i = 0; i < ary.length; i++) {
    //         str += ary[i] + ",";
    //     }
    // }
    // else {
    //     str = ary;
    // }

    mysql.query("insert into uinfo values(?,?,?,?,?,?,?,?,?)", [txtemail, txtname, txtgender, dob,
        txtadd, txtcity, txtno, ppic,txtorg], function (err, result) {
            if (err != null) {
                resp.send(err.message);
                // console.log(err.message);
                return;
            }
            // console.log(result);
            // resp.send(result);
            resp.redirect("result.html")


        })

})
app.post("/update-process", function (req, resp) {
    let ppic = "";
    if (req.files != null) {
        ppic = req.files.ppicsrc.name;
        let path = __dirname + "/public/uploaded/" + ppic;
        req.files.ppicsrc.mv(path);
    } else {
        ppic = req.body.hdn;
    }

    let txtemail = req.body.txtemail;
    let txtname = req.body.txtname;
    let txtgender = req.body.txtgender;
    let dob = req.body.dob;
    let txtadd = req.body.txtadd;
    let txtcity = req.body.txtcity;
    let txtno = req.body.txtno;
    let ary = req.body.fields;
    let txtinsta = req.body.txtinsta;
    let txtface = req.body.txtface;
    let txtyou = req.body.txtyou;
    let txtinfo = req.body.txtinfo;
    let str = "";
    console.log(ppic);
    if (Array.isArray(ary)) {
        for (i = 0; i < ary.length; i++) {
            str += ary[i] + ",";
        }
    }
    else {
        str = ary;
    }
    // console.log(hdn);

    mysql.query("update info set name=?, gender=?, dob=?, address=?, city=?, mobile=?, fields=?, insta=?, face=?, you=?, info=?, pic=? where email=?", [txtname, txtgender, dob, txtadd, txtcity, txtno, str, txtinsta, txtface, txtyou, txtinfo, ppic, txtemail], function (err, result) {
        if (err == null) {
            if (result.affectedRows >= 1) {
                // resp.send("record Updated");
            resp.redirect("result.html");

            }
            else {
                resp.send("INVALID ID")
            }
        }
        else {
            resp.send(err.message);
        }
    })
})
app.post("/update-process-user", function (req, resp) {
    let ppic = "";
    if (req.files != null) {
        ppic = req.files.ppicsrc.name;
        let path = __dirname + "/public/uploaded/" + ppic;
        req.files.ppicsrc.mv(path);
    } else {
        ppic = req.body.hdn;
    }

    let txtemail = req.body.txtemail;
    let txtname = req.body.txtname;
    let txtgender = req.body.txtgender;
    let dob = req.body.dob;
    let txtadd = req.body.txtadd;
    let txtcity = req.body.txtcity;
    let txtno = req.body.txtno;
    let txtorg=req.body.txtorg;

    // let ary = req.body.fields;
    // let txtinsta = req.body.txtinsta;
    // let txtface = req.body.txtface;
    // let txtyou = req.body.txtyou;
    // let txtinfo = req.body.txtinfo;
    // let str = "";
    console.log(ppic);
    // if (Array.isArray(ary)) {
    //     for (i = 0; i < ary.length; i++) {
    //         str += ary[i] + ",";
    //     }
    // }
    // else {
    //     str = ary;
    // }
    // console.log(hdn);

    mysql.query("update uinfo set name=?, gender=?, dob=?, address=?, city=?, mobile=?, pic=?,org=? where email=?", [txtname, txtgender, dob, txtadd, txtcity, txtno,ppic,txtorg, txtemail], function (err, result) {
        if (err == null) {
            if (result.affectedRows >= 1) {
                // resp.send("record Updated");
            resp.redirect("result.html")

            }
            else {
                resp.send("INVALID ID")
            }
        }
        else {
            resp.send(err.message);
        }
    })
})
app.post('/search-process', function (req, resp) {
    let txtemail = req.body.txtemail;

    mysql.query("select * from info where email=?", [txtemail], function (err, result) {
        if (err != null) {
            resp.send(err.message);
        }
        resp.send(result);
    })
})
app.post('/search-process-user', function (req, resp) {
    let txtemail = req.body.txtemail;

    mysql.query("select * from uinfo where email=?", [txtemail], function (err, result) {
        if (err != null) {
            resp.send(err.message);
        }
        resp.send(result);
    })
})
app.post("/post-process", function (req, resp) {

    let txtemail = req.body.txtemail;
    let txttitle = req.body.txttitle;
    let date = req.body.date;
    let txttime = req.body.txttime;
    let txtcity = req.body.txtcity;
    let txtvenue = req.body.txtvenue;

    mysql.query("insert into events values(NULL,?,?,?,?,?,?)", [txtemail, txttitle, date, txttime, txtcity, txtvenue], function (err, result) {
        if (err != null) {
            resp.send(err.message);
        }
        resp.send("Booking Posted");
    })
})
let otparr = {};
app.post("/mail-otp", function (req, resp) {
    let txtemail = req.body.txtemail;
    let otp = generateOTP();
    console.log(otp);
    console.log(txtemail);
    otparr[txtemail] = otp;
    let mailOptions = {
        from: '"influencer dash👻" <mailer100001@gmail.com>',
        to: txtemail,
        subject: "Forgot Password",
        text: `your otp isss ${otp}`
    }
    transporter.sendMail(mailOptions, function (err, result) {
        // alert();
        if (err != null) {
            console.log(err.message);
            return;
        }
        // alert();
        // console.log("abas");
        console.log("Email sent to:", result.response);
        resp.send("Otp Sent....");
    })
})
function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
}
app.post("/check-otp", function (req, resp) {
    let check = req.body.otpp;
    let txtemail = req.body.txtemail;
    console.log(otparr[txtemail]);
    console.log(txtemail);
    if (check === otparr[txtemail]) {
        resp.send("true");
        console.log("true");
        delete otparr[txtemail];
    }
    else {
        resp.send("false");
        console.log("false");
    }
})
app.get("/admin-users", function (req, resp) {
    let path = __dirname + "/public/admin-users.html"
    resp.sendFile(path);
})
app.get("/fetch-all", function (req, resp) {
    mysql.query("select * from users", function (err, resultary) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        resp.send(resultary);
    })
})
app.post("/pwd-process", function (req, resp) {
    let email = req.body.email;
    let npwd = req.body.npwd;
    let opwd = req.body.opwd;

    mysql.query("select pwd from users where email=?", [email], function (err, result) {
        console.log(result);
        console.log(result[0].pwd);
        console.log(opwd);

        if (err !== null) {
            resp.send(err.message);
        }

        if (opwd === result[0].pwd) {
            console.log("reached");

            mysql.query("update users set pwd=? where email=?", [npwd, email], function (err, result) {

                if (err != null) {
                    resp.send(err.message);
                    return;
                }
                resp.send("password Updated");
            })
        }
        else {
            resp.send("old password in Incorrect");
        }
    })
})
app.get("/influ-users", function (req, resp) {
    let path = __dirname + "/public/admin-all-influ.html";
    resp.sendFile(path);
})
app.get("/fetch-form", function (req, resp) {
    mysql.query("select * from info", function (err, result) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        resp.send(result);
    })
})
app.get("/do-block", function (req, resp) {
    mysql.query("update users set status=0 where email=?", [req.query.email], function (err, result) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        resp.send("successfully blocked");
    })
})
app.get("/do-unblock", function (req, resp) {
    mysql.query("update users set status=1 where email=?", [req.query.email], function (err, result) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        resp.send("successfully unblocked");
    })
})
app.get("/do-delete", function (req, resp) {
    mysql.query("delete from users where email=?", [req.query.email], function (err, result) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        resp.send("successfully deleted");
    })
})

app.get("/search-influ", function (req, resp) {
    let name = "%" + req.query.name + "%";
    let field = "%" + req.query.field + "%";
    let city = "%" + req.query.city + "%";
    console.log(name);
    console.log(city);
    console.log(field);
    // resp.send("done");
    if (name != "%undefined%" && field != "%undefined%" && city != "%undefined%") {
        mysql.query("select * from info where name like ? and city like ? and fields like ?", [name, city, field], function (err, result) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(result);
        })
    }
    else if (name != "%undefined%" && city != "%undefined%") {
        mysql.query("select * from info where name like ? and city like ?", [name, city], function (err, result) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(result);
        })
    }
    else if (name != "%undefined%" && field != "%undefined%") {
        mysql.query("select * from info where name like ? and fields like ?", [name, field], function (err, result) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(result);
        })
    }
    else if (city != "%undefined%" && field != "%undefined%") {
        mysql.query("select * from info where city like ? and fields like ?", [city, field], function (err, result) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(result);
        })
    }
    else if (name != "%undefined%") {
        mysql.query("select * from info where name like ? ", [name], function (err, result) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(result);
        })
    }
    else if (city != "%undefined%") {
        mysql.query("select * from info where city like ?", [city], function (err, result) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(result);
        })
    }
    else if (field != "%undefined%") {
        mysql.query("select * from info where fields like ?", [field], function (err, result) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(result);
        })
    }
})
app.get("/kuch3", function (req, resp) {
    let path = __dirname + "/public/influ-finder.html";
    resp.sendFile(path);
})
app.get("/get-city", function (req, resp) {
    let email = "%" + req.query.field + "%";
    mysql.query("select distinct city from info where fields like ?", [email], function (err, result) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        resp.send(result);
    })
})
app.get("/get-events", function (req, resp) {
    let email = req.query.email;
    mysql.query("select * from events where email=?", [email], function (err, result) {
        if (err != null) {
            resp.send(err.message);
            return
        }
        resp.send(result);
    })
})
app.get("/man-book", function (req, resp) {
    let path = __dirname + "/public/manage-bookings.html";
    resp.sendFile(path);
})
app.get("/do-delete-event", function (req, resp) {
    let id = req.query.id;
    mysql.query("delete from events where id=?", [id], function (err, result) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        resp.send(result);
    })
})
app.post("/check-sub", function (req, resp) {
    let txtemail = req.body.txtemail;
    // console.log(txtemail);
    mysql.query("select * from info where email=?",[txtemail], function (err, result) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        // console.log(result);
        // console.log(result.returnedRows);
        // if (result. == 0) {
        //     resp.send("0");
        // }
        // else{
        //     resp.send("1")
        // }
        if(result.length>=1){
            resp.send("1")
        }
        else{
            resp.send("0");

        }
    })
})
app.post("/check-sub-user",function(req,resp){
    let txtemail=req.body.txtemail;
    mysql.query("select * from uinfo where email=?",[txtemail],function(err,result){
        if(err!=null){
            resp.send(err.message);
            return;
        }
        if(result.length>=1){
            resp.send("1")
        }
        else{
            resp.send("0");

        }
    })
})
app.get("/user-profile",function(req,resp){
    let path=__dirname+"/public/user-prof.html";
    resp.sendFile(path);
})
// app.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         // let path=;
//         res.redirect(__dirname+"/public/index.html");
//     });
// });
app.post("/mail-msg", function (req, resp) {
    // let txtemail = req.body.txtemail;
    
    let mailOptions1 = {
        from: '"influencer dash👻" <req.body.face>',
        to: "mailer100001@gmail.com",
        subject: "Get In Touch",
        text: `akefhsoisrgu`
    }
    transporter.sendMail(mailOptions1, function (err, result) {
        // alert();
        if (err != null) {
            console.log(err.message);
            return;
        }
        // alert();
        // console.log("abas");
        console.log("Email sent to:", result.response);
        resp.send("Otp Sent....");
    })
})