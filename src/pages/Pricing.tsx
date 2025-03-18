
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for trying out Virtuspace",
      features: [
        "2D Floor Plan Creation",
        "Basic 3D Visualization",
        "Up to 2 Projects",
        "Single User",
        "Export to PNG"
      ],
      cta: "Try Free",
      popular: false,
      ctaLink: "/auth?mode=signup"
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "For serious designers and architects",
      features: [
        "Everything in Basic",
        "AI Floorplanning",
        "Advanced 3D Visualization",
        "360° Walkthrough",
        "Unlimited Projects",
        "Team Collaboration (up to 3)",
        "Export to Multiple Formats",
        "Priority Support"
      ],
      cta: "Get Started",
      popular: true,
      ctaLink: "/auth?mode=signup&plan=pro"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For design teams and businesses",
      features: [
        "Everything in Professional",
        "Unlimited Team Members",
        "Advanced Collaboration Tools",
        "Custom Branding",
        "API Access",
        "Dedicated Account Manager",
        "Training Sessions",
        "Custom Integrations"
      ],
      cta: "Contact Sales",
      popular: false,
      ctaLink: "/contact"
    }
  ];

  const faqs = [
    {
      question: "Can I try Virtuspace before purchasing?",
      answer: "Yes, we offer a free Basic plan that lets you explore core features. You can also start a 14-day trial of our Professional plan with no credit card required."
    },
    {
      question: "How does billing work?",
      answer: "We offer monthly and annual billing options. Annual billing gives you a 20% discount compared to monthly billing. You can cancel or change your plan at any time."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and for Enterprise customers, we can accommodate direct bank transfers or invoicing."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply to your next billing cycle."
    },
    {
      question: "Do you offer discounts for educational institutions?",
      answer: "Yes, we offer special pricing for universities, schools, and educational programs. Please contact our sales team for details."
    },
    {
      question: "What kind of support is included?",
      answer: "All plans include access to our help center and community forums. Professional plans add priority email support, while Enterprise plans include dedicated account management."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Simple, Transparent <span className="text-virtuspace-600">Pricing</span></h1>
            <p className="text-lg text-gray-600">
              Choose the perfect plan for your architectural design needs
            </p>
          </div>
          
          {/* Toggle Annual/Monthly */}
          <div className="flex justify-center mb-12">
            <div className="bg-white shadow-sm rounded-full p-1 flex items-center border border-gray-200">
              <button className="px-6 py-2 rounded-full bg-virtuspace-500 text-white text-sm font-medium">
                Monthly
              </button>
              <button className="px-6 py-2 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
                Annually <span className="text-xs text-virtuspace-500 font-bold">Save 20%</span>
              </button>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl overflow-hidden transition-all ${
                  plan.popular 
                    ? 'ring-2 ring-virtuspace-500 shadow-xl scale-105 md:scale-110 z-10 bg-white' 
                    : 'shadow-md hover:shadow-lg bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="bg-virtuspace-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                  </div>
                  <Button 
                    asChild 
                    size="lg" 
                    className={`w-full mb-8 ${
                      plan.popular 
                        ? 'bg-virtuspace-500 hover:bg-virtuspace-600' 
                        : plan.name === 'Basic' 
                          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                          : 'bg-white border border-virtuspace-500 text-virtuspace-500 hover:bg-virtuspace-50'
                    }`}
                  >
                    <Link to={plan.ctaLink}>{plan.cta}</Link>
                  </Button>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-virtuspace-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* FAQs Section */}
        <section className="py-20 bg-virtuspace-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Find answers to common questions about our pricing and plans
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto bg-virtuspace-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Architectural Design Process?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of architects and designers who use Virtuspace to bring their visions to life.
            </p>
            <Button asChild size="lg" className="bg-white text-virtuspace-600 hover:bg-gray-100">
              <Link to="/auth?mode=signup" className="px-8">Start Your Free Trial Today</Link>
            </Button>
            <p className="mt-4 text-virtuspace-200">No credit card required</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
