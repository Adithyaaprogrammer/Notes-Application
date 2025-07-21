import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import NavBar from '../components/NavBar'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'

const Notedetailpage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axiosInstance.get(`/notes/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching note:', error);
        toast.error('Failed to fetch note');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axiosInstance.put(`/notes/${id}`, { title, content });
      toast.success('Note updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating note:', error);
      if (error.response?.status === 429) {
        toast.error('Too many requests. Please try again later.');
      } else {
        toast.error('Failed to update note. Please try again later.');
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      try {
        await axiosInstance.delete(`/notes/${id}`);
        toast.success('Note deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Error deleting note:', error);
        toast.error('Failed to delete note');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 border border-blue-500 hover:bg-blue-900 px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
              {isEditing ? 'Edit Note' : 'Note Details'}
            </h1>
            <div className="flex gap-2">
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-green-400 hover:text-green-300 border border-green-500 hover:bg-green-900 px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium"
                >
                  Edit
                </button>
              )}
              <button 
                onClick={handleDelete}
                className="text-red-400 hover:text-red-300 border border-red-500 hover:bg-red-900 px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdate} className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="Enter note title..."
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-300">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-vertical"
                  placeholder="Write your note content here..."
                />
              </div>
              <div className="flex gap-4">
                <button 
                  type="submit" 
                  disabled={updating}
                  className="flex-1 text-blue-400 hover:text-blue-300 border border-blue-500 hover:bg-blue-900 disabled:text-blue-600 disabled:border-blue-600 disabled:bg-gray-800 disabled:cursor-not-allowed px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium"
                >
                  {updating ? 'Updating...' : 'Update Note'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-300 border border-gray-500 hover:bg-gray-700 px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <div className="mb-8">
                <div className="text-3xl font-bold text-blue-400 mb-2 leading-tight">{title}</div>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              <div className="mb-6">
                <div className="text-lg text-gray-100 whitespace-pre-wrap leading-relaxed font-light tracking-wide">{content}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notedetailpage
