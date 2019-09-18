$(document).ready(function() {
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
            window.location.href = 'logged.html';      
            },
          });
        } 
        else {
            console.log('error');   
             }
    });



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
                        window.location.href = 'logged.html';   
                    }
                });   
                },
            });
        }
        else {
            console.log(error);
        }
    });
});
