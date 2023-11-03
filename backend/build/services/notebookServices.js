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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNote = exports.deleteNote = exports.addNote = exports.getSingleNote = exports.getNotes = void 0;
const data_1 = require("../data");
const formatDates_1 = require("../utils/formatDates");
const generateRandomID_1 = require("../utils/generateRandomID");
const dbConnectServices_1 = require("./dbConnectServices");
function getNotes() {
    return __awaiter(this, void 0, void 0, function* () {
        // return notes;
        const connectionPool = yield (0, dbConnectServices_1.dbConnectService)();
        let getAllQuery = "SELECT * FROM notes";
        connectionPool === null || connectionPool === void 0 ? void 0 : connectionPool.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                return err;
            }
            else {
                let results = yield (yield (connectionPool === null || connectionPool === void 0 ? void 0 : connectionPool.request().query(getAllQuery))).recordset;
                //  return results.recordset
                //  console.log(results)
                return results;
            }
        }));
    });
}
exports.getNotes = getNotes;
function getSingleNote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let note = data_1.notes.find((note) => note.id === id);
        const connectionPool = yield (0, dbConnectServices_1.dbConnectService)();
        let singleNoteQuery = `SELECT * FROM notes WHERE note_id='${id}'`;
        connectionPool === null || connectionPool === void 0 ? void 0 : connectionPool.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
            }
            else {
                let results = yield (connectionPool === null || connectionPool === void 0 ? void 0 : connectionPool.request().query(singleNoteQuery));
                if (results.recordset.length > 0) {
                    return results.recordset[0];
                }
                // console.log(results);
                // return results.recordset
            }
        }));
        // if(note)return note;
        return null;
    });
}
exports.getSingleNote = getSingleNote;
function addNote(note) {
    return __awaiter(this, void 0, void 0, function* () {
        // notes.push(note)
        const noteId = (0, generateRandomID_1.generateRandomID)();
        // console.log(noteId);
        let new_noteID = noteId.toString();
        let id = parseInt(new_noteID);
        let { title, content } = note;
        const createdAt = (0, formatDates_1.formateDates)();
        let connectionPool = yield (0, dbConnectServices_1.dbConnectService)();
        let query = `INSERT INTO notes (note_id, note_title, content, createdAt) VALUES ('${id}', '${title}', '${content}', '${createdAt}')`;
        connectionPool === null || connectionPool === void 0 ? void 0 : connectionPool.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
            }
            else {
                let results = yield (connectionPool === null || connectionPool === void 0 ? void 0 : connectionPool.request().query(query));
                // console.log(results);
            }
        }));
    });
}
exports.addNote = addNote;
function deleteNote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let indexofNote = data_1.notes.findIndex((note) => note.id === id);
        if (indexofNote < 0) {
            return null;
        }
        else {
            data_1.notes.splice(indexofNote, 1);
            const connectionPool = yield (0, dbConnectServices_1.dbConnectService)();
            connectionPool === null || connectionPool === void 0 ? void 0 : connectionPool.connect((err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                }
                else {
                    const request = connectionPool.request();
                    yield request.query(`DELETE FROM notes WHERE note_id='${id}`);
                }
            }));
            return indexofNote;
        }
    });
}
exports.deleteNote = deleteNote;
function updateNote(id, updatedNote) {
    return __awaiter(this, void 0, void 0, function* () {
        let indexofNote = data_1.notes.findIndex((note) => note.id === id);
        if (indexofNote >= 0) {
            data_1.notes[indexofNote] = updatedNote;
            const { title, content } = updatedNote;
            const ConnectionPool = yield (0, dbConnectServices_1.dbConnectService)();
            if (ConnectionPool) {
                try {
                    const request = ConnectionPool.request();
                    yield request.query(`UPDATE notes SET note_title='${title}', content='${content}' WHERE note_id='${id}'`);
                    return true;
                }
                catch (error) {
                    console.error(error);
                    return false;
                }
            }
            let success = true;
            return success;
        }
        else {
            return false;
        }
    });
}
exports.updateNote = updateNote;
