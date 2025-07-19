import React from 'react'
import { useState , useEffect} from 'react'
import NavBar from '../components/NavBar'
import RateLimit from '../components/RateLimit'
import axios from 'axios'
import toast from 'react-hot-toast'
const Homepage = () => {
  const [isratelimited, setratelimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notes/');
        setNotes(response.data);
        setratelimited(false);
      } catch (error) {
        console.log(error);
        console.error('Error fetching notes:', error);
        if(error.response?.status == 429) {
          setratelimited(true);
        } else {
          toast.error('Failed to fetch notes. Please try again later.');
        }
      }
      finally {
        setLoading(false);
      } 
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      {isratelimited && <RateLimit />}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <div key={note._id} className="bg-blue-500 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2 text-black">{note.title}</h2>
                <p className="text-black">{note.content}</p>
                <div className="mt-4 flex justify-between">
                  <a 
                    href={`/note/${note._id}`} 
                    className="text-white bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
                  >
                    View
                  </a>
                  <button 
                    onClick={async () => {
                      try {
                        await axios.delete(`http://localhost:3000/api/notes/${note._id}`);
                        setNotes(notes.filter(n => n._id !== note._id));
                        toast.success('Note deleted successfully');
                      } catch (error) {
                        console.error('Error deleting note:', error);
                        toast.error('Failed to delete note');
                      }
                    }}
                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage
