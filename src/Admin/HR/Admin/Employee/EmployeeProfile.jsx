import { useState } from "react";
import Nav from "@/Admin/Nav";
import {
  HardHat,
  MapPin,
  Calendar,
  Shield,
  Wrench,
  Phone,
  Mail,
  User,
  Building,
  Clock,
  AlertCircle,
  Edit3,
  Settings,
  Award,
  CheckCircle,
} from "lucide-react";

export default function ProfessionalEmployeeProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: 1,
    name: "Rajesh Kumar Singh",
    position: "Senior Site Supervisor",
    email: "rajesh.kumar@buildtech.com",
    phone: "+91-9876543210",
    department: "Site Operations",
    joinDate: "2022-01-15",
    leaveBalance: "12 days",
    employeeId: "BTC-2022-001",
    aadhaar: "1234-5678-9012",
    experience: "8 years",
    currentSite: "Cyber City Phase 2",
    safetyTraining: "Completed",
    emergencyContact: "+91-9876543211",
    location: "Bengaluru, Karnataka",
    reportingManager: "Suresh Patel",
    workingHours: "09:00 AM - 06:00 PM",
  });

  const [editForm, setEditForm] = useState({ ...currentEmployee });

  const getSafetyBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Pending":
        return "bg-red-100 text-red-800 border-red-200";
      case "In Progress":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSave = () => {
    setCurrentEmployee({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...currentEmployee });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 ">
  
        <div className="max-w-4xl mx-auto ml-64">

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
                <p className="text-gray-600 mt-1">Update your personal and work information</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Personal Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="tel"
                    value={editForm.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Work Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={editForm.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Site</label>
                  <input
                    type="text"
                    value={editForm.currentSite}
                    onChange={(e) => handleInputChange('currentSite', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-64">
      <div className="max-w-6xl mx-auto">
      <Nav/>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                  <HardHat className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900">{currentEmployee.name}</h1>
                  <p className="text-xl text-gray-600 mt-1">{currentEmployee.position}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      ID: {currentEmployee.employeeId}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getSafetyBadgeColor(currentEmployee.safetyTraining)}`}>
                      <Shield className="w-3 h-3 mr-1" />
                      Safety: {currentEmployee.safetyTraining}
                    </span>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Details
              </h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="text-gray-900 truncate">{currentEmployee.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="text-gray-900">{currentEmployee.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Aadhaar Number</p>
                  <p className="text-gray-900 font-mono">{currentEmployee.aadhaar}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Emergency Contact</p>
                  <p className="text-gray-900">{currentEmployee.emergencyContact}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-gray-900">{currentEmployee.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Work Details
              </h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Department</p>
                  <p className="text-gray-900">{currentEmployee.department}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HardHat className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Current Site</p>
                  <p className="text-gray-900">{currentEmployee.currentSite}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Reporting Manager</p>
                  <p className="text-gray-900">{currentEmployee.reportingManager}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Working Hours</p>
                  <p className="text-gray-900">{currentEmployee.workingHours}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-500">Join Date</p>
                  <p className="text-gray-900">{formatDate(currentEmployee.joinDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Status */}
          <div className="space-y-6">
            {/* Experience Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Career Stats
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-2xl font-bold text-blue-600">
                      {currentEmployee.experience.split(' ')[0]}
                    </p>
                    <p className="text-sm font-medium text-blue-700">Years Experience</p>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-2xl font-bold text-emerald-600">
                      {currentEmployee.leaveBalance.split(' ')[0]}
                    </p>
                    <p className="text-sm font-medium text-emerald-700">Days Leave</p>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-lg font-semibold text-gray-800">
                    {(() => {
                      const joinDate = new Date(currentEmployee.joinDate);
                      const now = new Date();
                      const years = Math.floor((now - joinDate) / (365.25 * 24 * 60 * 60 * 1000));
                      const months = Math.floor(((now - joinDate) % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
                      return `${years}y ${months}m`;
                    })()}
                  </p>
                  <p className="text-sm font-medium text-gray-600">Time with Company</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
           
          </div>
        </div>

        {/* Safety Alert */}
        {currentEmployee.safetyTraining === "Pending" && (
          <div className="bg-red-50 border border-red-200 rounded-lg shadow-sm mt-6 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Safety Training Required</h3>
                <p className="text-red-700">
                  Your safety training certification is pending. Please contact your supervisor to schedule the required training sessions immediately.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}