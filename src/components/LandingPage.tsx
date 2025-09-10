import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Zap, Link2, BarChart3, Brain, CheckCircle, AlertCircle, ArrowRight, Sparkles, MessageSquare, Shield, BookOpen, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../lib/supabase';
import AnimatedBackground from './AnimatedBackground';
import { AnimatedText, GlowingText } from './AnimatedText';
import { MagneticButton } from './MagneticButton';
import { FeatureCard } from './FeatureCard';
import { LoadingScreen } from './LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Make hero section animations more subtle
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    // Delay initial visibility to allow loading screen to complete
    setTimeout(() => {
      setIsVisible(true);
    }, 2200); // Slightly after loading screen (2s + 0.2s buffer)

    // Simplified hero text animation with better timing
    if (heroRef.current) {
      // Set initial visibility
      const elements = heroRef.current.querySelectorAll('.hero-text');
      
      const timeline = gsap.timeline({ delay: 2.5 }); // Delay animations until after loading
      timeline
        .from(elements, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all' // Clears all inline styles after animation
        });
    }
  }, []);

  const EmailForm = ({ buttonText = "Join the Waitlist", className = "" }: { buttonText?: string; className?: string }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;

      setIsLoading(true);
      setError('');

      try {
        const { error: supabaseError } = await supabase
          .from('waitlist_emails')
          .insert([
            {
              email: email.toLowerCase().trim(),
              source: 'landing_page'
            }
          ]);

        if (supabaseError) {
          if (supabaseError.code === '23505') {
            setError('This email is already on our waitlist!');
          } else {
            throw supabaseError;
          }
        } else {
          setIsSubmitted(true);
          setEmail('');
        }
      } catch (err) {
        console.error('Error submitting email:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div 
        className={`max-w-md mx-auto ${className}`}
      >
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-teal-400 transition-colors z-10 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full pl-10 pr-4 py-4 bg-gray-900/70 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all backdrop-blur-sm hover:border-gray-600"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 sm:px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg disabled:opacity-50 whitespace-nowrap min-w-[140px] hover:from-teal-600 hover:to-teal-700 transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span className="text-white font-semibold">{isLoading ? 'Joining...' : buttonText}</span>
              {!isLoading && <ArrowRight className="w-4 h-4 text-white flex-shrink-0" />}
            </button>
          </form>
        ) : (
          <motion.div
            className="flex items-center justify-center gap-3 text-teal-400 text-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-6 h-6" />
            <span>Thanks! We'll be in touch soon.</span>
          </motion.div>
        )}
        
        {error && (
          <motion.div
            className="flex items-center justify-center gap-2 text-red-400 text-sm mt-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <>
      <LoadingScreen />
      
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Animated Background */}
        <AnimatedBackground />
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-purple-600 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <motion.section
            ref={heroRef}
            className="min-h-screen flex items-center justify-center px-4 relative"
            style={{ scale: scaleProgress, opacity: opacityProgress }}
          >
            <div className="text-center max-w-4xl mx-auto">
              {/* Logo Section - Always visible */}
              <div className="mb-8">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 2.3, // After loading screen completes
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  <img 
                    src="/xental logo copy 3.png" 
                    alt="Xental Logo"
                    className="w-20 h-20 md:w-24 md:h-24 filter brightness-0 invert"
                    onError={(e) => console.error('Logo failed to load:', e)}
                  />                </motion.div>
                
                {/* Fixed Xental title - always visible */}
                <h1 
                  className="text-6xl md:text-8xl font-bold mb-4"
                  style={{ opacity: 1 }}
                >
                  <span className="text-teal-400">
                    Xental
                  </span>
                </h1>
                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 96, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />
              </div>

              {/* Main Headline */}
              <div className="mb-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">
                  Unlocking the Future of
                </h2>
                <h2 className="text-4xl md:text-6xl font-bold text-teal-400">
                  Dental Data
                </h2>
              </div>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                Xental is redefining how dental practices understand, manage, and use patient data with cutting-edge AI and universal interoperability.
              </p>

              {/* Email Capture Form - with proper delay and visibility */}
              <EmailForm className="mb-8" />

              {/* Scroll Indicator */}
              <motion.div
                className="mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  className="w-6 h-10 border-2 border-gray-600 rounded-full mx-auto relative"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="w-1 h-3 bg-teal-400 rounded-full mx-auto mt-2"
                    animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Phase I: Xental Chat Section */}
          <section className="py-20 px-4 relative bg-gradient-to-b from-black via-gray-900/20 to-black">
            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider">Phase I - Available Now</span>
                </motion.div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-6">
                  Introducing <span className="text-teal-400">Xental Chat</span>
                </h3>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Your AI-powered dental assistant. HIPAA-compliant, evidence-based, and ready to answer any dental question instantly.
                </p>
              </motion.div>

              {/* Chat Interface Mockup */}
              <motion.div
                className="max-w-4xl mx-auto mb-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
                  {/* Chat Header */}
                  <div className="bg-gray-900/80 border-b border-gray-800 p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-black" />
                    </div>
                    <span className="font-semibold text-white">Xental Chat</span>
                    <div className="ml-auto flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="p-6 space-y-4 min-h-[300px]">
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-black">X</span>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 max-w-md">
                        <p className="text-gray-200 text-sm">Hello! I'm Xental, your AI dental assistant. How can I help you today?</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="flex gap-3 justify-end"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="bg-teal-500/20 rounded-lg p-4 max-w-md">
                        <p className="text-gray-200 text-sm">What are the best practices for managing pediatric dental anxiety?</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-black">X</span>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 max-w-md">
                        <p className="text-gray-200 text-sm">Great question! Evidence-based strategies include tell-show-do technique, positive reinforcement, and creating a child-friendly environment...</p>
                        <div className="flex gap-2 mt-3">
                          <span className="text-xs px-2 py-1 bg-teal-500/10 text-teal-400 rounded">Evidence-Based</span>
                          <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded">Pediatric Dentistry</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Chat Input */}
                  <div className="border-t border-gray-800 p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ask any dental question..."
                        className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                        disabled
                      />
                      <button className="px-4 py-3 bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors">
                        <Send className="w-5 h-5 text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-teal-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">HIPAA Compliant</h4>
                  <p className="text-gray-400 text-sm">Secure, encrypted, and fully compliant with healthcare regulations</p>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-teal-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Evidence-Based</h4>
                  <p className="text-gray-400 text-sm">Responses backed by peer-reviewed research and clinical guidelines</p>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-teal-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Instant Answers</h4>
                  <p className="text-gray-400 text-sm">Get accurate dental information in seconds, 24/7</p>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all transform hover:scale-105 inline-flex items-center gap-2">
                  Try Xental Chat Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </section>

          {/* Phase II Section - Original About/Teaser Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Phase II - Coming Soon</span>
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  The Neural Backbone of{' '}
                  <span className="text-teal-400">Dental Intelligence</span>
                </h3>
                <motion.p
                  className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Imagine if every dental record could be seamlessly connected and intelligently analyzed. 
                  Xental makes that a reality with AI-powered infrastructure for dental data. 
                  <span className="text-teal-400 font-semibold">
                    {' '}We're building the Plaid for dentistry.                  </span>
                </motion.p>
              </motion.div>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Zap,
                    title: "AI-Driven Diagnostics",
                    description: "Intelligent analysis that transforms raw dental data into actionable insights"
                  },
                  {
                    icon: Link2,
                    title: "Universal Data Connectivity",
                    description: "Seamless integration across all practice management systems"
                  },
                  {
                    icon: BarChart3,
                    title: "Real-Time Practice Insights",
                    description: "Live analytics and reporting for data-driven decision making"
                  },
                  {
                    icon: Brain,
                    title: "Built on HL7® FHIR Standards",
                    description: "Industry-standard interoperability for secure data exchange"
                  }
                ].map((feature, index) => (
                  <FeatureCard
                    key={index}
                    {...feature}
                    index={index}
                    color={index % 2 === 0 ? 'teal' : 'purple'}
                  />                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="grid md:grid-cols-3 gap-8 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {[
                  { value: "100%", label: "HIPAA Compliant" },
                  { value: "500ms", label: "Response Time" },
                  { value: "∞", label: "Scalability" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-800"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: '#2dd4bf',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">                      {stat.value}
                    </div>
                    <div className="text-gray-400 mt-4 uppercase tracking-wider text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-12 h-12 text-teal-400 mx-auto mb-6" />
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  We're building something that will{' '}
                  <br />
                  <span className="text-teal-400">change dentistry</span>
                </h3>
                <p className="text-xl text-gray-300 mb-10">
                  Be the first to know when we launch
                </p>
                
                <EmailForm buttonText="Get Early Access" />
              </motion.div>            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 border-t border-gray-800 relative">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <img
                    src="/xental logo copy 3.png" 
                    alt="Xental Logo" 
                    className="w-6 h-6 filter brightness-0 invert opacity-70"
                  />
                  <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                    Xental
                  </div>
                </div>
                <div className="flex gap-8 text-gray-400 text-sm">
                  <Link to="/privacy" className="hover:text-teal-400 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="hover:text-teal-400 transition-colors">
                    Terms
                  </Link>
                  <a href="mailto:support@xental.ai" className="hover:text-teal-400 transition-colors">
                    Contact
                  </a>                </div>
              </div>
              <div className="text-center mt-8 text-gray-500 text-sm">
                © 2024 Xental AI. All rights reserved.
              </div>
            </motion.div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default LandingPage;