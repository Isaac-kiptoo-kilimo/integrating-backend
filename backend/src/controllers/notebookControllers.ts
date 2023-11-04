import { Response, Request } from "express"

import mssql from 'mssql'
import Connection from "../dphelpers/dphelper";
import { v4 } from 'uuid'
import { formateDates } from "../utils/formatDates";
import { dbConfig } from "../config/db";
import { createNoteSchema } from "../validators/noteValidators";
const dbhelpers=new Connection;




export function addNoteController(req: Request, res:Response){


    try{
      const id=v4()

      const createdAt = formateDates();

      const { title,content}=req.body

      const {error} = createNoteSchema.validate(req.body)
     
      if(error){
            return res.status(422).json(error)
        }
  
      let result=dbhelpers.execute('addNote',{
          id,title,content,createdAt
      })
      return res.status(200).json({
          message: "Note Created Successfully"
      })
  
  
    }catch(error){
      return res.json(error)
    }

}

export async function getNotesController(req: Request, res:Response){

      try{
            const pool=await mssql.connect(dbConfig)
        
            const notes=(await pool.request().execute('fetchAllNotes')).recordset
        
            return res.status(200).json(
                notes
            )
          }catch(error){
        return res.json({
                error:error
            })
          }
      
      
}



export const  getOneNote=async (req:Request,res:Response)=>{
      try{

            const {noteID}=req.params;

            console.log(noteID);
            const data = {
                  id: noteID,
                };
                const note = await dbhelpers.execute('getSingleNote', data);
           return res.json(note.recordset)
            
          

      }catch(err){
            console.log(err)

      }

}


export async function updateNoteController(req:Request, res:Response){
    let { noteID } = req.params;
    let updatedNote = req.body;

    try{
      const { title, content } = req.body;
      let createdAt=formateDates()

      const data = { id:noteID,title,content,createdAt };

      let result=await dbhelpers.execute('updateNote',data)
      return res.status(200).json({
            message: "Note updated successfully"
          });

    }catch(error){
      console.log(error)
      return res.status(500).json({
      message: "Error updating the note"
    })


}
}

export async function deleteNoteController(req:Request, res:Response){
      try {
            const { noteID } = req.params;
          
            const data = {
              id: noteID
            };
          
           let result= await dbhelpers.execute('deleteNote', data);
            return res.status(201).json({
              message: "Deleted successfully"
            });
          } catch (error) {
            return res.status(500).json({
              message: "Error deleting the note"
            });
          }
          
}


