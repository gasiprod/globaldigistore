import React from 'react';
import { Menu, ShoppingCart, Mail, Facebook, Twitter, Instagram, ArrowRight, Book, Palette, Layout, X, ChevronLeft, ChevronRight, Send, Video, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [customServiceForm, setCustomServiceForm] = useState({
    taskCategory: '', deadline: '', budget: '', details: '', email: ''
  });
  const [paymentForm, setPaymentForm] = useState({
    method: 'skrill',
    fullName: '',
    deliveryEmail: '',
    skrillEmail: '',
    phoneNumber: '',
    paymentReference: '',
    mtcn: ''
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    emailjs.init("E-PnNwTaKX0lZR5hO");
  }, []);

  const stats = [
    { value: '10,000+', label: 'Users' },
    { value: '500+', label: 'Products' },
    { value: '4.9/5', label: 'Average Rating' },
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: ShoppingCart, color: 'purple-600' },
    { id: 'ebooks', name: 'eBooks', icon: Book, color: 'indigo-500' },
    { id: 'templates', name: 'Templates', icon: Layout, color: 'teal-500' },
    { id: 'graphics', name: 'Graphics Resources', icon: Palette, color: 'pink-500' },
    { id: 'services', name: 'Custom Services', icon: Layout, color: 'orange-500' },
  ];

  const products = [
    {
      title: 'Exotic Recipes Book',
      description: 'Discover unique flavors from around the world',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=400',
      price: 7,
      format: 'PDF',
      category: 'ebooks',
      preview: {
        description: 'A complete guide to explore global flavors with over 50 authentic recipes.',
        chapters: [
          'Introduction to Exotic Cuisine',
          'Essential Spices',
          'Asian Recipes',
          'African Recipes',
          'South American Recipes'
        ],
        sample: `Chapter 1: Essential Spices\nSpices are the heart of exotic cuisine...`
      }
    },
    {
      title: 'Beginner Yoga Guide',
      description: 'Start your journey to wellness',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
      price: 7,
      format: 'PDF',
      category: 'ebooks',
      preview: {
        description: 'A simple guide to start yoga and improve your physical and mental well-being.',
        chapters: [
          'Introduction to Yoga',
          'Basic Poses',
          'Breathing Techniques',
          'Meditation for Beginners',
          'Training Plan'
        ],
        sample: `Chapter 1: Introduction to Yoga\nYoga is a millennia-old practice...`
      }
    },
    {
      title: 'Urban Gardening Manual',
      description: 'Create your green oasis in the city',
      image: 'https://images.unsplash.com/photo-1597843786186-826cc3489f56?auto=format&fit=crop&q=80&w=400',
      price: 7,
      format: 'PDF',
      category: 'ebooks',
      preview: {
        description: 'Transform your urban space into a garden with simple and effective techniques.',
        chapters: [
          'Introduction to Urban Gardening',
          'Choosing Plants',
          'Watering Techniques',
          'Composting in the City',
          'DIY Projects'
        ],
        sample: `Chapter 1: Introduction to Urban Gardening\nLiving in the city doesn’t mean giving up nature...`
      }
    },
    {
      title: 'Portfolio Site Template',
      description: 'Modern and responsive design for your portfolio',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400',
      price: 19,
      format: 'HTML/CSS',
      category: 'templates',
      preview: {
        description: 'An elegant template to showcase your projects with style.',
        features: ['Responsive Design', 'Easy Customization', 'SEO Optimized'],
        technologies: ['HTML', 'CSS', 'JavaScript'],
        demo: 'https://example.com/portfolio-demo'
      }
    },
    {
      title: 'E-commerce Template',
      description: 'Complete solution for your online store',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=400',
      price: 29,
      format: 'React/Next.js',
      category: 'templates',
      preview: {
        description: 'Launch your online store with this high-performance template.',
        features: ['Integrated Cart', 'Secure Payment', 'Modern Design'],
        technologies: ['React', 'Next.js', 'Tailwind CSS'],
        demo: 'https://example.com/ecommerce-demo'
      }
    },
    {
      title: 'Business Icons Pack',
      description: '200 vector icons for your projects',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=400',
      price: 12,
      format: 'SVG/AI',
      category: 'graphics',
      preview: {
        description: 'A modern icon pack for your professional designs.',
        includes: ['200 Icons', 'SVG and AI Formats', 'Commercial License'],
        previewLink: 'https://example.com/icons-preview'
      }
    },
    {
      title: 'Dashboard UI Kit',
      description: 'Modern components for dashboards',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
      price: 24,
      format: 'Figma/Sketch',
      category: 'graphics',
      preview: {
        description: 'Create intuitive dashboards with this UI kit.',
        includes: ['50+ Components', 'Responsive Design', 'Figma and Sketch Files'],
        previewLink: 'https://example.com/dashboard-preview'
      }
    },
    {
      title: 'Custom Services',
      description: 'Design, development, and more tailored to your needs',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400',
      price: 'On Request',
      format: 'Customized',
      category: 'services',
      preview: {
        description: 'We bring your projects to life with custom solutions: graphic design, web design, video editing, and more. Fill out the form to submit your request!'
      }
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const blogPosts = [
    {
      title: '5 Easy Recipes for Beginners',
      date: 'March 15, 2024',
      category: 'Cooking',
      description: 'Discover simple and delicious recipes to start cooking with confidence.',
      image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=400',
      link: 'https://example.com/blog/easy-recipes'
    },
    {
      title: 'How to Meditate in 10 Minutes a Day',
      date: 'March 12, 2024',
      category: 'Wellness',
      description: 'A simple guide to integrate meditation into your daily routine.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
      link: 'https://example.com/blog/meditation-10-minutes'
    }
  ];

  const handlePreview = (product: any) => {
    setSelectedProduct(product);
    setShowPreviewModal(true);
  };

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    alert(`${product.title} added to cart! Total items: ${cart.length + 1}`);
  };

  const clearCart = () => {
    setCart([]);
    alert("Cart cleared!");
  };

  const handleCustomServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs.send("service_vuymlea", "template_xxzljle", {
      from_name: 'Client - Custom Services',
      from_email: customServiceForm.email,
      to_email: 'globaldigistore.mdg@gmail.com',
      message: `Custom Service Request:
        Email: ${customServiceForm.email}
        Category: ${customServiceForm.taskCategory}
        Deadline: ${customServiceForm.deadline}
        Budget: ${customServiceForm.budget}
        Details: ${customServiceForm.details}`
    })
    .then(() => {
      alert("Request sent successfully! We’ll contact you soon.");
      setCustomServiceForm({ taskCategory: '', deadline: '', budget: '', details: '', email: '' });
      setShowPreviewModal(false);
      setIsLoading(false);
    })
    .catch((err) => {
      alert("Error: " + err.text);
      setIsLoading(false);
    });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    emailjs.send("service_vuymlea", "template_xxzljle", {
      from_name: formData.get('name') as string,
      from_email: formData.get('email') as string,
      to_email: 'globaldigistore.mdg@gmail.com',
      message: `Contact Form Submission:
        Name: ${formData.get('name')}
        Email: ${formData.get('email')}
        Message: ${formData.get('message')}`
    })
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
      setIsLoading(false);
    })
    .catch((err) => {
      alert("Error: " + err.text);
      setIsLoading(false);
    });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const total = cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0);
    const cartDetails = cart.map(item => `${item.title} - $${item.price}`).join('\n');
    let paymentDetails = '';

    switch (paymentForm.method) {
      case 'skrill':
        paymentDetails = `Method: Skrill
          Client Full Name: ${paymentForm.fullName}
          Client Skrill Email: ${paymentForm.skrillEmail}
          Delivery Email: ${paymentForm.deliveryEmail}
          Instructions: Send $${total} to rabemanantsaina.tiavina@gmail.com via Skrill.`;
        break;
      case 'orange-money':
        paymentDetails = `Method: Orange Money
          Client Full Name: ${paymentForm.fullName}
          Client Phone Number: ${paymentForm.phoneNumber}
          Payment Reference: ${paymentForm.paymentReference || 'Not provided'}
          Delivery Email: ${paymentForm.deliveryEmail}
          Instructions: Send $${total} (or equivalent in Ariary) to +261 32 21 312 46 (Rabemanantsaina Tiavina Severin) via Orange Money.`;
        break;
      case 'mvola':
        paymentDetails = `Method: MVola
          Client Full Name: ${paymentForm.fullName}
          Client Phone Number: ${paymentForm.phoneNumber}
          Payment Reference: ${paymentForm.paymentReference || 'Not provided'}
          Delivery Email: ${paymentForm.deliveryEmail}
          Instructions: Send $${total} (or equivalent in Ariary) to +261 38 70 539 65 (Rabemanantsaina Tiavina Severin) via MVola.`;
        break;
      case 'western-union':
        paymentDetails = `Method: Western Union
          Client Full Name: ${paymentForm.fullName}
          MTCN (if available): ${paymentForm.mtcn || 'Not provided yet'}
          Delivery Email: ${paymentForm.deliveryEmail}
          Instructions: Send $${total} to Rabemanantsaina Tiavina Severin, Madagascar via Western Union. Provide the MTCN after payment.`;
        break;
    }

    emailjs.send("service_vuymlea", "template_xxzljle", {
      from_name: 'Client - Payment',
      from_email: paymentForm.deliveryEmail,
      to_email: 'globaldigistore.mdg@gmail.com',
      message: `New Order Payment:
        Cart Details:
        ${cartDetails}
        Total: $${total}
        ${paymentDetails}`
    })
    .then(() => {
      alert(`Payment request submitted! Please send $${total} via ${paymentForm.method.replace('-', ' ')} as instructed. Your products will be sent to ${paymentForm.deliveryEmail} after payment confirmation.`);
      setCart([]);
      setPaymentForm({ method: 'skrill', fullName: '', deliveryEmail: '', skrillEmail: '', phoneNumber: '', paymentReference: '', mtcn: '' });
      setShowPaymentForm(false);
      setShowCartModal(false);
      setIsLoading(false);
    })
    .catch((err) => {
      alert("Error: " + err.text);
      setIsLoading(false);
    });
  };

  const scrollLeft = () => {
    const container = document.getElementById('product-carousel');
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft - 400);
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('product-carousel');
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + 400);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-orange-400 font-[Poppins]">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="fixed w-full bg-white bg-opacity-90 shadow-2xl z-50 rounded-b-3xl backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="h-10 w-10 text-purple-600 transition-transform duration-500 hover:scale-110 hover:rotate-12" />
              <span className="ml-3 text-2xl font-extrabold text-purple-600 tracking-tight">GlobalDigiStore</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-12">
                {['home', 'products', 'blog', 'contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item}`} 
                    className="text-gray-700 hover:text-purple-600 text-lg font-semibold transition-all duration-500 relative group px-4 py-2 rounded-xl hover:bg-purple-50 hover:shadow-lg"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-purple-600 to-orange-400 transition-all duration-500 group-hover:w-full group-hover:left-0 rounded-full"></span>
                  </a>
                ))}
              </nav>
              <button 
                onClick={() => setShowCartModal(true)} 
                className="relative p-2 rounded-full hover:bg-purple-100 transition-colors duration-300"
              >
                <ShoppingCart className="h-7 w-7 text-purple-600" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2 rounded-full hover:bg-purple-100 transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-7 w-7 text-purple-600 transition-transform duration-500 hover:rotate-180" />
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-2xl rounded-b-3xl mt-2 p-4 backdrop-blur-md">
              <div className="space-y-4">
                {['home', 'products', 'blog', 'contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item}`} 
                    className="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 text-lg font-semibold"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-40 relative overflow-hidden animate-fade-in">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-200 to-orange-200 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-xl">
              Explore the Future of Digital Products
            </h1>
            <p className="text-xl md:text-2xl mb-10 font-light text-white drop-shadow-xl">Innovative resources for creators and entrepreneurs</p>
            <div className="flex md:flex-row flex-col justify-center gap-6">
              <a href="#products" className="bg-gradient-to-r from-purple-600 to-orange-400 text-white px-10 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-500 flex items-center text-lg">
                Discover Now
                <ArrowRight className="ml-3 h-6 w-6 animate-pulse" />
              </a>
              <a href="#contact" className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-500 text-lg">
                Contact Us
              </a>
            </div>

            <div className="mt-20 grid grid-cols-3 gap-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white bg-opacity-20 p-6 rounded-2xl shadow-xl backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold mb-2 text-white">{stat.value}</div>
                  <div className="text-sm text-white opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex justify-between items-center opacity-15 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" 
            alt="Code and Technology Illustration" 
            className="w-1/3 h-auto object-cover rounded-2xl shadow-2xl transform -rotate-12 animate-fade-in-left"
          />
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" 
            alt="Abstract Graphic Creation" 
            className="w-1/3 h-auto object-cover rounded-2xl shadow-2xl animate-fade-in"
          />
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800" 
            alt="Digital Collaboration Scene" 
            className="w-1/3 h-auto object-cover rounded-2xl shadow-2xl transform rotate-12 animate-fade-in-right"
          />
        </div>
      </section>

      {/* Products Section - Carousel Layout */}
      <section id="products" className="bg-white py-28">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-600 to-orange-400 bg-clip-text text-transparent animate-fade-in">
            Our Digital Creations
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg font-light">Browse our exceptional products</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm ${
                    activeCategory === category.id
                      ? `bg-${category.color} text-white`
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-6 w-6 mr-2 transition-transform duration-500 group-hover:scale-110" />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <button 
              onClick={scrollLeft} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:bg-purple-100 transition-all duration-300 z-10"
            >
              <ChevronLeft className="h-6 w-6 text-purple-600" />
            </button>
            <div 
              id="product-carousel" 
              className="flex overflow-x-auto scroll-smooth gap-8 py-4 px-2 snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              {filteredProducts.map((product, index) => {
                const categoryColor = categories.find(cat => cat.id === product.category)?.color;
                return (
                  <div 
                    key={index} 
                    className={`min-w-[350px] bg-white rounded-3xl shadow-2xl overflow-hidden snap-center transform hover:scale-105 transition-all duration-500 border-t-4 border-${categoryColor}`}
                  >
                    <img src={product.image} alt={`${product.title} Cover`} className="w-full h-64 object-cover rounded-t-3xl" />
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-2 text-gray-800">{product.title}</h3>
                      <p className="text-gray-600 mb-4 font-light">{product.description}</p>
                      <p className="text-sm text-gray-500 mb-3">Format: {product.format}</p>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handlePreview(product)} 
                          className={`inline-block bg-${categoryColor}/10 text-${categoryColor} hover:bg-${categoryColor}/20 font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center`}
                        >
                          <Eye className="h-5 w-5 mr-2" /> View Preview
                        </button>
                        {product.price !== 'On Request' && (
                          <button 
                            onClick={() => addToCart(product)} 
                            className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition-all duration-300"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{product.price === 'On Request' ? product.price : `$${product.price}`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button 
              onClick={scrollRight} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:bg-purple-100 transition-all duration-300 z-10"
            >
              <ChevronRight className="h-6 w-6 text-purple-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-gray-50 py-28">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-600 to-orange-400 bg-clip-text text-transparent animate-fade-in">
            Inspiration & Tips
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg font-light">Discover our exclusive articles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <img src={post.image} alt={`${post.title} Image`} className="w-full h-64 object-cover rounded-t-3xl" />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 mb-4 font-light">{post.description}</p>
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300 flex items-center"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a 
              href="#more-articles" 
              className="inline-block bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition-all duration-300 font-semibold"
            >
              More Articles Coming Soon
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-600 to-orange-400 bg-clip-text text-transparent animate-fade-in">
              Get in Touch
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg font-light">Turn your ideas into reality</p>
            <form 
              data-netlify="true" 
              name="contact" 
              method="POST" 
              onSubmit={handleContactSubmit}
              className="space-y-6 bg-white bg-opacity-80 p-8 rounded-3xl shadow-2xl backdrop-blur-lg"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-500 font-semibold text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Need more info?</h3>
              <div className="space-y-2 text-gray-600">
                <p>Email: globaldigistore.mdg@gmail.com</p>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Hours</h3>
              <p className="text-gray-600 font-light">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Online Support 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center mb-4">
                <ShoppingCart className="h-10 w-10 text-purple-400 transition-transform duration-500 hover:scale-110 hover:rotate-12" />
                <span className="ml-3 text-2xl font-extrabold">GlobalDigiStore</span>
              </div>
              <p className="text-gray-400 font-light">Your partner for digital innovation.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {['home', 'products', 'blog', 'contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li>globaldigistore.mdg@gmail.com</li>
                <li>(+261) 32 21 312 46</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
              <div className="flex justify-center md:justify-start flex-wrap gap-4">
                <a href="https://www.facebook.com/globaldigistore.mdg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-500 hover:scale-125">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://twitter.com/globaldigistore" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-500 hover:scale-125">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="https://instagram.com/globaldigistore" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-500 hover:scale-125">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://tiktok.com/@globaldigistore" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-500 hover:scale-125">
                  <Video className="h-6 w-6" />
                </a>
                <a href="https://t.me/globaldigistore" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-500 hover:scale-125">
                  <Send className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-400">
            <p>© 2024 GlobalDigiStore. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Preview Modal */}
      {showPreviewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{selectedProduct.title}</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <img 
              src={selectedProduct.image} 
              alt={`${selectedProduct.title} Preview`} 
              className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
            />

            <div className="space-y-6">
              {selectedProduct.category === 'ebooks' && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Detailed Description</h4>
                    <p className="text-gray-600 font-light">{selectedProduct.preview.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Chapters</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedProduct.preview.chapters.map((chapter: string, index: number) => (
                        <li key={index}>{chapter}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Excerpt</h4>
                    <div className="bg-gray-50 p-4 rounded-xl text-gray-600 whitespace-pre-wrap shadow-inner">
                      {selectedProduct.preview.sample}
                    </div>
                  </div>
                </>
              )}

              {selectedProduct.category === 'templates' && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Detailed Description</h4>
                    <p className="text-gray-600 font-light">{selectedProduct.preview.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedProduct.preview.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.preview.technologies.map((tech: string, index: number) => (
                        <span key={index} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Live Demo</h4>
                    <a 
                      href={selectedProduct.preview.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                    >
                      View Demo →
                    </a>
                  </div>
                </>
              )}

              {selectedProduct.category === 'graphics' && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Detailed Description</h4>
                    <p className="text-gray-600 font-light">{selectedProduct.preview.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Included in the Pack</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedProduct.preview.includes.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Preview</h4>
                    <a 
                      href={selectedProduct.preview.previewLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                    >
                      View Full Preview →
                    </a>
                  </div>
                </>
              )}

              {selectedProduct.category === 'services' && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Detailed Description</h4>
                    <p className="text-gray-600 font-light">{selectedProduct.preview.description}</p>
                    <p className="text-gray-600 font-light mt-2">Fill the form below to get a personalized quote!</p>
                  </div>
                  <form onSubmit={handleCustomServiceSubmit} className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-inner">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        value={customServiceForm.email}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="taskCategory">Task Category</label>
                      <select
                        id="taskCategory"
                        value={customServiceForm.taskCategory}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, taskCategory: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        required
                      >
                        <option value="">Choose a category</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Audio Editing">Audio Editing</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="deadline">Deadline</label>
                      <select
                        id="deadline"
                        value={customServiceForm.deadline}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, deadline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        required
                      >
                        <option value="">Choose a deadline</option>
                        <option value="3 days">3 days</option>
                        <option value="1 week">1 week</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="To be discussed">To be discussed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="budget">Budget</label>
                      <select
                        id="budget"
                        value={customServiceForm.budget}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, budget: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        required
                      >
                        <option value="">Choose a budget</option>
                        <option value="Less than $50">Less than $50</option>
                        <option value="$50 - $100">$50 - $100</option>
                        <option value="$100 - $200">$100 - $200</option>
                        <option value="More than $200">More than $200</option>
                        <option value="To be discussed">To be discussed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="details">Project Details</label>
                      <textarea
                        id="details"
                        value={customServiceForm.details}
                        onChange={(e) => setCustomServiceForm({ ...customServiceForm, details: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                        placeholder="Describe your project in detail..."
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-500 font-semibold text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Sending...' : 'Send Request'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Your Cart ({cart.length} items)</h3>
              <button
                onClick={() => setShowCartModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-600 text-center">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-2">
                      <span>{item.title}</span>
                      <span>{item.price === 'On Request' ? item.price : `$${item.price}`}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <p className="text-xl font-semibold text-gray-800">
                    Total: ${cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0)}
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={clearCart}
                      className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-all duration-300 font-semibold"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => setShowPaymentForm(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Complete Your Payment</h3>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  value={paymentForm.fullName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email for Product Delivery</label>
                <input
                  type="email"
                  value={paymentForm.deliveryEmail}
                  onChange={(e) => setPaymentForm({ ...paymentForm, deliveryEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
                <p className="mt-1 text-gray-500 text-sm">We’ll send your products to this email after payment confirmation.</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Payment Method</label>
                <select
                  value={paymentForm.method}
                  onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                >
                  <option value="skrill">Skrill</option>
                  <option value="orange-money">Orange Money</option>
                  <option value="mvola">MVola</option>
                  <option value="western-union">Western Union</option>
                </select>
              </div>

              {paymentForm.method === 'skrill' && (
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Your Skrill Email</label>
                  <input
                    type="email"
                    value={paymentForm.skrillEmail}
                    onChange={(e) => setPaymentForm({ ...paymentForm, skrillEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                    placeholder="your@skrill.com"
                    required
                  />
                  <p className="mt-2 text-gray-600 font-light">
                    Send ${cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0)} to <strong>rabemanantsaina.tiavina@gmail.com</strong> via Skrill.
                  </p>
                </div>
              )}

              {(paymentForm.method === 'orange-money' || paymentForm.method === 'mvola') && (
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Your Phone Number</label>
                  <input
                    type="tel"
                    value={paymentForm.phoneNumber}
                    onChange={(e) => setPaymentForm({ ...paymentForm, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                    placeholder="+261..."
                    required
                  />
                  <label className="block text-gray-700 mb-2 mt-4 font-medium">Payment Reference (optional)</label>
                  <input
                    type="text"
                    value={paymentForm.paymentReference}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentReference: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                    placeholder="Ex: Order123"
                  />
                  <p className="mt-2 text-gray-600 font-light">
                    Send ${cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0)} (or equivalent in Ariary) to{' '}
                    {paymentForm.method === 'orange-money' ? (
                      <strong>+261 32 21 312 46</strong>
                    ) : (
                      <strong>+261 38 70 539 65</strong>
                    )} (Rabemanantsaina Tiavina Severin) via {paymentForm.method === 'orange-money' ? 'Orange Money' : 'MVola'}.
                  </p>
                </div>
              )}

              {paymentForm.method === 'western-union' && (
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">MTCN (optional, add after payment)</label>
                  <input
                    type="text"
                    value={paymentForm.mtcn}
                    onChange={(e) => setPaymentForm({ ...paymentForm, mtcn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                    placeholder="Enter MTCN after payment"
                  />
                  <p className="mt-2 text-gray-600 font-light">
                    Send ${cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0)} to <strong>Rabemanantsaina Tiavina Severin, Madagascar</strong> via Western Union. Provide the MTCN after payment.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-500 font-semibold text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Submitting...' : 'Submit Payment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;