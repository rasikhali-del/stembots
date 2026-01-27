import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, User, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const whatsappNumber = '03462641229';

  const handleWhatsApp = () => {
    const message = 'Hello Stembots! I would like to know more about your courses.';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-glass"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors duration-300"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src="/images/logo/logo.jpg" 
                  alt="Stembots Logo" 
                  className="h-10 w-10 relative z-10 rounded-md"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Stembots</span>
                <span className="text-xs font-semibold text-primary/80 tracking-wider">STEM Education</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={link.href}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isActive(link.href) ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </motion.button>
            {user ? (
              <>
                <motion.div 
                  className="flex items-center space-x-2 text-sm px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{profile?.username}</span>
                </motion.div>
                {profile?.role === 'admin' && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="sm" asChild className="border-primary/30 hover:border-primary">
                      <Link to="/admin">Admin</Link>
                    </Button>
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="hover:bg-destructive/10 hover:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="sm" asChild>
                  <Link to="/admin-login">Admin Login</Link>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-card border-border/50">
              <div className="flex flex-col space-y-4 mt-8">
                <motion.button
                  onClick={() => {
                    handleWhatsApp();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-300 w-full justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </motion.button>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-base font-medium transition-colors hover:text-primary block ${
                        isActive(link.href) ? 'text-primary' : 'text-foreground/80'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-border pt-4">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-2 text-sm mb-4 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                        <User className="h-4 w-4 text-primary" />
                        <span>{profile?.username}</span>
                      </div>
                      {profile?.role === 'admin' && (
                        <Button variant="outline" size="sm" className="w-full mb-2 border-primary/30" asChild>
                          <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="w-full hover:bg-destructive/10 hover:text-destructive" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="w-full" asChild>
                      <Link to="/admin-login" onClick={() => setOpen(false)}>Admin Login</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
