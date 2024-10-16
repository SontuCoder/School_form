document.addEventListener('DOMContentLoaded', function () {
    try {
        document.getElementById('loginForm').addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = document.getElementById("name");
            const password = document.getElementById("password");
            if(password.value.length()<8){
                return alert("Password should be contained minimum 8 charecter.")
            }
            const stu = {
                name: name.value,
                password: password.value
            };
            await fetch("http://localhost:4000/api/student/login", {
                body: {
                    student
                }
            }).then(res => {
                if (!res.ok) {
                    throw new Error("Network doesn't work.");
                }
                return res.json();
            }).then(data => {
                console.log(data);
            }).catch(err => {
                return console.log("an error:- ", err);
            });
            name.value = "";
            password.value = "";
        });
    } catch (err) {
        console.error(err);
    }
});

document.getElementById('sign_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById("sign_name");
    const password = document.getElementById("sign_password");
    const sign_class = document.getElementById("sign_class");
    const com_password = document.getElementById("sign_confirm_password");

    if(sign_class.value<1 && sign_class.value>12){
        return alert("Class should be between 1 - 12");
    }
    if(password.value.length()<8){
        return alert("Password should be contained minimum 8 charecter.")
    }
    if (password.value === com_password.value) {
        const student = {
            name: name.value,
            stu_class: sign_class.value,
            pass: password.value,
            c_pass: com_password.value
        };
        await fetch("http://localhost:4000/api/student/signup", {
            method: 'post',
            body: {
                student
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error("Network doesn't work.");
            }
            return res.json();
        }).then(data => {
            console.log(data);
        }).catch(err => {
            return console.log("an error:- ", err);
        });
        name.value = "";
        sign_class.value = "";
        password.value = "";
        com_password.value = "";
    }
    else{
        return alert("passwords are not matched.")
    }
});
