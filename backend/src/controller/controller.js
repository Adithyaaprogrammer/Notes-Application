export function getNotes(req, res) {
    res.status(200).send('500 notes application');
}

export function createNote(req, res) {
    const message = 'post Note created';
    res.status(201).json({ message });
}

export function updateNote(req, res) {
    const message = `Note with id ${req.params.id} updated`;
    res.status(200).json({ message });
}

export function deleteNote(req, res) {
    const message = `Note with id ${req.params.id} deleted`;
    res.status(200).json({ message });
}