import { Router } from 'express';
import { addNoteController,getNotesController,updateNoteController,deleteNoteController, getOneNote, } from '../controllers/notebookControllers';

const noteRouter:Router=Router();

noteRouter.post('/',addNoteController)
noteRouter.get('/notes',getNotesController)
noteRouter.get('/:noteID',getOneNote)
noteRouter.put('/:noteID',updateNoteController)
noteRouter.delete('/:noteID',deleteNoteController)

export default noteRouter;