import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  User, Mail, Phone, Building, Shield, Bell, Palette, 
  Globe, Lock, Key, Database, Download, Upload, 
  Save, RefreshCw, AlertTriangle, Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { showToast } = useOutletContext();
  const { user, role } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [activeSection, setActiveSection] = useState('profile');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || 'Demo User',
    email: user?.email || 'demo@qreventpro.com',
    phone: '+62 812-3456-7890',
    company: 'QR Event Pro Inc.',
    bio: 'Event management professional with 5+ years experience in organizing tech conferences and workshops.',
    website: 'https://qreventpro.com',
    location: 'Jakarta, Indonesia'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    checkinAlerts: true,
    weeklyReports: false,
    marketingEmails: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,
    apiAccess: true
  });

  const [appSettings, setAppSettings] = useState({
    language: 'en',
    timezone: 'Asia/Jakarta',
    dateFormat: 'DD/MM/YYYY',
    currency: 'IDR',
    defaultEventCapacity: 100,
    autoBackup: true
  });

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Notification settings updated!', 'success');
    } catch (error) {
      showToast('Failed to update notifications', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSecurity = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Security settings updated!', 'success');
    } catch (error) {
      showToast('Failed to update security settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAppSettings = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Application settings updated!', 'success');
    } catch (error) {
      showToast('Failed to update app settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    showToast('Data export will be ready in a few minutes. Check your email!', 'info');
  };

  const handleImportData = () => {
    showToast('Data import functionality coming soon!', 'info');
  };

  const settingsSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'application', label: 'Application', icon: Globe },
    { id: 'data', label: 'Data & Privacy', icon: Database }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Settings</h2>
          <p className="text-gray-400 mt-1">Manage your account and application preferences</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg">
          <Shield className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-400 font-medium">{role?.toUpperCase()} ACCESS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4">
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-red-500/20 border border-red-500/30 text-white'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
            {/* Profile Settings */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                    {profileData.displayName[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Profile Information</h3>
                    <p className="text-gray-400">Update your personal information and profile details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Profile</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Notification Preferences</h3>
                  <p className="text-gray-400">Choose how you want to be notified about events and activities</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get push notifications in your browser' },
                    { key: 'eventReminders', label: 'Event Reminders', desc: 'Reminders before your events start' },
                    { key: 'checkinAlerts', label: 'Check-in Alerts', desc: 'Notifications when attendees check in' },
                    { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Weekly summary of your event analytics' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Product updates and promotional content' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                      <div>
                        <h4 className="font-medium text-white">{setting.label}</h4>
                        <p className="text-sm text-gray-400">{setting.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[setting.key]}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            [setting.key]: e.target.checked
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotifications}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Notifications</span>
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Security & Privacy</h3>
                  <p className="text-gray-400">Manage your account security and privacy settings</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                    <div>
                      <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          twoFactorAuth: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-800/30 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">Session Timeout</h4>
                    </div>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: e.target.value
                      })}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="480">8 hours</option>
                      <option value="never">Never</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                    <div>
                      <h4 className="font-medium text-white">Login Alerts</h4>
                      <p className="text-sm text-gray-400">Get notified of suspicious login attempts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.loginAlerts}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          loginAlerts: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                    <div>
                      <h4 className="font-medium text-white">API Access</h4>
                      <p className="text-sm text-gray-400">Allow third-party applications to access your data</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.apiAccess}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          apiAccess: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-400 mb-1">Security Recommendation</h4>
                      <p className="text-sm text-yellow-300">
                        We recommend enabling two-factor authentication and setting a session timeout for enhanced security.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => showToast('Password change functionality coming soon!', 'info')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 text-white rounded-lg transition-all duration-200"
                  >
                    <Key className="w-4 h-4" />
                    <span>Change Password</span>
                  </button>
                  <button
                    onClick={handleSaveSecurity}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Security</span>
                  </button>
                </div>
              </div>
            )}

            {/* Application Settings */}
            {activeSection === 'application' && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Application Settings</h3>
                  <p className="text-gray-400">Customize your application experience and preferences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                    <select
                      value={appSettings.language}
                      onChange={(e) => setAppSettings({...appSettings, language: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="en">English</option>
                      <option value="id">Bahasa Indonesia</option>
                      <option value="zh">中文</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                    <select
                      value={appSettings.timezone}
                      onChange={(e) => setAppSettings({...appSettings, timezone: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="Asia/Jakarta">Asia/Jakarta (UTC+7)</option>
                      <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                      <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                      <option value="UTC">UTC (UTC+0)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date Format</label>
                    <select
                      value={appSettings.dateFormat}
                      onChange={(e) => setAppSettings({...appSettings, dateFormat: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                    <select
                      value={appSettings.currency}
                      onChange={(e) => setAppSettings({...appSettings, currency: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="IDR">Indonesian Rupiah (IDR)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="SGD">Singapore Dollar (SGD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Default Event Capacity</label>
                    <input
                      type="number"
                      value={appSettings.defaultEventCapacity}
                      onChange={(e) => setAppSettings({...appSettings, defaultEventCapacity: parseInt(e.target.value)})}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50"
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-xl">
                    <Palette className="w-5 h-5 text-purple-400" />
                    <div className="flex-1">
                      <h4 className="font-medium text-white">Dark Mode</h4>
                      <p className="text-sm text-gray-400">Use dark theme for better viewing experience</p>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg transition-colors"
                    >
                      {theme === 'dark' ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                    <div>
                      <h4 className="font-medium text-white">Auto Backup</h4>
                      <p className="text-sm text-gray-400">Automatically backup your data daily</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={appSettings.autoBackup}
                        onChange={(e) => setAppSettings({
                          ...appSettings,
                          autoBackup: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveAppSettings}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Data & Privacy */}
            {activeSection === 'data' && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Data & Privacy</h3>
                  <p className="text-gray-400">Manage your data and privacy preferences</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <Database className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-400 mb-2">Data Export</h4>
                        <p className="text-sm text-blue-300 mb-4">
                          Download a copy of all your data including events, attendees, and analytics.
                        </p>
                        <button
                          onClick={handleExportData}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export Data</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <Upload className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-400 mb-2">Data Import</h4>
                        <p className="text-sm text-green-300 mb-4">
                          Import data from other event management platforms or backup files.
                        </p>
                        <button
                          onClick={handleImportData}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Import Data</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-400 mb-2">Delete Account</h4>
                        <p className="text-sm text-red-300 mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button
                          onClick={() => showToast('Account deletion requires email confirmation. Feature coming soon.', 'info')}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors"
                        >
                          <AlertTriangle className="w-4 h-4" />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-4">
                  <h4 className="font-medium text-white mb-3">Privacy Information</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Your data is encrypted and stored securely</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>We never share your personal data with third parties</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>You have full control over your data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Regular security audits and compliance checks</span>
                    </div>
                  </div>
                </div>

                {/* Data Usage Statistics */}
                <div className="bg-gray-800/30 rounded-xl p-4">
                  <h4 className="font-medium text-white mb-4">Data Usage Overview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-400">4</p>
                      <p className="text-sm text-gray-400">Total Events</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">875</p>
                      <p className="text-sm text-gray-400">Total Attendees</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">2.4 MB</p>
                      <p className="text-sm text-gray-400">Storage Used</p>
                    </div>
                  </div>
                </div>

                {/* GDPR Compliance */}
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                  <h4 className="font-medium text-purple-400 mb-2">GDPR Compliance</h4>
                  <p className="text-sm text-purple-300 mb-3">
                    We comply with GDPR regulations to protect your privacy rights.
                  </p>
                  <div className="space-y-2 text-xs text-purple-200">
                    <div className="flex items-center space-x-2">
                      <Check className="w-3 h-3" />
                      <span>Right to access your personal data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-3 h-3" />
                      <span>Right to rectification of inaccurate data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-3 h-3" />
                      <span>Right to erasure (right to be forgotten)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-3 h-3" />
                      <span>Right to data portability</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-900/30 border border-gray-800/30 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user?.displayName || 'Demo User'}</p>
              <p className="text-xs text-gray-400">Member since November 2024</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Last updated</p>
            <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;