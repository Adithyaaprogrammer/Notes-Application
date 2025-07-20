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
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      {isratelimited && <RateLimit />}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <div key={note._id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-700">
                <h2 className="text-xl font-semibold mb-2 text-blue-400">{note.title}</h2>
                <p className="text-gray-300">{note.content}</p>
                <div className="mt-4 flex justify-between">
                  <a 
                    href={`/note/${note._id}`} 
                    className="text-blue-400 hover:text-blue-300 border border-blue-500 hover:bg-blue-900 px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium"
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
                    className="text-red-400 hover:text-red-300 border border-red-500 hover:bg-red-900 px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium"
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
