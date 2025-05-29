import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Utensils, Clock, MapPin, Star, Users, Phone, Globe, Menu, Calendar, FileText, IndianRupee, CreditCard } from "lucide-react";
import RestoNav from "../RestoNav";

export default function Profile() {
  return (
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
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
              {/* <Menu className="w-5 h-5" /> */}
            </Button>
          </div>

          {/* Business Information Section */}
          <Card className="border border-blue-500/20 bg-white backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700" htmlFor="businessType">
                      Business Type
                    </Label>
                    <select
                      id="businessType"
                      className="flex h-10 w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <Utensils className="w-5 h-5 text-purple-400" />
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
                  <Phone className="w-5 h-5 text-purple-400" />
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
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-blue-500/20 bg-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
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
                  <IndianRupee className="w-5 h-5 text-purple-400" />
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
                <CreditCard className="w-5 h-5 text-purple-400" />
                Document Uploads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700">GST Certificate</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">PAN Card</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">FSSAI License</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Owner Aadhaar</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Cancelled Cheque</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Rental Agreement</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      className="bg-gray-100 border-gray-300 text-black"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-8">
            <Button variant="outline" className="text-gray-700 border-gray-300">
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}