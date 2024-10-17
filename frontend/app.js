document.addEventListener('DOMContentLoaded', function () {
    try {
        document.getElementById('loginForm').addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = document.getElementById("name");
            const password = document.getElementById("password");

            // Adjust the minimum password length alert
            if (password.value.length < 4) {
                return alert("Password should contain a minimum of 4 characters.");
            }

            // Send login request
            await fetch("http://localhost:4000/api/student/login", {
                method: "POST",
                body: JSON.stringify({ name: name.value, pass: password.value }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network doesn't work.");
                }
                return res.json();
            })
            .then(data => {
                if (data) {
                    window.location.href = `profile.html?name=${encodeURIComponent(data.name)}&class=${encodeURIComponent(data.stu_class)}`;
                } else {
                    alert("Login failed: " + data.message);
                }
            })
            .catch(err => {
                return alert("User not found..");
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

    if (sign_class.value < 1 || sign_class.value > 12) {
        return alert("Class should be between 1 and 12.");
    }
    if (password.value.length < 4) {
        return alert("Password should contain a minimum of 4 characters.");
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
            body: JSON.stringify(student),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res.ok) {
                throw new Error("Network doesn't work.");
            }
            return res.json();
        }).then(data => {
            alert("Data saved successfully...");
        }).catch(err => {
            return console.log("An error occurred: ", err);
        });
        name.value = "";
        sign_class.value = "";
        password.value = "";
        com_password.value = "";
    } else {
        return alert("Passwords do not match.");
    }
});
