$(document).ready(function() {
    $('#signup-btn').click(function () {

        let firstname = $('#firstname').val();
        let lastname = $('#lastname').val();
        let email = $('#email').val();
        let username = $('#username').val();
        let password = $('#password').val();
        let cpassword = $('#cpassword').val();
        let profile = $('#profile').val();

        let error;
        if(firstname === "" || lastname === "" || email === "" || username === "" || password === "" || cpassword === "") {
            error = true;
        }

        if (!error) {
            data = {
                firstname,
                lastname,
                email,
                username,
                password,
                profile
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
});
