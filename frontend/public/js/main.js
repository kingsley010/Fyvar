$(document).ready(function() {



  $("#view").on('click', function() {

    let link = window.location.href;
    let name = link.slice(link.indexOf("?") + 1);

    
        $.ajax({
            url: 'http://localhost:3000/register?username='+ name,
            type: 'GET',
            cache: false,
            // data: data,
            success: function (data){
                if (`${data[0]}`.indexOf("profile")) {
                    $('#view-name').text(`${data[0]["username"]}`);
                    $('#view-profile').text(`${data[0]["profile"]}`);
                }
                else {
                    $('#view-name').text(`${data[0]["username"]}`);
                }
            }
    });

    
  })


//////////////////////////// Register Route ///////////////////////////////////////////////////////////////////////    

    $('#signup-btn').click(function () {

        let firstname = $('#firstname').val();
        let lastname = $('#lastname').val();
        let email = $('#email').val();
        let username = $('#username').val();
        let password = $('#password').val();
        let cpassword = $('#cpassword').val();

        let error;
        let errorr
        if(firstname === "" || lastname === "" || email === "" || username === "" || password === "" || cpassword === "") {
            error = true;
            document.getElementById('error').innerHTML = "Please fill in all fields";
        } 
        if (password !== cpassword) {
            errorr = true;
            document.getElementById('error').innerHTML = "Your passwords do not match";
        }

        if (!error && !errorr) {
            data = {
                firstname,
                lastname,
                email,
                username,
                password
            }
            $.ajax({
            url: 'http://localhost:3000/register',
            type: 'POST',
            cache: false,
            data: data,
            success: function () {
                window.location.href = 'logged.html?'+username;      
            },
          });
        } 
        else {
            console.log('error');   
             }
    });


//////////////////////////////////////// Login Route ///////////////////////////////////////////////////////////////

    $('#login-btn').click(function () {

        let username = $('#username').val();
        let password = $('#password').val();

        let error
        if(username === "" || password === "") {
            error = true;
            document.getElementById('error').innerHTML = "Please fill in both fields";
        } 

        if (!error) {
            // data = {
            //     username,
            //     password
            // }
            $.ajax({
                url: 'http://localhost:3000/register',
                type: 'GET',
                cache: false,
                // data: data,
                success: function (data) {
                    console.log(data);
                data.forEach(e => {
                    if ((e.username !== username) && (e.password !== password)) {
                        document.getElementById('error').innerHTML = "username or password is incorrect";
                    }
                    else {
                        window.location.href = 'logged.html?'+username;   
                    }
                });   
                },
            });
        }
        else {
            console.log(error);
        }
    });



    ////////////////////////////// Create Profile ///////////////////////////////////////////////////////////////////////

    
    $('#profile-btn').click(function () {

    let link = window.location.href;
    let name = link.slice(link.indexOf("?") + 1);

        let profyl = $('#profile').val();
        let error;
        if (profile === "") {
            error = true;
            alert("Please fill in the field before submitting or click outside this modal to exit");
        }
        if (!error) {
            $.ajax({
                url: 'http://localhost:3000/register?username='+ name,
                type: 'GET',
                cache: false,
                async: false,
                success: function (data) {
                    console.log(data);
                    let id = data[0]['id'],
                        firstname = data[0]['firstname'],
                        lastname = data[0]['lastname'],
                        email = data[0]['email'],
                        username = data[0]['username'],
                        password = data[0]['password'],
                        profile = profyl;

                    $.ajax({
                        url: 'http://localhost:3000/register/'+ id,
                        type: 'PUT',
                        cache: false,
                        async: false,
                        data: {id, firstname, lastname, email, username, password, profile },
                        success: function (data) {
                           
                            console.log("success");
                            window.location.href = 'logged.html?'+username
                        }
                    });
                }
            });
        }
    });



/////////////////////////////// View All Profiles ////////////////////////////////////////////////////

$('#view-profiles').click(function() {
    $.ajax({
        url: 'http://localhost:3000/register',
        type: 'GET',
        cache: false,
        success: function (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let username = data[i].username;
                let profile = data[i].profile;
                $('#mypreviews').append(
                    `<div style = "content: ""; display: table; clear: both;">
                    <div style = "float: left; width: 33.33%; padding: 10px; height: 300px;">
                    <img src="public/images/woman1.jpg" class="card-img-top" alt="..." style="height: 200px; width: 135px;">
                    <div>
                    <div style="background-color: rgb(40, 190, 103);">
                    <p class="card-title" style="color: black;">${username}</p>
                    <p class="card-title" style="color: black; font-weight: 400">${profile}</p>
                    </div>
                    </div>
                    </div>
                    </div>
                    `
                    )
            }
        }
    });
});



///////////////////////////////////////////////////Delete Profile/////////////////////////////////////////////////////////////////

$('#delete-btn').click(function () {

    let link =window.location.href;
    let name =link.slice(link.indexOf("?") + 1);
            $.ajax({
                url: 'http://localhost:3000/register?username='+ name,
                type: 'GET',
                cache: false,
                async: false,
                success: function (data) {
                    console.log(data);
                    let id = data[0]['id'],
                        firstname = data[0]['firstname'],
                        lastname = data[0]['lastname'],
                        email = data[0]['email'],
                        username = data[0]['username'],
                        password = data[0]['password'],
                        profile = "";

                    $.ajax({
                        url: 'http://localhost:3000/register/'+ id,
                        type: 'PUT',
                        cache: false,
                        async: false,
                        data: {id, firstname, lastname, username, email, password, profile },
                        success: function (data) {   
                            console.log("success");
                            window.location.href = 'logged.html?'+username
                        }
                    });
                }
            }); 
    });


////////////////////////////// Edit Profile ///////////////////////////////////////////////////////////////////////

    
$('#edit-btn').click(function () {

    let link =window.location.href;
    let name =link.slice(link.indexOf("?") + 1);

        let editprofyl = $('#edit-profile').val();
        let error;
        if (editprofyl === "") {
            error = true;
            alert("Please fill in the field before submitting or click outside this modal to exit");
        }
        if (!error) {
            $.ajax({
                url: 'http://localhost:3000/register?username='+ name,
                type: 'GET',
                cache: false,
                async: false,
                success: function (data) {
                    console.log(data);
                    let id = data[0]['id'],
                        firstname = data[0]['firstname'],
                        lastname = data[0]['lastname'],
                        email = data[0]['email'],
                        username = data[0]['username'],
                        password = data[0]['password'],
                        profile = editprofyl;

                    $.ajax({
                        url: 'http://localhost:3000/register/'+ id,
                        type: 'PUT',
                        cache: false,
                        async: false,
                        data: {id, firstname, lastname, email, username, password, profile },
                        success: function (data) {
                           
                            console.log("success");
                            window.location.href = 'logged.html?'+username
                        }
                    });
                }
            });
        }
    });



});

