import Note from '../models/Note.js'; // Importing the default export
export async function getAllNotes(req,res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Assuming Note is a Mongoose model
        if (!notes || notes.length === 0) {
            return res.status(404).json({ error: 'No notes found' });
        }
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve notes' });
    }
}
export async function getNotesById(req,res){
    try{
        const notes = await Note.findById(req.params.id);
        if (!notes) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve note' });
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
}

export async function updateNote(req, res) {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
}

export function deleteNote(req, res) {
    const deletedNote = Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
    }
    const message = `Note with id ${req.params.id} deleted`;
    res.status(200).json({ message });
}