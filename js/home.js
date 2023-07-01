var current_page = 1;
var records_per_page = 4;
var blog_data = [];
function sortByNumber(objects) {
    // Create a comparator function that compares the numbers in the objects.
    const comparator = (a, b) => {
      // Get the numbers from the objects.
      const numberA = a.post_number;
      const numberB = b.post_number;
  
      // Return the difference between the numbers, negated so that the sort is in descending order.
      return numberB - numberA;
    };
  
    // Sort the objects by the number property, in descending order.
    return objects.sort(comparator);
  }
function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listing-table");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
    
    for (
        var i = (page - 1) * records_per_page;
        i < page * records_per_page;
        i++
    ) {
        try{
        console.log(i);
        if (!blog_data[i].key){
            return
        }
        listing_table.innerHTML += `
         
        <div class="post-preview">
                                <a  href="javascript:redirectTo('${blog_data[i].key}')" 
                                    ><h2 class="post-title">
                                        ${blog_data[i].title}
                                    </h2></a
                                >
                                <p class="post-meta">
                                    Posted by
                                    Admin
                                    on ${blog_data[i].time}
                                </p>
                            </div>
                            <!-- Divider-->
                            <hr class="my-4" />`;}
        catch (error){
            console.error(error)
            break;
        }
    }
    
    listing_table.innerHTML += `<div class="d-flex" style="justify-content: space-around">
<div class="d-flex justify-content-end">
    <a
        class="btn btn-primary text-uppercase"
        href="javascript:prevPage()"
        id="btn_prev"
        >&larr; Newer Posts</a
    >
</div>
<div class="d-flex justify-content-start">
    <a
        class="btn btn-primary text-uppercase"
        href="javascript:nextPage()"
        id="btn_next"
        >Older Posts &rarr;</a
    >
</div>
</div><br>


`;
    console.log(page);
    if (page == 1) {
        document.getElementById("btn_prev").style.visibility = "hidden";
    } else {
        document.getElementById("btn_prev").style.visibility = "visible";
    }

    if (page == numPages()) {
        document.getElementById("btn_next").style.visibility = "hidden";
    } else {
        document.getElementById("btn_next").style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(blog_data.length / records_per_page);
}


function redirectTo(id) {
    localStorage.setItem('blog_id', id)
    window.location = 'post.html'
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

firebase
    .database()
    .ref("/blogs")
    .on("value", function (snapshot) {
        blog_data = []
        count = 0
        document.getElementById("listing-table").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childval = childSnapshot.val();
            childval['key'] = childSnapshot.key
            blog_data.push(childval);
            count++

        });
        blog_data = sortByNumber(blog_data)
        
        changePage(1);
        if (count == 0){
            document.getElementById("listing-table").innerHTML = "No posts found";
        }
    });
