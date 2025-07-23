import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Camera, Scan, QrCode, CheckCircle, X, User, Calendar, Clock } from 'lucide-react';

const Scanner = () => {
  const { showToast } = useOutletContext();
  const [scanning, setScanning] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [scanHistory, setScanHistory] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [events] = useState([
    { id: '1', title: 'Tech Summit 2024', location: 'Jakarta Convention Center', date: '2024-12-15' },
    { id: '2', title: 'Digital Marketing Workshop', location: 'Bali Convention Center', date: '2024-12-20' },
    { id: '3', title: 'Startup Networking Event', location: 'Surabaya Business Center', date: '2024-12-25' },
  ]);

  const [attendees] = useState([
    { id: '1', eventId: '1', name: 'John Doe', email: 'john.doe@email.com', checkedIn: false },
    { id: '2', eventId: '1', name: 'Jane Smith', email: 'jane.smith@email.com', checkedIn: false },
    { id: '3', eventId: '2', name: 'Michael Johnson', email: 'michael.j@email.com', checkedIn: false },
    { id: '4', eventId: '1', name: 'Sarah Wilson', email: 'sarah.wilson@email.com', checkedIn: true },
  ]);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    if (!selectedEvent) {
      showToast('Please select an event first', 'error');
      return;
    }

    try {
      setScanning(true);
      
      // Mock camera access since we can't access real camera in this environment
      showToast('Camera scanning started (simulated)', 'info');
      
      // Simulate QR code scanning after 3 seconds
      setTimeout(() => {
        simulateScan();
      }, 3000);

    } catch (error) {
      showToast('Failed to access camera: ' + error.message, 'error');
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const simulateScan = () => {
    // Simulate scanning a random attendee
    const eventAttendees = attendees.filter(a => a.eventId === selectedEvent);
    if (eventAttendees.length === 0) {
      showToast('No attendees found for this event', 'error');
      setScanning(false);
      return;
    }

    const randomAttendee = eventAttendees[Math.floor(Math.random() * eventAttendees.length)];
    const event = events.find(e => e.id === selectedEvent);
    
    handleScanResult({
      attendeeId: randomAttendee.id,
      eventId: selectedEvent,
      attendeeName: randomAttendee.name,
      eventTitle: event.title,
      timestamp: new Date().toISOString()
    });

    setScanning(false);
  };

  const handleScanResult = (scanData) => {
    const attendee = attendees.find(a => a.id === scanData.attendeeId);
    const event = events.find(e => e.id === scanData.eventId);

    if (!attendee) {
      showToast('Attendee not found!', 'error');
      return;
    }

    if (!event) {
      showToast('Event not found!', 'error');
      return;
    }

    if (attendee.checkedIn) {
      showToast(`${attendee.name} is already checked in!`, 'error');
      return;
    }

    // Add to scan history
    const scanRecord = {
      id: Date.now().toString(),
      attendeeName: attendee.name,
      attendeeEmail: attendee.email,
      eventTitle: event.title,
      timestamp: scanData.timestamp,
      status: 'success'
    };

    setScanHistory(prev => [scanRecord, ...prev.slice(0, 9)]); // Keep last 10 scans
    
    // Mark as checked in (in real app, this would update the database)
    attendee.checkedIn = true;
    
    showToast(`✅ ${attendee.name} checked in successfully!`, 'success');
  };

  const manualCheckIn = () => {
    showToast('Manual check-in modal will be implemented soon!', 'info');
  };

  const clearHistory = () => {
    setScanHistory([]);
    showToast('Scan history cleared', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">QR Code Scanner</h2>
          <p className="text-gray-400 mt-1">Scan QR codes for quick attendee check-ins</p>
        </div>
        <button
          onClick={manualCheckIn}
          className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 text-white rounded-lg transition-all duration-200"
        >
          Manual Check-in
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scanner Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
            {/* Event Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">Select Event</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all"
              >
                <option value="">Choose an event...</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.title} - {new Date(event.date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Camera/Scanner Area */}
            <div className="relative bg-gray-800/30 rounded-xl p-8 text-center border-2 border-dashed border-gray-700/50 mb-6">
              {!scanning ? (
                <div>
                  <div className="w-24 h-24 bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Ready to Scan</h3>
                  <p className="text-gray-400 mb-6">
                    Position the QR code within the camera frame to check in attendees
                  </p>
                  <button
                    onClick={startScanning}
                    disabled={!selectedEvent}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg"
                  >
                    Start Scanner
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-24 h-24 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Scan className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Scanning...</h3>
                  <p className="text-gray-400 mb-6">
                    Point your camera at the QR code
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-green-400 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <button
                    onClick={stopScanning}
                    className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200"
                  >
                    Stop Scanner
                  </button>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <h4 className="font-medium text-blue-400 mb-2">Scanning Tips:</h4>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Ensure the QR code is well-lit and clearly visible</li>
                <li>• Hold the camera steady and at a reasonable distance</li>
                <li>• The QR code should fit within the camera frame</li>
                <li>• Wait for the green confirmation before scanning the next code</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scan History & Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Today's Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Scans</span>
                <span className="font-semibold text-white">{scanHistory.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Successful</span>
                <span className="font-semibold text-green-400">
                  {scanHistory.filter(s => s.status === 'success').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Failed</span>
                <span className="font-semibold text-red-400">
                  {scanHistory.filter(s => s.status === 'error').length}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Scans */}
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Scans</h3>
              {scanHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {scanHistory.length === 0 ? (
                <div className="text-center py-8">
                  <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No scans yet</p>
                  <p className="text-gray-500 text-xs">Recent check-ins will appear here</p>
                </div>
              ) : (
                scanHistory.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30"
                  >
                    <div className={`p-2 rounded-lg ${
                      scan.status === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {scan.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-white text-sm truncate">
                          {scan.attendeeName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-400 truncate">
                          {scan.eventTitle}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-500">
                          {new Date(scan.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      {selectedEvent && (
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Selected Event Details</h3>
          {(() => {
            const event = events.find(e => e.id === selectedEvent);
            const eventAttendees = attendees.filter(a => a.eventId === selectedEvent);
            const checkedInCount = eventAttendees.filter(a => a.checkedIn).length;
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-2">{event.title}</h4>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Attendance</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Registered:</span>
                      <span className="text-white">{eventAttendees.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Checked In:</span>
                      <span className="text-green-400">{checkedInCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pending:</span>
                      <span className="text-yellow-400">{eventAttendees.length - checkedInCount}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Check-in Rate</span>
                      <span className="text-white">
                        {eventAttendees.length > 0 ? Math.round((checkedInCount / eventAttendees.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${eventAttendees.length > 0 ? (checkedInCount / eventAttendees.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default Scanner;