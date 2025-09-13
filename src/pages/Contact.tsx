import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: [
        "No.509, 1st BLOCK, Ph-2",
        "Muthamizh Nagar",
        "Chennai, Tamil Nadu, 600118"
      ]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 90809 23823"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["contact@abuaccessories.shop"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Sunday",
        "10:00 AM - 9:00 PM"
      ]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <Breadcrumbs items={breadcrumbItems} />
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products or need assistance? We'd love to hear from you. 
              Reach out to us and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-card rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-muted-foreground text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-card rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-4">Find Us</h3>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive map coming soon</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Visit us at Muthamizh Nagar, Chennai
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-muted rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">What are your delivery options?</h3>
                <p className="text-muted-foreground text-sm">
                  We offer fast delivery across Chennai and surrounding areas. Contact us for specific delivery times and charges.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Do you accept returns?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we have a flexible return policy. Please contact us within 7 days of purchase for return requests.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Can I visit your physical store?</h3>
                <p className="text-muted-foreground text-sm">
                  Absolutely! Visit our stall at Muthamizh Nagar, Chennai. We're open daily from 10 AM to 9 PM.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">How can I track my order?</h3>
                <p className="text-muted-foreground text-sm">
                  Once your order is confirmed, we'll provide tracking information via WhatsApp or SMS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
