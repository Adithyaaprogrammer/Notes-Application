import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import NavBar from '../components/NavBar'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'

const Createpage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/notes/create', { title, content });
      toast.success('Note created successfully');
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error creating note:', error);
      if(error.response.status === 429){
        toast.error('Too many requests. Please try again later.');
      }
      else{
        toast.error('Failed to create note. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
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
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">Create New Note</h1>
          <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
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
            <button 
              type="submit" 
              disabled={loading}
              className="w-full text-blue-400 hover:text-blue-300 border border-blue-500 hover:bg-blue-900 disabled:text-blue-600 disabled:border-blue-600 disabled:bg-gray-800 disabled:cursor-not-allowed px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium"
            >
              {loading ? 'Creating...' : 'Create Note'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Createpage
