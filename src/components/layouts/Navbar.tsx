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
      className="sticky top-0 z-50 w-full border-b bg-white border-orange-200 shadow-md transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated top border gradient */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary via-accent to-primary"
        animate={{ backgroundPosition: ['0% center', '200% center'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 100%' }}
      />

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group relative">
            <motion.div 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-300 relative"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Logo glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <img 
                  src="/logo-P.png" 
                  alt="Stembots Logo" 
                  className="h-10 w-10 relative z-10 rounded-md object-cover"
                />
              </div>

              <div className="flex flex-col leading-tight">
                <div className="text-2xl font-bold flex gap-0.5">
                  <motion.span className="text-pink-500" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>S</motion.span>
                  <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}>T</motion.span>
                  <motion.span className="text-teal-500" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>E</motion.span>
                  <motion.span className="text-yellow-400" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>M</motion.span>
                  <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}>B</motion.span>
                  <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>O</motion.span>
                  <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>T</motion.span>
                  <motion.span className="text-blue-900" animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}>S</motion.span>
                </div>
                <motion.span 
                  className="text-xs font-semibold text-primary/80 tracking-wider"
                  animate={{ color: ['hsl(39, 100%, 50%)', 'hsl(320, 100%, 60%)', 'hsl(39, 100%, 50%)'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                
                </motion.span>
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
                  className={`text-sm font-medium transition-all duration-300 relative group px-3 py-2 rounded-md ${
                    isActive(link.href) ? 'text-orange-600' : 'text-black hover:text-orange-600'
                  }`}
                >
                  {/* Background glow on hover */}
                  <motion.div 
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />
                  
                  {link.label}
                  
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive(link.href) && (
                    <motion.span 
                      className="absolute -bottom-1 left-3 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:right-3 transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: 'calc(100% - 24px)' }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-medium transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Chat with us on WhatsApp"
            >
              {/* Animated shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <MessageCircle className="h-4 w-4 relative z-10" />
              <span className="hidden sm:inline relative z-10">WhatsApp</span>
            </motion.button>
            {user ? (
              <>
                <motion.div 
                  className="flex items-center space-x-2 text-sm px-3 py-1.5 rounded-full bg-orange-100 border border-orange-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <User className="h-4 w-4 text-orange-600" />
                  <span className="text-slate-900">{profile?.username}</span>
                </motion.div>
                {profile?.role === 'admin' && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="sm" asChild className="border-orange-300 text-orange-600 hover:bg-orange-50">
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
                <Button variant="ghost" size="icon" className="text-slate-900 border border-orange-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-white border-orange-200">
              <div className="flex flex-col space-y-4 mt-8">
                <motion.button
                  onClick={() => {
                    handleWhatsApp();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all duration-300 w-full justify-center relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <MessageCircle className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">WhatsApp</span>
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
                      className={`text-base font-medium transition-colors hover:text-orange-600 block ${
                        isActive(link.href) ? 'text-orange-600' : 'text-slate-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-orange-200 pt-4">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-2 text-sm mb-4 px-3 py-2 rounded-lg bg-orange-100 border border-orange-300">
                        <User className="h-4 w-4 text-orange-600" />
                        <span className="text-slate-900">{profile?.username}</span>
                      </div>
                      {profile?.role === 'admin' && (
                        <Button variant="outline" size="sm" className="w-full mb-2 border-orange-300 text-orange-600 hover:bg-orange-50" asChild>
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
