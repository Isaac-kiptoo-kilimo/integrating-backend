import { Response, Request } from "express"

import mssql from 'mssql'
import Connection from "../dphelpers/dphelper";
import { v4 } from 'uuid'
import { formateDates } from "../utils/formatDates";
import { dbConfig } from "../config/db";
const dbhelpers=new Connection;




export function addNoteController(req: Request, res:Response){


    try{
      const { title,content}=req.body
      const id=v4()
      const createdAt = formateDates();
     
  
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
        
            const users=(await pool.request().execute('fetchAllNotes')).recordset
        
            return res.status(200).json(
                users
            )
          }catch(error){
        return res.json({
                error:error
            })
          }
      
    
      
      
}





export const  getOneNote=async (req:Request,res:Response)=>{
      try{

            const {userID}=req.params;
            console.log(userID);
            
            const queryString=`SELECT * FROM notes WHERE note_id='${userID}'`
            // const result=await new_query(queryString)
            // console.log(result.recordset);
            

            // res.json(result.recordset[0])

      }catch(err){
            console.log(err)

      }




}



export function getSingleNoteController(req:Request, res:Response ){
      let {noteID} = req.params;
      let parsedID = parseInt(noteID)
      // let note = getSingleNote(parsedID);

      // res.json(note)
}

export async function updateNoteController(req:Request, res:Response){
    let { noteID } = req.params;
    let parsedID = parseInt(noteID)
    let updatedNote = req.body;

//     let result = updateNote(parsedID, updatedNote);
//     if (await result) {
//           return res.json({
//                 id: parsedID,
//                 success: true
//           })
//     }
//     return res.json({
//           success: false
//     })
}

export function deleteNoteController(req:Request, res:Response){
      let {noteID} = req.params;
      let parsedID = parseInt(noteID);

      // let results = deleteNote(parsedID);

      // if(results !== null){
      //       res.send(`Note with id:${noteID} on index: ${results} deleted`);
      // }else{
      //       res.send("Note not found")
      // }
}


