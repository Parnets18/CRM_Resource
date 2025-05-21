
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Utensils, MapPin, Phone, Menu, FileText, IndianRupee, CreditCard, Save, Trash2 } from "lucide-react"
import RestoNav from "../RestoNav"
import { useState, useEffect } from "react"

export default function Profile() {
  // Initial state with empty values for all form fields
  const initialFormState = {
    // Business Information
    legalName: "",
    tradeName: "",
    gstin: "",
    pan: "",
    fssai: "",
    ownerAadhaar: "",
    businessType: "",

    // Restaurant Details
    name: "",
    cuisine: "",
    description: "",
    rating: "",

    // Contact Information
    phone: "",
    email: "",
    website: "",

    // Location
    address: "",
    city: "",
    zip: "",
    country: "",

    // Financial Information
    bankName: "",
    accountNumber: "",
    ifsc: "",
    upiId: "",
  }

  // State to store form data
  const [formData, setFormData] = useState(initialFormState)

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))

    // Log the change to console
    console.log(`Field "${id}" updated to: ${value}`)
  }

  // Function to save data
  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("restaurantProfileData", JSON.stringify(formData))

    // Log to console
    console.log("Data saved successfully:", formData)

    // You could also implement API calls here
    alert("Profile data saved successfully!")
  }

  // Function to delete data
  const handleDelete = () => {
    // Clear from localStorage
    localStorage.removeItem("restaurantProfileData")

    // Reset form
    setFormData(initialFormState)

    // Log to console
    console.log("Data deleted successfully")

    alert("Profile data deleted successfully!")
  }

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("restaurantProfileData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
        console.log("Loaded saved data:", parsedData)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  return (
   // ...existing code...
    <div className="min-h-screen bg-white lg:ml-64">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <RestoNav />

        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">Restaurant Profile</h2>
              <p className="text-gray-700">Manage your business details</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200">
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Business Information Section */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="legalName">
                      Legal Business Name
                    </Label>
                    <Input
                      id="legalName"
                      placeholder="Enter legal name"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.legalName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="tradeName">
                      Trading Name
                    </Label>
                    <Input
                      id="tradeName"
                      placeholder="Name displayed to customers"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.tradeName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="gstin">
                      GSTIN
                    </Label>
                    <Input
                      id="gstin"
                      placeholder="22AAAAA0000A1Z5"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.gstin}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="pan">
                      PAN Number
                    </Label>
                    <Input
                      id="pan"
                      placeholder="AAAAA0000A"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.pan}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="fssai">
                      FSSAI License
                    </Label>
                    <Input
                      id="fssai"
                      placeholder="12345678901234"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.fssai}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="ownerAadhaar">
                      Owner Aadhaar Number
                    </Label>
                    <Input
                      id="ownerAadhaar"
                      placeholder="1234 5678 9012"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.ownerAadhaar}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="businessType">
                      Business Type
                    </Label>
                    <select
                      id="businessType"
                      className="flex h-10 w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.businessType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select business type</option>
                      <option value="proprietorship">Proprietorship</option>
                      <option value="partnership">Partnership</option>
                      <option value="llp">LLP</option>
                      <option value="pvt-ltd">Private Limited</option>
                    </select>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Restaurant Details Section */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Utensils className="w-5 h-5 text-blue-400" />
                Restaurant Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="name">
                      Restaurant Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter restaurant name"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="cuisine">
                      Cuisine Type
                    </Label>
                    <Input
                      id="cuisine"
                      placeholder="e.g. Italian, Mexican"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.cuisine}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="description">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your restaurant"
                      className="bg-gray-100 border-gray-300 text-black h-24"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="rating">
                      Average Rating
                    </Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="4.5"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.rating}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact & Location Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-400" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="phone">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(123) 456-7890"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@restaurant.com"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="website">
                      Website
                    </Label>
                    <Input
                      id="website"
                      placeholder="https://yourrestaurant.com"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="address">
                      Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700" htmlFor="city">
                        City
                      </Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        className="bg-gray-100 border-gray-300 text-black"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700" htmlFor="zip">
                        ZIP Code
                      </Label>
                      <Input
                        id="zip"
                        placeholder="10001"
                        className="bg-gray-100 border-gray-300 text-black"
                        value={formData.zip}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="country">
                      Country
                    </Label>
                    <Input
                      id="country"
                      placeholder="United States"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Financial & Operating Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-blue-400" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="bankName">
                      Bank Name
                    </Label>
                    <Input
                      id="bankName"
                      placeholder="State Bank of India"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.bankName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="accountNumber">
                      Account Number
                    </Label>
                    <Input
                      id="accountNumber"
                      placeholder="1234567890"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="ifsc">
                      IFSC Code
                    </Label>
                    <Input
                      id="ifsc"
                      placeholder="SBIN0001234"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.ifsc}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="upiId">
                      UPI ID
                    </Label>
                    <Input
                      id="upiId"
                      placeholder="restaurant@upi"
                      className="bg-gray-100 border-gray-300 text-black"
                      value={formData.upiId}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Document Upload Section */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                Document Uploads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700">GST Certificate</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="bg-gray-100 border-gray-300 text-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">PAN Card</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="bg-gray-100 border-gray-300 text-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">FSSAI License</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="bg-gray-100 border-gray-300 text-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Owner Aadhaar</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="bg-gray-100 border-gray-300 text-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Cancelled Cheque</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="bg-gray-100 border-gray-300 text-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Rental Agreement</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="bg-gray-100 border-gray-300 text-black" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300 flex items-center gap-2"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
              Delete Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2" onClick={handleSave}>
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
// ...existing code...
  )
}
