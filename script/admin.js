// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, onChildAdded , onChildChanged , ref, set, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
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
const messDataRef = ref(db, '/mess');


get(messDataRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();


            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const child = key;
                    add_to(key)
                }
            }
        } else {
            console.log("No data available.");
        }
    })
    .catch((error) => {
        console.error("Error retrieving Firebase data:", error);
    });


function update(){
    const read_list = document.getElementsByClassName('read');
    const new_list = document.getElementsByClassName('new');
    for(var i = 0 ; i < read_list.length ; i++){
        const us = read_list[i];
        get(messDataRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data[us.innerHTML].read == false){
                    us.classList.add('new')
                    us.classList.remove('read')
                }
            } else {
                console.log("No data available.");
            }
        })
        .catch((error) => {
            console.error("Error retrieving Firebase data:", error);
        });
    }

    for(var i = 0 ; i < new_list.length ; i++){
        const us = new_list[i];
        get(messDataRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data[us.innerHTML].read == true){
                    us.classList.add('read')
                    us.classList.remove('new')
                }
            } else {
                console.log("No data available.");
            }
        })
        .catch((error) => {
            console.error("Error retrieving Firebase data:", error);
        });
    }


    requestAnimationFrame(update);
}

update();

document.getElementById('submit').addEventListener("click" , () => {
    localStorage.setItem("user", document.getElementById('name').value);
})


function add_to(child) {
    const holder = document.getElementById("msg_list");
    var html = `<div id="${child}" class = "read">${child}</div>`;
    holder.innerHTML = html + holder.innerHTML;
    document.getElementById(child).addEventListener("click" , () => {
        localStorage.setItem("user", child);
    })
}


