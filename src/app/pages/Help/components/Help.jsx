"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronDown, ChevronUp, MessageSquare, Phone, Mail, Video, Book, Download, ExternalLink, HelpCircle, Users, Settings, CreditCard, Home } from "lucide-react";

const faqData = {
  general: [
    {
      question: "How do I create an account?",
      answer: "To create an account, click the 'Sign Up' button on the homepage. You'll need to provide your email address, create a password, and fill in your basic information. Once submitted, you'll receive a confirmation email to verify your account."
    },
    {
      question: "How do I reset my password?",
      answer: "If you've forgotten your password, click 'Forgot Password' on the login page. Enter your email address and we'll send you a link to reset your password. Make sure to check your spam folder if you don't see the email."
    },
    {
      question: "What are the system requirements?",
      answer: "Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser. The platform is also mobile-responsive and works on smartphones and tablets."
    }
  ],
  properties: [
    {
      question: "How do I add a new property listing?",
      answer: "To add a new property, go to the Property Management section and click 'Add New Property'. Fill in all the required information including property details, photos, and pricing. Make sure to add high-quality images and accurate descriptions to attract potential tenants or buyers."
    },
    {
      question: "How do I edit or update a property listing?",
      answer: "Find your property in the Property Management section, click on the property card, and select 'Edit'. You can update any information including photos, pricing, and descriptions. Changes are saved automatically and will be visible to users immediately."
    },
    {
      question: "How do I manage property photos?",
      answer: "When adding or editing a property, you can upload multiple photos. We recommend using high-quality images (minimum 800x600 pixels) and including photos of all major rooms and features. You can drag and drop to reorder photos or delete unwanted ones."
    }
  ],
  payments: [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our payment partners."
    },
    {
      question: "How do I update my billing information?",
      answer: "Go to Settings > Subscription to update your billing information. You can change your payment method, update billing address, or modify your subscription plan at any time."
    },
    {
      question: "Can I get a refund?",
      answer: "We offer a 30-day money-back guarantee for all subscriptions. If you're not satisfied with our service, contact our support team within 30 days of your purchase for a full refund."
    }
  ],
  support: [
    {
      question: "How do I contact customer support?",
      answer: "You can contact our support team through multiple channels: Live chat (available 24/7), email at support@example.com, or phone at 1-800-123-4567. Our average response time is under 2 hours."
    },
    {
      question: "What are your support hours?",
      answer: "Our customer support team is available 24/7 through live chat and email. Phone support is available Monday through Friday, 9 AM to 6 PM EST. Emergency support is available outside these hours for critical issues."
    },
    {
      question: "How do I report a bug?",
      answer: "To report a bug, use the Feedback section in your dashboard or email us at bugs@example.com. Please include detailed information about the issue, your browser/device, and steps to reproduce the problem."
    }
  ]
};

const helpCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: <Home className="w-6 h-6" />,
    description: "Learn the basics and set up your account",
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: "properties",
    name: "Property Management",
    icon: <Settings className="w-6 h-6" />,
    description: "Manage your property listings and bookings",
    color: "bg-green-100 text-green-600"
  },
  {
    id: "payments",
    name: "Billing & Payments",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Manage your subscription and payments",
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: "support",
    name: "Support & Contact",
    icon: <Users className="w-6 h-6" />,
    description: "Get help and contact our support team",
    color: "bg-orange-100 text-orange-600"
  }
];

const tutorials = [
  {
    title: "Getting Started Guide",
    duration: "5 min",
    description: "Learn how to set up your account and navigate the platform",
    videoUrl: "#",
    thumbnail: "🎥"
  },
  {
    title: "Adding Your First Property",
    duration: "8 min",
    description: "Step-by-step guide to creating your first property listing",
    videoUrl: "#",
    thumbnail: "🏠"
  },
  {
    title: "Managing Bookings",
    duration: "6 min",
    description: "How to handle booking requests and manage your calendar",
    videoUrl: "#",
    thumbnail: "📅"
  },
  {
    title: "Payment Setup",
    duration: "4 min",
    description: "Setting up payment methods and managing billing",
    videoUrl: "#",
    thumbnail: "💳"
  }
];

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleContactSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      alert("Please fill in all fields");
      return;
    }
    alert("Thank you for contacting us! We'll get back to you within 2 hours.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaq = Object.entries(faqData).flatMap(([category, faqs]) =>
    faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How can we help you?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions, watch tutorials, and get the support you need
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for help articles, tutorials, or FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
          />
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {helpCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="overview">
        <TabsList className="border-b border-gray-200 bg-transparent">
          <TabsTrigger value="overview" className="data-[state=active]:border-b-2 border-teal-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="faq" className="data-[state=active]:border-b-2 border-teal-600">
            FAQ
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="data-[state=active]:border-b-2 border-teal-600">
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:border-b-2 border-teal-600">
            Contact Support
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Start Guide</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-medium">Create Your Account</h4>
                      <p className="text-gray-600 text-sm">Sign up and verify your email address</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-medium">Add Your Properties</h4>
                      <p className="text-gray-600 text-sm">Upload photos and details of your properties</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-medium">Start Managing</h4>
                      <p className="text-gray-600 text-sm">Handle bookings and manage your listings</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-gray-600 text-sm">Available 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-gray-600 text-sm">1-800-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-gray-600 text-sm">support@example.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">General</Button>
              <Button variant="outline" size="sm">Properties</Button>
              <Button variant="outline" size="sm">Payments</Button>
              <Button variant="outline" size="sm">Support</Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaq.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h4 className="font-medium text-lg">{faq.question}</h4>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tutorials Tab */}
      {activeTab === "tutorials" && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Video Tutorials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{tutorial.thumbnail}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{tutorial.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{tutorial.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{tutorial.duration}</span>
                        <Button size="sm" className="bg-teal-600 text-white hover:bg-teal-700">
                          <Video className="h-4 w-4 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Contact Support Tab */}
      {activeTab === "contact" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="What can we help you with?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none"
                      placeholder="Please describe your issue or question..."
                    />
                  </div>
                  
                  <Button
                    className="w-full bg-teal-600 text-white hover:bg-teal-700"
                    onClick={handleContactSubmit}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Other Ways to Get Help</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Live Chat</h4>
                      <p className="text-gray-600 text-sm mb-2">Get instant help from our support team</p>
                      <Button size="sm" variant="outline">Start Chat</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Book className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Documentation</h4>
                      <p className="text-gray-600 text-sm mb-2">Browse our comprehensive documentation</p>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Docs
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Download className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">User Guide</h4>
                      <p className="text-gray-600 text-sm mb-2">Download our complete user guide</p>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}