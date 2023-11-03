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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteController = exports.updateNoteController = exports.getSingleNoteController = exports.getOneNote = exports.getNotesController = exports.addNoteController = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dphelper_1 = __importDefault(require("../dphelpers/dphelper"));
const uuid_1 = require("uuid");
const formatDates_1 = require("../utils/formatDates");
const db_1 = require("../config/db");
const dbhelpers = new dphelper_1.default;
function addNoteController(req, res) {
    try {
        const { title, content } = req.body;
        const id = (0, uuid_1.v4)();
        const createdAt = (0, formatDates_1.formateDates)();
        let result = dbhelpers.execute('addNote', {
            id, title, content, createdAt
        });
        return res.status(200).json({
            message: "Note Created Successfully"
        });
    }
    catch (error) {
        return res.json(error);
    }
}
exports.addNoteController = addNoteController;
function getNotesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield mssql_1.default.connect(db_1.dbConfig);
            const users = (yield pool.request().execute('fetchAllNotes')).recordset;
            return res.status(200).json({
                users: users
            });
        }
        catch (error) {
            return res.json({
                error: error
            });
        }
    });
}
exports.getNotesController = getNotesController;
const getOneNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        console.log(userID);
        const queryString = `SELECT * FROM notes WHERE note_id='${userID}'`;
        // const result=await new_query(queryString)
        // console.log(result.recordset);
        // res.json(result.recordset[0])
    }
    catch (err) {
        console.log(err);
    }
});
exports.getOneNote = getOneNote;
function getSingleNoteController(req, res) {
    let { noteID } = req.params;
    let parsedID = parseInt(noteID);
    // let note = getSingleNote(parsedID);
    // res.json(note)
}
exports.getSingleNoteController = getSingleNoteController;
function updateNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { noteID } = req.params;
        let parsedID = parseInt(noteID);
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
    });
}
exports.updateNoteController = updateNoteController;
function deleteNoteController(req, res) {
    let { noteID } = req.params;
    let parsedID = parseInt(noteID);
    // let results = deleteNote(parsedID);
    // if(results !== null){
    //       res.send(`Note with id:${noteID} on index: ${results} deleted`);
    // }else{
    //       res.send("Note not found")
    // }
}
exports.deleteNoteController = deleteNoteController;
