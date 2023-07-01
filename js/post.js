var blog_id = localStorage.getItem('blog_id')
if (blog_id == null) {
    window.location = 'index.html'
}
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
var data;
var list = []
firebase
    .database()
    .ref("/blogs/")
    .on("value", function (snapshot) {
        list = []
        snapshot.forEach(function (childSnapshot) {
            list.push(childSnapshot.key)
            if (childSnapshot.key == blog_id){
                data = childSnapshot.val()
            }

        });
        if (! list.includes(blog_id)){
            window.location = 'index.html'
        }
        document.getElementById('heading').innerText = data.title
        document.getElementById('desc').innerText = data.desc
        document.getElementById('time').innerText = data.time
        document.getElementById('content').innerText = data.content
        document.getElementById('header').style.backgroundImage = `url(${data.img})`
        //End code
    });

