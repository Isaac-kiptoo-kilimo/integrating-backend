"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const notes = document.getElementById('notes');
const url_ = 'http://localhost:5000/notes/notes/';
function fetchNotes(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetch(url);
            console.log(data);
            if (!data.ok) {
                throw new Error(`Request failed with status: ${data.status}`);
            }
            const response = yield data.json();
            // console.log(response);
            return response;
        }
        catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        }
    });
}
function displayNotes(notesArray) {
    console.log(notesArray);
    notesArray.forEach((note) => {
        notes.innerHTML += `
      <div class="card-item">
      
        <span class="developer">${note.title}</span>
        <h3>${note.content}.</h3>
        <h3>${note.createdAt}.</h3>
        <div class="arrow">
          <i class="fas fa-arrow-right card-icon"></i>
        </div>
      </div>
    `;
    });
}
fetchNotes(url_)
    .then((response) => {
    displayNotes(response);
})
    .catch((error) => {
    console.log(error);
});
