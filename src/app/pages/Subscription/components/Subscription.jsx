"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, Zap, Shield, Users, Building, CreditCard, ArrowRight } from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    period: "month",
    description: "Perfect for small businesses and startups",
    features: [
      "Up to 10 properties",
      "Basic analytics",
      "Email support",
      "Mobile app access",
      "Standard templates"
    ],
    popular: false,
    icon: <Building className="w-6 h-6" />
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    period: "month",
    description: "Ideal for growing real estate agencies",
    features: [
      "Up to 50 properties",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "API access",
      "Team collaboration",
      "Advanced reporting"
    ],
    popular: true,
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    period: "month",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited properties",
      "Custom integrations",
      "Dedicated support",
      "White-label solution",
      "Advanced security",
      "Custom development",
      "SLA guarantee",
      "On-premise option"
    ],
    popular: false,
    icon: <Shield className="w-6 h-6" />
  }
];

const features = [
  {
    name: "Property Management",
    basic: "✓",
    pro: "✓",
    enterprise: "✓"
  },
  {
    name: "Analytics Dashboard",
    basic: "Basic",
    pro: "Advanced",
    enterprise: "Custom"
  },
  {
    name: "Team Members",
    basic: "Up to 3",
    pro: "Up to 10",
    enterprise: "Unlimited"
  },
  {
    name: "API Access",
    basic: "✗",
    pro: "✓",
    enterprise: "✓"
  },
  {
    name: "Custom Branding",
    basic: "✗",
    pro: "✓",
    enterprise: "✓"
  },
  {
    name: "Priority Support",
    basic: "✗",
    pro: "✓",
    enterprise: "24/7"
  },
  {
    name: "White-label Solution",
    basic: "✗",
    pro: "✗",
    enterprise: "✓"
  }
];

export default function SubscriptionPage() {
  const [billingPeriod, setBillingPeriod] = useState("month");
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const getPlanPrice = (plan) => {
    if (billingPeriod === "year") {
      return Math.round(plan.price * 12 * 0.8); // 20% discount for yearly
    }
    return plan.price;
  };

  const handleSubscribe = (planId) => {
    const plan = plans.find(p => p.id === planId);
    const price = getPlanPrice(plan);
    const period = billingPeriod === "year" ? "yearly" : "monthly";
    
    alert(`Subscribing to ${plan.name} plan for $${price}/${billingPeriod} (${period} billing)`);
    // Add your payment integration logic here
  };

  const handleContactSales = () => {
    alert("Contact sales functionality - Add your contact form or redirect logic here");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Scale your real estate business with our flexible subscription plans. 
          Start small and grow as you need.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-md flex items-center">
          <button
            onClick={() => setBillingPeriod("month")}
            className={`px-6 py-2 rounded-md font-medium transition ${
              billingPeriod === "month"
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("year")}
            className={`px-6 py-2 rounded-md font-medium transition ${
              billingPeriod === "year"
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Yearly
            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
              plan.popular 
                ? "border-2 border-teal-500 shadow-lg scale-105" 
                : "hover:scale-105"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 bg-teal-500 text-white text-center py-2 text-sm font-medium">
                <Star className="w-4 h-4 inline mr-1" />
                Most Popular
              </div>
            )}
            
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-teal-100 rounded-full text-teal-600">
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${getPlanPrice(plan)}
                  </span>
                  <span className="text-gray-600">/{billingPeriod}</span>
                  {billingPeriod === "year" && (
                    <div className="text-sm text-green-600 mt-1">
                      Save ${Math.round(plan.price * 12 * 0.2)}/year
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full mb-4 ${
                    plan.popular
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Compare Plans
        </h2>
        
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-6 font-semibold text-gray-900">Features</th>
                    <th className="text-center p-6 font-semibold text-gray-900">Basic</th>
                    <th className="text-center p-6 font-semibold text-gray-900">Pro</th>
                    <th className="text-center p-6 font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-6 font-medium text-gray-900">{feature.name}</td>
                      <td className="p-6 text-center text-gray-600">{feature.basic}</td>
                      <td className="p-6 text-center text-gray-600">{feature.pro}</td>
                      <td className="p-6 text-center text-gray-600">{feature.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes, we offer a 14-day free trial on all plans. No credit card required to start.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of real estate professionals who trust our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-100"
                onClick={() => handleSubscribe("pro")}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-600"
                onClick={handleContactSales}
              >
                <Users className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}