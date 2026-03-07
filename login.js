const nameEl = document.getElementById('username')
const passwordEl = document.getElementById('pass')
const signInEl = document.getElementById('sign-in')

signInEl.addEventListener('click', (e) => {
    e.preventDefault()

    nameInput = nameEl.value
    passwordInput = passwordEl.value

    if(nameInput === 'admin' && passwordInput === 'admin123'){
        alert('Login Successfull')

        window.location.assign('./home.html')
    }
    else {
        alert('Invalid Username or Password')
        return  
    }
})