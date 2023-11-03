const notes = document.getElementById('notes') as HTMLDivElement;

interface Note {
  content: string;
  title: string;
  createdAt: string;
}

const url_: string = 'http://localhost:5000/notes/notes/';

async function fetchNotes(url: string) {
  try {
    const data = await fetch(url);
    console.log(data);
    
    if (!data.ok) {
      throw new Error(`Request failed with status: ${data.status}`);
    }
    const response: Note[] = await data.json();
    // console.log(response);
    
    return response;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error; 
  }
}

function displayNotes(notesArray: Note[]) {
    console.log(notesArray)
  notesArray.forEach((note: Note) => {
    notes.innerHTML += `
      <div class="card-item">
      <h2>This is your ${note.title} Note</h2>
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

