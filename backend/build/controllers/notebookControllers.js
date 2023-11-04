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
exports.deleteNoteController = exports.updateNoteController = exports.getOneNote = exports.getNotesController = exports.addNoteController = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dphelper_1 = __importDefault(require("../dphelpers/dphelper"));
const uuid_1 = require("uuid");
const formatDates_1 = require("../utils/formatDates");
const db_1 = require("../config/db");
const noteValidators_1 = require("../validators/noteValidators");
const dbhelpers = new dphelper_1.default;
function addNoteController(req, res) {
    try {
        const id = (0, uuid_1.v4)();
        const createdAt = (0, formatDates_1.formateDates)();
        const { title, content } = req.body;
        const { error } = noteValidators_1.createNoteSchema.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
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
            const notes = (yield pool.request().execute('fetchAllNotes')).recordset;
            return res.status(200).json(notes);
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
        const { noteID } = req.params;
        console.log(noteID);
        const data = {
            id: noteID,
        };
        const note = yield dbhelpers.execute('getSingleNote', data);
        return res.json(note.recordset);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getOneNote = getOneNote;
function updateNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { noteID } = req.params;
        let updatedNote = req.body;
        try {
            const { title, content } = req.body;
            let createdAt = (0, formatDates_1.formateDates)();
            const data = { id: noteID, title, content, createdAt };
            let result = yield dbhelpers.execute('updateNote', data);
            return res.status(200).json({
                message: "Note updated successfully"
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error updating the note"
            });
        }
    });
}
exports.updateNoteController = updateNoteController;
function deleteNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { noteID } = req.params;
            const data = {
                id: noteID
            };
            let result = yield dbhelpers.execute('deleteNote', data);
            return res.status(201).json({
                message: "Deleted successfully"
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Error deleting the note"
            });
        }
    });
}
exports.deleteNoteController = deleteNoteController;
