"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft, MapPin, Bed, Bath, Ruler, Image, Video, Eye, Map,
  User, FileText, Download, CheckCircle, Clock
} from "lucide-react";

const property = {
  title: "Amazon Deluxe",
  type: "Villa",
  price: "AED 55,000/year",
  address: "Al Barsha South, Al Barsha South, Abu Dhabi",
  status: "Available",
  mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://fesfas.com/cdn/shop/articles/fdc5b3520870af529fa626369db16265_1000x.jpg?v=1694052854",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
  ],
  beds: 3,
  baths: 2,
  area: "1,344 sqm",
  propertyInfo: {
    "Property ID": "123456",
    "Listed": "25/12/2022",
    "Property Type": "Villa",
    "Status": "Available",
    "Price": "AED 55,000/year",
    "Payment": "Yearly",
    "Furnished": "Yes",
    "Listed By": "Owner",
    "Purpose": "For Rent",
    "Added": "2 months ago"
  },
  utilities: "None Listed",
  description: "A beautiful villa in the heart of Abu Dhabi. Spacious, modern, and close to all amenities. Perfect for families.",
  proximity: "2.5 km to main market",
  features: [
    { label: "Parking", value: "2" },
    { label: "Balcony", value: "Yes" },
    { label: "Security", value: "24/7" },
    { label: "Gym", value: "Yes" },
    { label: "Pool", value: "Yes" },
    { label: "Appliances", value: "All included" }
  ],
  owner: {
    name: "John Doe",
    phone: "+971 50 123 4567",
    email: "john.doe@email.com"
  },
  propertyHistory: [
    { date: "2022", status: "Rented", icon: <CheckCircle className="w-4 h-4 text-green-600 inline" /> },
    { date: "2023", status: "Vacant", icon: <Clock className="w-4 h-4 text-yellow-600 inline" /> }
  ],
  takhseesiPermit: "123456789",
  documents: [
    { name: "Property Document", status: "On Download", icon: <Download className="w-4 h-4 inline" /> }
  ]
};

export default function PropertyDetails({ onBack }) {
  const [mainImg, setMainImg] = useState(property.mainImage);
  const [tab, setTab] = useState("photos");
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => (onBack ? onBack() : window.history.back())}
            className="mr-2"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold">Property Details</h2>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="bg-teal-600 text-white">Available</Button>
          <Button size="sm" variant="outline" onClick={() => setShowContact(true)}>Contact</Button>
        </div>
      </div>

      {/* Main Image & Gallery */}
      <div className="rounded-lg overflow-hidden mb-2">
        <img src={mainImg} alt={property.title} className="w-full h-64 object-cover" />
      </div>
      {tab === "photos" && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {(property.images || []).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Gallery"
              className={`w-28 h-16 object-cover rounded border cursor-pointer ${mainImg === img ? 'border-teal-500 ring-2 ring-teal-400' : 'border-gray-200'}`}
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>
      )}

      {/* Tabs for Photos, Videos, 3D, Map */}
      <div className="flex gap-2 mb-2">
        <Button size="sm" variant={tab === "photos" ? "default" : "outline"} onClick={() => setTab("photos")}> <Image className="w-4 h-4 mr-1" /> Photos</Button>
        <Button size="sm" variant={tab === "videos" ? "default" : "outline"} onClick={() => setTab("videos")}> <Video className="w-4 h-4 mr-1" /> Videos</Button>
        <Button size="sm" variant={tab === "3d" ? "default" : "outline"} onClick={() => setTab("3d")}> <Eye className="w-4 h-4 mr-1" /> 3D Virtual</Button>
        <Button size="sm" variant={tab === "map" ? "default" : "outline"} onClick={() => setTab("map")}> <Map className="w-4 h-4 mr-1" /> Map</Button>
      </div>

      {/* Tab Content */}
      {tab === "videos" && (
        <div className="mb-4">
          <div className="bg-gray-100 rounded p-8 text-center text-gray-500">No videos available.</div>
        </div>
      )}
      {tab === "3d" && (
        <div className="mb-4">
          <div className="bg-gray-100 rounded p-8 text-center text-gray-500">3D Virtual Tour Coming Soon.</div>
        </div>
      )}
      {tab === "map" && (
        <div className="mb-4">
          <div className="bg-gray-100 rounded p-8 text-center text-gray-500">Map View Coming Soon.</div>
        </div>
      )}

      {/* Badges for Type, Beds, Baths, Area */}
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="bg-gray-100 px-3 py-1 rounded text-sm font-medium">Type: {property.type}</span>
        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded text-sm font-medium flex items-center"><Bed className="w-4 h-4 mr-1" /> 3 beds</span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium flex items-center"><Bath className="w-4 h-4 mr-1" /> 2 baths</span>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-medium flex items-center"><Ruler className="w-4 h-4 mr-1" /> 1,344 sqm</span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        {/* Property Info */}
        <Card className="rounded-lg">
          <CardContent className="p-4 space-y-2">
            <div className="font-semibold mb-2">Property Info</div>
            {Object.entries(property.propertyInfo || {}).map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm text-gray-700">
                <span className="capitalize">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Utilities */}
        <Card className="rounded-lg">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Utilities</div>
            <div className="text-sm text-gray-700">{property.utilities}</div>
          </CardContent>
        </Card>
        {/* Description & Proximity */}
        <Card className="rounded-lg">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Description</div>
            <div className="text-sm text-gray-700 mb-2">{property.description}</div>
            <div className="font-semibold mb-1">Proximity</div>
            <div className="text-xs text-gray-500">{property.proximity}</div>
          </CardContent>
        </Card>
      </div>

      {/* Lower Grid: Owner, Features, Property History, Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Owner Card */}
        <Card className="rounded-lg">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Owner</div>
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4" />
              <span className="font-medium">{property.owner.name}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">{property.owner.phone}</div>
            <div className="text-xs text-gray-500">{property.owner.email}</div>
          </CardContent>
        </Card>
        {/* Features */}
        <Card className="rounded-lg">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Features</div>
            <ul className="text-sm text-gray-700 space-y-1">
              {(property.features || []).map((f, idx) => (
                <li key={idx} className="flex justify-between"><span>{f.label}</span><span className="font-medium">{f.value}</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {/* Property History */}
        <Card className="rounded-lg">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Property History</div>
            <ul className="text-sm text-gray-700 space-y-1">
              {(property.propertyHistory || []).map((h, idx) => (
                <li key={idx} className="flex items-center gap-2">{h.icon} <span>{h.date} - {h.status}</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {/* Takhseesi Permit & Documents */}
        <Card className="rounded-lg">
          <CardContent className="p-4">
            <div className="font-semibold mb-2">Takhseesi Permit</div>
            <div className="text-sm text-gray-700 mb-2">{property.takhseesiPermit}</div>
            <div className="font-semibold mb-2">Documents</div>
            {(property.documents || []).map((doc, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                {doc.icon}
                <span>{doc.name}</span>
                <Button size="sm" variant="outline" className="ml-auto" onClick={() => alert('Downloading document...')}>{doc.status}</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Contact Owner</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowContact(false)}>✕</Button>
            </div>
            <div className="mb-4 text-sm text-gray-700">
              <div><b>Name:</b> {property.owner.name}</div>
              <div><b>Phone:</b> {property.owner.phone}</div>
              <div><b>Email:</b> {property.owner.email}</div>
            </div>
            <Button className="w-full bg-teal-600 text-white" onClick={() => { setShowContact(false); alert('Contact request sent!'); }}>Send Message</Button>
          </div>
        </div>
      )}
    </div>
  );
} 