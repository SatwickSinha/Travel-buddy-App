import React, { useState } from 'react';
import { 
  Home, MapPin, Users, Calendar, DollarSign, MessageSquare, 
  Settings, LogOut, ChevronDown, X, Save, Camera, 
  Plane, Heart, Coffee, Mountain, Book 
} from 'lucide-react';
import './AddTravelDetails.css';

const AddTravelDetails = () => {
  const [formData, setFormData] = useState({
    tripType: ['Adventure'],
    destination: '',
    groupSize: '',
    activities: [],
    contact: '',
    checkIn: '',
    checkOut: '',
    hotelName: '',
    totalCost: '',
    travelDate: '',
    budget: '',
    notes: '',
    booking: ''
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState({});
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const tripTypes = [
    { id: 'Adventure', label: 'Adventure', icon: Mountain },
    { id: 'Relaxation', label: 'Relaxation', icon: Coffee },
    { id: 'Cultural', label: 'Cultural', icon: Book }
  ];

  const activityOptions = [
    'Hiking', 'Swimming', 'Photography', 'Food Tours', 
    'Museums', 'Shopping', 'Nightlife', 'Beach Activities',
    'Adventure Sports', 'Cultural Sites', 'Nature Tours', 'City Tours'
  ];

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home, active: false },
    { id: 'trips', label: 'Trips', icon: Plane, active: true, hasSubmenu: true },
    { id: 'join', label: 'Join a trip', icon: Users, active: false, isSubItem: true },
    { id: 'buddies', label: 'My buddies', icon: Heart, active: false },
    { id: 'plans', label: 'Travel plans', icon: Calendar, active: false, hasSubmenu: true },
    { id: 'destinations', label: 'Destinations', icon: MapPin, active: false, hasSubmenu: true },
    { id: 'chats', label: 'Group chats', icon: MessageSquare, active: false, hasSubmenu: true },
    { id: 'itineraries', label: 'Itineraries', icon: Book, active: false }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTripTypeToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      tripType: prev.tripType.includes(type)
        ? prev.tripType.filter(t => t !== type)
        : [...prev.tripType, type]
    }));
  };

  const handleActivityToggle = (activity) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const toggleSidebar = (itemId) => {
    setSidebarCollapsed(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleSave = () => {
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
      alert('Travel details saved successfully! 🎉');
    }, 1500);
  };

  const handleCancel = () => {
    setFormData({
      tripType: ['Adventure'],
      destination: '',
      groupSize: '',
      activities: [],
      contact: '',
      checkIn: '',
      checkOut: '',
      hotelName: '',
      totalCost: '',
      travelDate: '',
      budget: '',
      notes: '',
      booking: ''
    });
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Plane size={24} className="logo-icon" />
            <span className="logo-text">Travel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map(item => (
            <div key={item.id}>
              <div 
                className={`sidebar-item ${item.active ? 'active-item' : ''} ${item.isSubItem ? 'sub-item' : ''}`}
                onClick={() => item.hasSubmenu && toggleSidebar(item.id)}
              >
                <div className="sidebar-item-content">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <ChevronDown 
                    size={16} 
                    className={`submenu-arrow ${sidebarCollapsed[item.id] ? 'collapsed' : ''}`}
                  />
                )}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button">
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="header-actions">
            <button className="header-button">
              <Calendar size={20} />
            </button>
            <button className="header-button">
              <Settings size={20} />
            </button>
            <button className="header-button">
              <MessageSquare size={20} />
            </button>
            <div className="profile-button">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                alt="Profile" 
                className="profile-image"
              />
            </div>
          </div>
        </header>

        <div className="form-container">
          <div className="form-header">
            <h1 className="form-title">Add travel details</h1>
            <button className="close-button">
              <X size={24} />
            </button>
          </div>

          <form className="form">
            <div className="form-grid">
              {/* Left Column */}
              <div className="left-column">
                {/* Trip Type */}
                <div className="form-group">
                  <label className="label">Trip type</label>
                  <div className="trip-type-buttons">
                    {tripTypes.map(type => (
                      <button
                        key={type.id}
                        type="button"
                        className={`trip-type-button ${formData.tripType.includes(type.id) ? 'trip-type-active' : ''}`}
                        onClick={() => handleTripTypeToggle(type.id)}
                      >
                        <type.icon size={16} />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination */}
                <div className="form-group">
                  <label className="label">Destination</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    placeholder="Enter destination"
                  />
                </div>

                {/* Group Size */}
                <div className="form-group">
                  <label className="label">Group size</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.groupSize}
                    onChange={(e) => handleInputChange('groupSize', e.target.value)}
                    placeholder="Number of travelers"
                    min="1"
                  />
                </div>

                {/* Activities */}
                <div className="form-group">
                  <label className="label">Activities</label>
                  <div className="activities-grid">
                    {activityOptions.map(activity => (
                      <button
                        key={activity}
                        type="button"
                        className={`activity-button ${formData.activities.includes(activity) ? 'activity-active' : ''}`}
                        onClick={() => handleActivityToggle(activity)}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="form-group">
                  <label className="label">Contact</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    placeholder="Email or phone number"
                  />
                </div>

                {/* Check-in Date */}
                <div className="form-group">
                  <label className="label">Check-in date</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  />
                </div>

                {/* Hotel Name */}
                <div className="form-group">
                  <label className="label">Hotel name</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.hotelName}
                    onChange={(e) => handleInputChange('hotelName', e.target.value)}
                    placeholder="Hotel or accommodation name"
                  />
                </div>

                {/* Total Cost */}
                <div className="form-group">
                  <label className="label">Total cost</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.totalCost}
                    onChange={(e) => handleInputChange('totalCost', e.target.value)}
                    placeholder="Total trip cost"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="right-column">
                {/* Trip Information */}
                <div className="form-group">
                  <label className="label">Travel date</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.travelDate}
                    onChange={(e) => handleInputChange('travelDate', e.target.value)}
                  />
                </div>

                {/* Budget */}
                <div className="form-group">
                  <label className="label">Budget</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="Budget per person"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label className="label">Notes</label>
                  <textarea
                    className="textarea"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Additional notes or preferences"
                    rows="4"
                  />
                </div>

                {/* Accommodation Details */}
                <div className="section-title">Accommodation details</div>

                {/* Check-out Date */}
                <div className="form-group">
                  <label className="label">Check-out date</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  />
                </div>

                {/* Booking */}
                <div className="form-group">
                  <label className="label">Booking</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.booking}
                    onChange={(e) => handleInputChange('booking', e.target.value)}
                    placeholder="Booking reference or platform"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`save-button ${showSuccessAnimation ? 'save-button-success' : ''}`}
                onClick={handleSave}
              >
                {showSuccessAnimation ? (
                  <>
                    <div className="spinner"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save details
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="success-overlay">
          <div className="success-animation">
            <div className="checkmark">✓</div>
            <p>Saving travel details...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTravelDetails;