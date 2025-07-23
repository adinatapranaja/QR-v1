import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Plus, Search, Filter, Download, Upload, Users, 
  Mail, Phone, Building, Tag, CheckCircle, XCircle,
  Edit3, Trash2, QrCode, Calendar
} from 'lucide-react';

const Attendees = () => {
  const { showToast } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [events] = useState([
    { id: '1', title: 'Tech Summit 2024' },
    { id: '2', title: 'Digital Marketing Workshop' },
    { id: '3', title: 'Startup Networking Event' },
    { id: '4', title: 'AI & Machine Learning Seminar' }
  ]);

  const [attendees, setAttendees] = useState([
    {
      id: '1',
      eventId: '1',
      eventTitle: 'Tech Summit 2024',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+62 812-3456-7890',
      company: 'Tech Innovations Inc.',
      category: 'vip',
      checkedIn: true,
      checkedInAt: '2024-12-15T10:30:00',
      registeredAt: '2024-11-20T14:20:00',
      notes: 'Keynote speaker for AI session'
    },
    {
      id: '2',
      eventId: '1',
      eventTitle: 'Tech Summit 2024',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+62 821-9876-5432',
      company: 'Digital Solutions Ltd.',
      category: 'general',
      checkedIn: false,
      checkedInAt: null,
      registeredAt: '2024-11-22T09:15:00',
      notes: 'Interested in blockchain technology'
    },
    {
      id: '3',
      eventId: '2',
      eventTitle: 'Digital Marketing Workshop',
      name: 'Michael Johnson',
      email: 'michael.j@email.com',
      phone: '+62 813-5555-1234',
      company: 'Marketing Pro Agency',
      category: 'speaker',
      checkedIn: true,
      checkedInAt: '2024-12-20T13:45:00',
      registeredAt: '2024-11-25T16:30:00',
      notes: 'Workshop facilitator for SEO session'
    },
    {
      id: '4',
      eventId: '1',
      eventTitle: 'Tech Summit 2024',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+62 814-7777-8888',
      company: 'StartupXYZ',
      category: 'general',
      checkedIn: true,
      checkedInAt: '2024-12-15T09:15:00',
      registeredAt: '2024-11-18T11:45:00',
      notes: 'First time attendee'
    },
    {
      id: '5',
      eventId: '3',
      eventTitle: 'Startup Networking Event',
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+62 815-2222-3333',
      company: 'Venture Capital Partners',
      category: 'sponsor',
      checkedIn: false,
      checkedInAt: null,
      registeredAt: '2024-11-28T10:20:00',
      notes: 'Potential investor, looking for early-stage startups'
    }
  ]);

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = 
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEvent = eventFilter === 'all' || attendee.eventId === eventFilter;
    const matchesCategory = categoryFilter === 'all' || attendee.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'checked-in' && attendee.checkedIn) ||
      (statusFilter === 'not-checked-in' && !attendee.checkedIn);
    
    return matchesSearch && matchesEvent && matchesCategory && matchesStatus;
  });

  const handleAddAttendee = () => {
    showToast('Add attendee modal will be implemented soon!', 'info');
  };

  const handleEditAttendee = (attendee) => {
    showToast(`Edit "${attendee.name}" functionality coming soon!`, 'info');
  };

  const handleDeleteAttendee = (attendee) => {
    if (window.confirm(`Are you sure you want to remove "${attendee.name}" from the event?`)) {
      setAttendees(prev => prev.filter(a => a.id !== attendee.id));
      showToast(`${attendee.name} removed successfully!`, 'success');
    }
  };

  const handleGenerateQR = (attendee) => {
    showToast(`QR code generated for ${attendee.name}!`, 'success');
  };

  const handleCheckIn = (attendee) => {
    if (attendee.checkedIn) {
      showToast(`${attendee.name} is already checked in!`, 'error');
      return;
    }

    setAttendees(prev => prev.map(a => 
      a.id === attendee.id 
        ? { ...a, checkedIn: true, checkedInAt: new Date().toISOString() }
        : a
    ));
    showToast(`${attendee.name} checked in successfully!`, 'success');
  };

  const handleImport = () => {
    showToast('CSV import functionality coming soon!', 'info');
  };

  const handleExport = () => {
    showToast('Export functionality coming soon!', 'info');
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'vip':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'speaker':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'sponsor':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'press':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'staff':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const stats = {
    total: attendees.length,
    checkedIn: attendees.filter(a => a.checkedIn).length,
    notCheckedIn: attendees.filter(a => !a.checkedIn).length,
    attendanceRate: attendees.length > 0 ? Math.round((attendees.filter(a => a.checkedIn).length / attendees.length) * 100) : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Attendees Management</h2>
          <p className="text-gray-400 mt-1">Manage event attendees and track check-ins</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleImport}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 text-white rounded-lg transition-all duration-200"
          >
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 text-white rounded-lg transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={handleAddAttendee}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Attendee</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Attendees</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Users className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Checked In</p>
              <p className="text-2xl font-bold text-green-400">{stats.checkedIn}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Not Checked In</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.notCheckedIn}</p>
            </div>
            <XCircle className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Attendance Rate</p>
              <p className="text-2xl font-bold text-purple-400">{stats.attendanceRate}%</p>
            </div>
            <Calendar className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Search Attendees</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Event</label>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-red-500/50"
            >
              <option value="all">All Events</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-red-500/50"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="vip">VIP</option>
              <option value="speaker">Speaker</option>
              <option value="sponsor">Sponsor</option>
              <option value="press">Press</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-red-500/50"
            >
              <option value="all">All Status</option>
              <option value="checked-in">Checked In</option>
              <option value="not-checked-in">Not Checked In</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendees Table */}
      <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Attendee</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Event</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Contact</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Category</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.map((attendee, index) => (
                <tr key={attendee.id} className={`border-b border-gray-800/30 hover:bg-gray-800/30 transition-colors ${index % 2 === 0 ? 'bg-gray-800/10' : ''}`}>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-white">{attendee.name}</div>
                      <div className="text-sm text-gray-400">{attendee.email}</div>
                      {attendee.company && (
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Building className="w-3 h-3 mr-1" />
                          {attendee.company}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-white">{attendee.eventTitle}</div>
                    <div className="text-xs text-gray-400">
                      Registered: {new Date(attendee.registeredAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {attendee.email && (
                        <div className="flex items-center text-xs text-gray-400">
                          <Mail className="w-3 h-3 mr-1" />
                          {attendee.email}
                        </div>
                      )}
                      {attendee.phone && (
                        <div className="flex items-center text-xs text-gray-400">
                          <Phone className="w-3 h-3 mr-1" />
                          {attendee.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(attendee.category)}`}>
                      {attendee.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {attendee.checkedIn ? (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-green-400">Checked In</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <XCircle className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-yellow-400">Not Checked In</span>
                        </div>
                      )}
                    </div>
                    {attendee.checkedIn && attendee.checkedInAt && (
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(attendee.checkedInAt).toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {!attendee.checkedIn && (
                        <button
                          onClick={() => handleCheckIn(attendee)}
                          className="p-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-md transition-colors"
                          title="Check In"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                        </button>
                      )}
                      <button
                        onClick={() => handleGenerateQR(attendee)}
                        className="p-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-md transition-colors"
                        title="Generate QR Code"
                      >
                        <QrCode className="w-3.5 h-3.5 text-red-400" />
                      </button>
                      <button
                        onClick={() => handleEditAttendee(attendee)}
                        className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-md transition-colors"
                        title="Edit Attendee"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteAttendee(attendee)}
                        className="p-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-md transition-colors"
                        title="Delete Attendee"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredAttendees.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Attendees Found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || eventFilter !== 'all' || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'No attendees have been added yet.'
              }
            </p>
            <button
              onClick={handleAddAttendee}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200"
            >
              Add First Attendee
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendees;