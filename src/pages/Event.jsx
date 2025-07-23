import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Calendar, Users, QrCode, Edit3, Trash2, MapPin, Clock, Filter, Search } from 'lucide-react';

const Events = () => {
  const { showToast } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Tech Summit 2024',
      description: 'Annual technology conference featuring industry leaders and cutting-edge innovations',
      date: '2024-12-15T10:00',
      location: 'Jakarta Convention Center',
      category: 'conference',
      status: 'active',
      totalAttendees: 450,
      checkedInCount: 320,
      maxAttendees: 500,
      createdAt: new Date('2024-11-01').toISOString()
    },
    {
      id: '2',
      title: 'Digital Marketing Workshop',
      description: 'Learn the latest digital marketing strategies from industry experts',
      date: '2024-12-20T14:00',
      location: 'Bali International Convention Center',
      category: 'workshop',
      status: 'published',
      totalAttendees: 150,
      checkedInCount: 0,
      maxAttendees: 200,
      createdAt: new Date('2024-11-10').toISOString()
    },
    {
      id: '3',
      title: 'Startup Networking Event',
      description: 'Connect with fellow entrepreneurs, investors, and industry mentors',
      date: '2024-12-25T18:00',
      location: 'Surabaya Business Center',
      category: 'networking',
      status: 'draft',
      totalAttendees: 75,
      checkedInCount: 45,
      maxAttendees: 100,
      createdAt: new Date('2024-11-15').toISOString()
    },
    {
      id: '4',
      title: 'AI & Machine Learning Seminar',
      description: 'Explore the future of AI and machine learning applications',
      date: '2025-01-10T13:00',
      location: 'Bandung Technology Park',
      category: 'seminar',
      status: 'published',
      totalAttendees: 200,
      checkedInCount: 0,
      maxAttendees: 250,
      createdAt: new Date('2024-11-20').toISOString()
    }
  ]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateEvent = () => {
    showToast('Event creation modal will be implemented soon!', 'info');
  };

  const handleEditEvent = (event) => {
    showToast(`Edit "${event.title}" functionality coming soon!`, 'info');
  };

  const handleDeleteEvent = (event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      setEvents(prev => prev.filter(e => e.id !== event.id));
      showToast(`Event "${event.title}" deleted successfully!`, 'success');
    }
  };

  const handleGenerateQR = (event) => {
    showToast(`QR code generated for "${event.title}"!`, 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'published':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getAttendanceRate = (event) => {
    if (event.totalAttendees === 0) return 0;
    return Math.round((event.checkedInCount / event.totalAttendees) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Events Management</h2>
          <p className="text-gray-400 mt-1">Create, manage, and track your events</p>
        </div>
        <button
          onClick={handleCreateEvent}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/30 border border-gray-800/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{events.length}</p>
          <p className="text-sm text-gray-400">Total Events</p>
        </div>
        <div className="bg-gray-900/30 border border-gray-800/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{events.filter(e => e.status === 'active').length}</p>
          <p className="text-sm text-gray-400">Active</p>
        </div>
        <div className="bg-gray-900/30 border border-gray-800/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{events.filter(e => e.status === 'published').length}</p>
          <p className="text-sm text-gray-400">Published</p>
        </div>
        <div className="bg-gray-900/30 border border-gray-800/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{events.filter(e => e.status === 'draft').length}</p>
          <p className="text-sm text-gray-400">Draft</p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{event.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-400 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{event.totalAttendees} / {event.maxAttendees} attendees</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Attendance Progress</span>
                <span>{getAttendanceRate(event)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(event.totalAttendees / event.maxAttendees) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
              <div className="flex items-center space-x-2 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-white">{event.totalAttendees}</p>
                  <p className="text-xs text-gray-400">Registered</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-400">{event.checkedInCount}</p>
                  <p className="text-xs text-gray-400">Checked In</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleGenerateQR(event)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors"
                  title="Generate QR Code"
                >
                  <QrCode className="w-4 h-4 text-red-400" />
                </button>
                <button
                  onClick={() => handleEditEvent(event)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors"
                  title="Edit Event"
                >
                  <Edit3 className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Events Found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Create your first event to get started!'
            }
          </p>
          <button
            onClick={handleCreateEvent}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200"
          >
            Create Your First Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;