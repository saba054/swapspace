"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, CalendarDays, Download, Plus, Edit, Trash2, Eye } from "lucide-react";
import PropertyDetails from "./PropertyDetails";

const initialPropertyData = [
  {
    id: 1,
    title: "Modern Loft",
    status: "Available",
    price: "1,300,000",
    type: "For rent",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 2,
    title: "City View Flat",
    status: "Pending",
    price: "1,150,000",
    type: "For rent",
    img: "https://fesfas.com/cdn/shop/articles/fdc5b3520870af529fa626369db16265_1000x.jpg?v=1694052854",
  },
  {
    id: 3,
    title: "Beachside Apartment",
    status: "Available",
    price: "2,000,000",
    type: "For sale",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  },
  {
    id: 4,
    title: "Urban Studio",
    status: "Pending",
    price: "950,000",
    type: "For rent",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9sWs_Eez0KLZAzNlfLXhVawFQihOrMFf3SinVE1X0GOAXJ6HVY8NWnVYoFiOXDqnAV4&usqp=CAU",
  },
  {
    id: 5,
    title: "Classic Residence",
    status: "Available",
    price: "1,700,000",
    type: "For sale",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg9oXNFWxtdw3gC7Aa8Ujdc-GQJ967qMgKfJZT2hvsh7MMGEcd6DBl56mvxWrgLfp2Y_c&usqp=CAU",
  },
  {
    id: 6,
    title: "Downtown Highrise",
    status: "Available",
    price: "2,500,000",
    type: "For sale",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  },
  {
    id: 7,
    title: "Garden Flat",
    status: "Pending",
    price: "1,200,000",
    type: "For rent",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV89GC9jari_4Hb8DcZZofIeEuo-_vsUodRuAhTrUtkEn7NNcRd5e34mL22Bbt2zTHmbE&usqp=CAU",
  },
  {
    id: 8,
    title: "Modern Duplex",
    status: "Available",
    price: "3,100,000",
    type: "For sale",
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92",
  },
];

export default function PropertyManagement() {
  const [tab, setTab] = useState("all");
  const [properties, setProperties] = useState(initialPropertyData);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [form, setForm] = useState({
    title: "",
    status: "Available",
    price: "",
    type: "For rent",
    img: ""
  });

  // Filtering by tab
  const filteredProperties = properties.filter((p) => {
    if (tab === "all") return true;
    if (tab === "live") return p.status === "Available";
    if (tab === "decline") return p.status === "Declined";
    if (tab === "draft") return p.status === "Draft";
    return true;
  });

  // Modal open helpers
  const openAddModal = () => {
    setModalType("add");
    setForm({ title: "", status: "Available", price: "", type: "For rent", img: "" });
  };
  const openEditModal = (property) => {
    setModalType("edit");
    setForm({ ...property });
    setSelectedProperty(property);
  };
  const openViewPage = (property) => {
    setSelectedProperty(property);
  };

  // CRUD handlers
  const handleAdd = () => {
    if (!form.title || !form.price || !form.img) {
      alert("Please fill in all required fields");
      return;
    }
    setProperties([
      ...properties,
      { ...form, id: Date.now() }
    ]);
    setModalType("add");
  };
  const handleEdit = () => {
    setProperties(properties.map((p) =>
      p.id === selectedProperty.id ? { ...form, id: p.id } : p
    ));
    setSelectedProperty(null);
    setModalType("add");
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  if (selectedProperty) {
    return (
      <PropertyDetails property={selectedProperty} onBack={() => setSelectedProperty(null)} />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight"> Property Management</h2>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline">Today</Button>
          <Button variant="outline">This Week</Button>
          <Button variant="outline">This Month</Button>
          <Button variant="outline" className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            10/10/2025–10/10/2024
          </Button>
          <Button className="bg-teal-600 text-white hover:bg-teal-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="text-lg font-medium">
        Total Listings: <span className="font-bold text-teal-600">{properties.length}</span>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <select className="border rounded px-2 py-1 text-sm">
          <option>Sort by</option>
        </select>
        <select className="border rounded px-2 py-1 text-sm">
          <option>Property Type</option>
        </select>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="decline">Decline</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Most Viewed */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-base">
          🔥 Most Viewed Properties <span className="text-gray-500 text-sm">({Math.min(4, properties.length)})</span>
        </div>
        <button className="text-teal-600 text-sm font-medium hover:underline">See more</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
        {filteredProperties.slice(0, 4).map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            onEdit={() => openEditModal(property)}
            onDelete={() => handleDelete(property.id)}
            onView={() => openViewPage(property)}
            onImageClick={() => openViewPage(property)}
          />
        ))}
      </div>

      {/* All Listings */}
      <div className="font-semibold text-base mb-2">📋 All Listings</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            onEdit={() => openEditModal(property)}
            onDelete={() => handleDelete(property.id)}
            onView={() => openViewPage(property)}
            onImageClick={() => openViewPage(property)}
          />
        ))}
      </div>
    </div>
  );
}

function PropertyCard({ title, status, price, type, img, onEdit, onDelete, onView, onImageClick }) {
  return (
    <Card className="overflow-hidden shadow hover:shadow-lg transition relative">
      <div className="relative h-32 w-full bg-gray-100 cursor-pointer" onClick={onImageClick}>
        <img src={img} alt={title} className="object-cover w-full h-full" />
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {title}
        </div>
        <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-yellow-500 text-white">
          {status}
        </div>
      </div>
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-teal-700 font-medium">{type}</span>
          <span className="font-semibold text-gray-800">₦ {price}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 w-full">
          <Button size="sm" variant="outline" onClick={onView} className="flex-1 min-w-[90px]">
            <Eye className="w-4 h-4 mr-1" /> View
          </Button>
          <Button size="sm" variant="outline" onClick={onEdit} className="flex-1 min-w-[90px]">
            <Edit className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete} className="flex-1 min-w-[90px]">
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
