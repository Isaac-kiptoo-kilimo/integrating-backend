const notes = document.getElementById('notes') as HTMLDivElement;
interface Note {
    content: string;
    title: string;
    createdAt:string
  }
  

const url_: string = 'http://localhost:5000/notes/notes/';

// notes.style.backgroundColor='red'


async function fetchNotes(url: string) {
  try {
    const data = await fetch(url);
    const response: Note[] = await data.json();

    response.forEach((note: Note) => {
      notes.innerHTML += `
        <div class="card-item">
          <img src="images/developer.jpg" alt="Card Image">
          <span class="developer">${note.title}</span>
          <h3>${note.content}.</h3>
          <div class="arrow">
              <i class="fas fa-arrow-right card-icon"></i>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

fetchNotes(url_);

  