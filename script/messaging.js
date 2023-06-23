// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, onChildAdded , ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAjyH7V8LBCcE0Wdt9Qb42Ii-cwUcgjOc",
    authDomain: "file-select-fusion-support.firebaseapp.com",
    databaseURL: "https://file-select-fusion-support-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "file-select-fusion-support",
    storageBucket: "file-select-fusion-support.appspot.com",
    messagingSenderId: "1016905256934",
    appId: "1:1016905256934:web:d6da4f1306cfcc9a625027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


var db = getDatabase(app);



var user_id = "admin";
var _receiver = localStorage.getItem('user');
var mess_of = _receiver;


//init
var initialized = false;
var messages_holder = document.getElementById("messages");
// Reference to the 'mess' location
const messDataRef = ref(db, '/mess/' + mess_of);
var mess_dic;

// Retrieve the data from Firebase
get(messDataRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();

            // Now you have the Firebase data in the 'data' variable
            // You can proceed to access and manipulate it as needed

            // Example: Accessing the child parts of 'mess'

            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const child = data[key];
                    add_child_to_mess_list(child);
                }
            }
        } else {
            console.log("No data available.");
        }
    })
    .catch((error) => {
        console.error("Error retrieving Firebase data:", error);
    });


//send message
document.getElementById('send-message').addEventListener('submit', function (e) {
    e.preventDefault();
    if (document.getElementById('message').value != ''){
        var _id = Date.now();
        set(ref(db, 'mess/' + mess_of + "/" + _id), {
            mess: document.getElementById('message').value,
            sender: user_id,
            receiver: _receiver
        });
    
        document.getElementById('send-message').reset();
    }
});



onChildAdded(messDataRef , (snapshot) => {
    if (initialized){
        if (snapshot.exists()){
            const child = snapshot.val();
            add_child_to_mess_list(child);
        }
    }
})


function add_child_to_mess_list(child){
    var html = "<div class = 'msg'>";
    if (child["sender"] == user_id) html += "<div class = 'you'>"; else html += "<div class = 'not-you'>"
    html += child["mess"];
    html += "</div></div>";

    messages_holder.innerHTML += html;
    if(document.getElementById("mess-update").checked == true){
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}


setTimeout(() => {
    initialized = true;
}, 1000)