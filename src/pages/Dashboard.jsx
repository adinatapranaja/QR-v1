import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Calendar, Users, Activity, TrendingUp, QrCode, Eye, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { showToast } = useOutletContext();
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    totalCheckedIn: 0,
    averageAttendance: '0%'
  });

  useEffect(() => {
    // Load mock data
    const mockEvents = [
      {
        id: '1',
        title: 'Tech Summit 2024',
        description: 'Annual technology conference with industry leaders',
        date: '2024-12-15T10:00',
        location: 'Jakarta Convention Center',
        category: 'conference',
        status: 'active',
        totalAttendees: 450,
        checkedInCount: 320,
        maxAttendees: 500,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Digital Marketing Workshop',
        description: 'Learn the latest digital marketing strategies',
        date: '2024-12-20T14:00',
        location: 'Bali International Convention',
        category: 'workshop',
        status: 'published',
        totalAttendees: 150,
        checkedInCount: 0,
        maxAttendees: 200,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Startup Networking Event',
        description: 'Connect with fellow entrepreneurs and investors',
        date: '2024-12-25T18:00',
        location: 'Surabaya Business Center',
        category: 'networking',
        status: 'draft',
        totalAttendees: 75,
        checkedInCount: 45,
        maxAttendees: 100,
        createdAt: new Date().toISOString()
      }
    ];
    setEvents(mockEvents);

    // Calculate stats
    const totalEvents = mockEvents.length;
    const totalAttendees = mockEvents.reduce((sum, event) => sum + event.totalAttendees, 0);
    const totalCheckedIn = mockEvents.reduce((sum, event) => sum + event.checkedInCount, 0);
    const averageAttendance = totalAttendees > 0 ? `${Math.round((totalCheckedIn / totalAttendees) * 100)}%` : '0%';

    setStats({
      totalEvents,
      totalAttendees,
      totalCheckedIn,
      averageAttendance
    });
  }, []);

  const handleCreateEvent = () => {
    showToast('Navigate to Events page to create new event', 'info');
  };

  const handleGenerateQR = (eventId, eventTitle) => {
    showToast(`QR code generation for "${eventTitle}" coming soon!`, 'info');
  };

  const handleViewEvent = (eventId, eventTitle) => {
    showToast(`Viewing details for "${eventTitle}"`, 'info');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your events.</p>
        </div>
        <button
          onClick={handleCreateEvent}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Events</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalEvents}</p>
              <p className="text-xs text-green-400 mt-1">+2 this month</p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-xl">
              <Calendar className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Attendees</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalAttendees}</p>
              <p className="text-xs text-blue-400 mt-1">Across all events</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Checked In</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalCheckedIn}</p>
              <p className="text-xs text-green-400 mt-1">Live count</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Attendance Rate</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.averageAttendance}</p>
              <p className="text-xs text-yellow-400 mt-1">Average rate</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Recent Events</h3>
          <button 
            onClick={() => showToast('Navigate to Events page for more', 'info')}
            className="text-red-400 hover:text-red-300 text-sm font-medium"
          >
            View All →
          </button>
        </div>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-200">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h4 className="font-semibold text-white">{event.title}</h4>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    event.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    event.status === 'published' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Attendees</p>
                  <p className="font-semibold text-white">{event.totalAttendees}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Checked In</p>
                  <p className="font-semibold text-green-400">{event.checkedInCount}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewEvent(event.id, event.title)}
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors"
                    title="View Event"
                  >
                    <Eye className="w-4 h-4 text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleGenerateQR(event.id, event.title)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors"
                    title="Generate QR Code"
                  >
                    <QrCode className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-2xl p-6 hover:from-red-500/20 hover:to-red-600/20 transition-all duration-200 cursor-pointer" onClick={handleCreateEvent}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Plus className="w-5 h-5 text-red-400" />
            </div>
            <h4 className="font-semibold text-white">Create Event</h4>
          </div>
          <p className="text-gray-400 text-sm">Start organizing your next amazing event</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-2xl p-6 hover:from-green-500/20 hover:to-green-600/20 transition-all duration-200 cursor-pointer" onClick={() => showToast('Navigate to Scanner page', 'info')}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <QrCode className="w-5 h-5 text-green-400" />
            </div>
            <h4 className="font-semibold text-white">QR Scanner</h4>
          </div>
          <p className="text-gray-400 text-sm">Scan QR codes for quick check-ins</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-6 hover:from-purple-500/20 hover:to-purple-600/20 transition-all duration-200 cursor-pointer" onClick={() => showToast('Navigate to Analytics page', 'info')}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white">View Analytics</h4>
          </div>
          <p className="text-gray-400 text-sm">Analyze your event performance</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;