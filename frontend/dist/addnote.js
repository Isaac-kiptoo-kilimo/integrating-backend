"use strict";
let note_title = document.getElementById('title');
let note_content = document.getElementById('content');
let create_form = document.getElementById('create-note-form');
create_form.addEventListener('submit', (event) => {
    event.preventDefault();
    let title = note_title.value;
    let content = note_content.value;
    let newValue = title.trim() != '' && content.trim() != '';
    if (newValue) {
        const promise = new Promise((resolve, reject) => {
            fetch('http://localhost:5000/notes', {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "title": title,
                    "content": content,
                })
            }).then((res => res.json())).then(data => {
                console.log(data);
                createdNote();
                resolve(data);
            }).catch(error => {
                console.log(error);
            });
        });
        function createdNote() {
            location.href = 'index.html';
        }
    }
});
