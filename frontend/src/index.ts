const notes = document.getElementById('notes') as HTMLDivElement;
const note_title = document.getElementById('title') as HTMLInputElement
const note_content = document.getElementById('content') as HTMLInputElement
const create_form = document.getElementById('create-note-form') as HTMLFormElement
const btnCreate=document.querySelector('.btn-create') as HTMLDivElement
const noteCard=document.querySelector('#addNotecard') as HTMLDivElement;
const btnClose=document.querySelector('#note-close') as HTMLElement;

interface Note {
  content: string;
  title: string;
  createdAt: string;
}


  btnCreate.addEventListener('click',()=>{
    noteCard.classList.add('card-note-active');
  });
  
  btnClose.addEventListener('click',()=>{
    noteCard.classList.remove('card-note-active');
  });

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
      
        <span class="developer">${note.title}</span>
        <h3>${note.content}.</h3>
        <h3>${note.createdAt}.</h3>
        
        <div class="arrow">
        <button type="submit" class="update">UPDATE</button>
        <button type="submit" class="delete">DELETE</button>
          
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

 
  create_form.addEventListener('submit', (event)=>{
      event.preventDefault()
      let title=note_title.value;
      let content=note_content.value
     
  
      let newValue = title.trim() != '' && content.trim() != '' 
      if(newValue){
  
              const promise = new Promise <{error:string, message:string}> ((resolve, reject)=>{
                  fetch('http://localhost:5000/notes', {
                      headers:{
                          'Accept': 'application/json',
                          'Content-type': 'application/json'
                      },
                      method: "POST",
                      body: JSON.stringify({
                          "title": title,
                          "content": content,
                       
                      })
                  }).then((res=>res.json())).then(data=>{
                      console.log(data);
                      createdNote()
                      resolve(data) 
                  }).catch(error=>{
                      console.log(error);
                  })
              })
  
              function createdNote(){
                  location.href = 'index.html'
              }
           
          
      }
  })