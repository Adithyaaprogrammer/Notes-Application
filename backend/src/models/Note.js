import mongoose from "mongoose";
// 1-create a schema
// 2-create a model
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }},  // Define the schema for the Note model
    {
        timestamps: true,
    });

const Note = mongoose.model("Note", noteSchema);

export default Note;
