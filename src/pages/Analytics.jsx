import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Calendar, 
  Clock, MapPin, Award, Download, RefreshCw, Filter
} from 'lucide-react';

const Analytics = () => {
  const { showToast } = useOutletContext();
  const [dateRange, setDateRange] = useState('30days');
  const [selectedEvent, setSelectedEvent] = useState('all');

  const events = [
    { id: '1', title: 'Tech Summit 2024', totalAttendees: 450, checkedIn: 320, date: '2024-12-15' },
    { id: '2', title: 'Digital Marketing Workshop', totalAttendees: 150, checkedIn: 120, date: '2024-12-20' },
    { id: '3', title: 'Startup Networking Event', totalAttendees: 75, checkedIn: 65, date: '2024-12-25' },
    { id: '4', title: 'AI & ML Seminar', totalAttendees: 200, checkedIn: 180, date: '2025-01-10' }
  ];

  const analyticsData = {
    overview: {
      totalEvents: 4,
      totalAttendees: 875,
      totalCheckedIn: 685,
      averageAttendance: 78.3,
      growthRate: 12.5
    },
    topEvents: [
      { name: 'Tech Summit 2024', attendees: 450, rate: 71.1, growth: 15.2 },
      { name: 'AI & ML Seminar', attendees: 200, rate: 90.0, growth: 8.7 },
      { name: 'Digital Marketing Workshop', attendees: 150, rate: 80.0, growth: -2.1 },
      { name: 'Startup Networking', attendees: 75, rate: 86.7, growth: 22.3 }
    ],
    checkInTrends: [
      { time: '08:00', count: 25 },
      { time: '09:00', count: 85 },
      { time: '10:00', count: 150 },
      { time: '11:00', count: 120 },
      { time: '12:00', count: 95 },
      { time: '13:00', count: 65 },
      { time: '14:00', count: 110 },
      { time: '15:00', count: 95 },
      { time: '16:00', count: 70 },
      { time: '17:00', count: 45 }
    ],
    attendeeCategories: [
      { category: 'General', count: 520, percentage: 59.4 },
      { category: 'VIP', count: 180, percentage: 20.6 },
      { category: 'Speaker', count: 85, percentage: 9.7 },
      { category: 'Sponsor', count: 60, percentage: 6.9 },
      { category: 'Press', count: 30, percentage: 3.4 }
    ],
    locations: [
      { city: 'Jakarta', events: 2, attendees: 650 },
      { city: 'Bali', events: 1, attendees: 150 },
      { city: 'Surabaya', events: 1, attendees: 75 }
    ]
  };

  const handleExportReport = () => {
    showToast('Analytics report export coming soon!', 'info');
  };

  const handleRefreshData = () => {
    showToast('Data refreshed successfully!', 'success');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'General': 'bg-blue-500',
      'VIP': 'bg-purple-500',
      'Speaker': 'bg-green-500',
      'Sponsor': 'bg-yellow-500',
      'Press': 'bg-red-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Analytics & Reports</h2>
          <p className="text-gray-400 mt-1">Comprehensive insights into your event performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 text-white rounded-lg transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExportReport}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500/50"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 3 months</option>
              <option value="1year">Last year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Event Filter</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500/50"
            >
              <option value="all">All Events</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Events</p>
            <p className="text-3xl font-bold text-white">{analyticsData.overview.totalEvents}</p>
            <p className="text-xs text-gray-500 mt-1">This period</p>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+8.2%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Attendees</p>
            <p className="text-3xl font-bold text-white">{analyticsData.overview.totalAttendees.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Registered</p>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+5.1%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Check-ins</p>
            <p className="text-3xl font-bold text-white">{analyticsData.overview.totalCheckedIn.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Successful</p>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <BarChart3 className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="flex items-center space-x-1 text-red-400 text-sm">
              <TrendingDown className="w-4 h-4" />
              <span>-2.3%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Avg Attendance</p>
            <p className="text-3xl font-bold text-white">{analyticsData.overview.averageAttendance}%</p>
            <p className="text-xs text-gray-500 mt-1">Rate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Events */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Top Performing Events</h3>
          <div className="space-y-4">
            {analyticsData.topEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{event.name}</h4>
                    <p className="text-sm text-gray-400">{event.attendees} attendees</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">{event.rate}%</span>
                    <div className={`flex items-center space-x-1 text-xs ${
                      event.growth > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {event.growth > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{Math.abs(event.growth)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Check-in Trends */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Check-in Trends</h3>
          <div className="space-y-3">
            {analyticsData.checkInTrends.map((data, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 text-sm text-gray-400 font-mono">
                  {data.time}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.count / 150) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-white font-medium w-8">
                      {data.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendee Categories */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Attendee Categories</h3>
          <div className="space-y-4">
            {analyticsData.attendeeCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{category.category}</span>
                  <span className="text-sm text-gray-400">{category.count} ({category.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getCategoryColor(category.category)}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Geographic Distribution</h3>
          <div className="space-y-4">
            {analyticsData.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{location.city}</h4>
                    <p className="text-sm text-gray-400">{location.events} events</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{location.attendees}</p>
                  <p className="text-xs text-gray-400">attendees</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time-based Analytics */}
      <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="p-4 bg-green-500/20 rounded-xl mb-3 inline-block">
              <Clock className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="font-medium text-white mb-1">Peak Check-in Time</h4>
            <p className="text-2xl font-bold text-green-400">10:00 AM</p>
            <p className="text-sm text-gray-400">150 check-ins</p>
          </div>
          
          <div className="text-center">
            <div className="p-4 bg-purple-500/20 rounded-xl mb-3 inline-block">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="font-medium text-white mb-1">Best Performing Event</h4>
            <p className="text-lg font-bold text-purple-400">AI & ML Seminar</p>
            <p className="text-sm text-gray-400">90% attendance rate</p>
          </div>
          
          <div className="text-center">
            <div className="p-4 bg-yellow-500/20 rounded-xl mb-3 inline-block">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
            <h4 className="font-medium text-white mb-1">Growth Rate</h4>
            <p className="text-2xl font-bold text-yellow-400">+12.5%</p>
            <p className="text-sm text-gray-400">vs last month</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">📊 Analytics Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-400">Key Observations:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Peak check-in occurs at 10:00 AM across all events</li>
              <li>• VIP attendees have 15% higher attendance rate</li>
              <li>• Jakarta events consistently outperform other cities</li>
              <li>• Weekend events show 20% lower attendance</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-purple-400">Recommendations:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Schedule important sessions around 10:00 AM</li>
              <li>• Consider VIP experience improvements</li>
              <li>• Focus marketing efforts on Jakarta market</li>
              <li>• Plan better incentives for weekend events</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;