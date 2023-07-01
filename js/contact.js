const firebaseConfig = {
    apiKey: "AIzaSyD3fMRcD57S9uYrF_DNxk9eL6iEDTrqzRg",
    authDomain: "blog-18b3c.firebaseapp.com",
    databaseURL: "https://blog-18b3c-default-rtdb.firebaseio.com",
    projectId: "blog-18b3c",
    storageBucket: "blog-18b3c.appspot.com",
    messagingSenderId: "93500729847",
    appId: "1:93500729847:web:b6212053a76428e52126f2",
};

firebase.initializeApp(firebaseConfig);

function send() {
    
    name_user = document.getElementById('name').value
    email = document.getElementById('email').value
    phone = document.getElementById('phone').value
    message = document.getElementById('message').value
    
    if (name_user == "" || email == "" || phone == "" || message == ""){
        document.getElementById('blank').innerHTML = `<div class="text-center mb-3">
        <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
        >
            Please fill all the fields
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    </div>`
        document.getElementById('submitSuccessMessage').style.display = 'none'
        document.getElementById('blank').style.display = 'block'
        return
    }
    firebase.database().ref("/contact").push({
        name: name_user,
        message: message,
        phone: phone,
        email : email,
    });
    document.getElementById('blank').style.display = 'none'
    document.getElementById('submitSuccessMessage').innerHTML = `                                    <div class="text-center mb-3">
    <div
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
    >
        <strong>Successfull!</strong> Your
        Request has been recorder we will soon reply
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
    </div>
</div>`
    document.getElementById('submitSuccessMessage').style.display = 'block'
}