
async function analyzeTextAPI(text) {
    try {
        console.log("text", text)
        const response = await fetch('https://api.sapling.ai/api/v1/aidetect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: '6F9RMOTT9VEOHPDOC0AGL641JKWKZZZ3',
                text,
                sent_scores: false
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log({status: response.status});
        console.log(JSON.stringify(data, null, 4));
        // Save the response data in the session storage
        sessionStorage.setItem('apiResponse', JSON.stringify(data));
        return response.status;
    } catch (err) {
        console.log({err});
    }
}



function uploadFile(file) {
    var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        // You can proceed with form submission or any other operation you want to perform
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child(file.name);
        fileRef.put(file).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            // get download url
            fileRef.getDownloadURL().then(function(url) {
                console.log(url);
                // add url to firestore
                var db = firebase.firestore();
                db.collection("files").add({
                    url: url,
                    userId: user.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    // redirect to results page
                    window.location.href = `/results.html?fileId=${docRef.id}`;
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }).catch(function(error) {
                console.error("Error getting download url: ", error);
            });
        });
    } else {
        // No user is signed in.
        // Show a modal asking the user to choose upload type
        $('#signInModal').modal('show');
        event.preventDefault(); // prevent the form from submitting
    }
}

function uploadText() {
    const textarea = document.getElementById('textarea');
    const text = textarea.value;
    const file = new File([text], "text.txt", {type: "text/plain"});
    uploadFile(file);
}