import { Link } from 'react-router-dom';
import { MessageCircle, Lock, Instagram, Linkedin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const whatsappNumber = '+92 320 0221188';
  const handleWhatsApp = () => {
    const message = 'Hello Stembots! I would like to know more about your courses.';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="w-full border-t border-border bg-muted/30 relative">
      {/* WhatsApp Floating Button with Glow and Animation */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Animated Glow Background */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full blur-xl"
          animate={{
            boxShadow: [
              '0 0 20px rgba(34, 197, 94, 0.4)',
              '0 0 40px rgba(34, 197, 94, 0.6)',
              '0 0 20px rgba(34, 197, 94, 0.4)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Ripple Effect Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-400"
          animate={{ scale: [1, 1.3], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Main Button */}
        <motion.button
          onClick={handleWhatsApp}
          className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full shadow-2xl flex items-center justify-center font-bold text-lg hover:shadow-green-500/50 transition-all duration-300"
          whileHover={{
            scale: 1.15,
            boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)',
          }}
          whileTap={{ scale: 0.9 }}
          title="Chat with us on WhatsApp"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
          >
            <MessageCircle className="h-7 w-7" />
          </motion.div>
        </motion.button>

        {/* Floating Label */}
        <motion.div
          className="absolute -left-32 top-1/2 -translate-y-1/2 bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          Chat with us! 💬
        </motion.div>
      </motion.div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-bold mb-4 flex gap-0.5">
              <motion.span className="text-pink-500" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>S</motion.span>
              <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}>T</motion.span>
              <motion.span className="text-teal-500" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>E</motion.span>
              <motion.span className="text-yellow-400" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>M</motion.span>
              <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}>B</motion.span>
              <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>O</motion.span>
              <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>T</motion.span>
              <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}>S</motion.span>
            </div>
            <p className="text-sm text-muted-foreground">
              Crafting future with code, robot and art. 
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Follow us on social media
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mb-4">
              {/* WhatsApp Icon */}
              <motion.a
                href="https://wa.me/03462641229"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title="Chat on WhatsApp"
              >
                <Phone className="h-5 w-5" />
              </motion.a>

              {/* Instagram Icon */}
              <motion.a
                href="https://instagram.com/stem.bots"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title="Follow on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>

              {/* LinkedIn Icon */}
              <motion.a
                href="https://linkedin.com/company/stembots"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-white flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title="Connect on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>

            <motion.button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp: {whatsappNumber}
            </motion.button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Stembots. All rights reserved.</p>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <Link
              to="/admin-login"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground/60 hover:text-primary transition-colors duration-300 opacity-40 hover:opacity-100"
            >
              <Lock className="h-3 w-3" />
              Admin
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
