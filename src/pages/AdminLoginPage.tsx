import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Admin credentials
  const ADMIN_EMAIL = 'admin@stembots.com';
  const ADMIN_PASSWORD = 'Stembots@2026';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Store admin session
      localStorage.setItem('adminSession', JSON.stringify({
        email,
        timestamp: new Date().getTime(),
      }));
      
      toast({
        title: 'Success',
        description: 'Admin login successful!',
      });
      
      navigate('/admin');
    } else {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 xl:py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2 gradient-text">Admin Login</h1>
            <p className="text-muted-foreground">Secure admin access to Stembots Dashboard</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-2 border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>Admin Credentials</CardTitle>
                </div>
                <CardDescription>Enter your admin credentials to access the dashboard</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="admin@stembots.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-primary"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Default: admin@stembots.com
                    </p>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                      <Lock className="h-4 w-4" />
                      Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-primary"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Default: Stembots@2026
                    </p>
                  </motion.div>

                  {/* Info Box */}
                  <motion.div
                    className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      <strong>Demo Credentials:</strong><br />
                      Email: admin@stembots.com<br />
                      Password: Stembots@2026
                    </p>
                  </motion.div>

                  {/* Login Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 font-medium"
                      size="lg"
                    >
                      {loading ? 'Logging in...' : 'Login to Admin Panel'}
                    </Button>
                  </motion.div>

                  {/* Back Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/')}
                    >
                      Back to Home
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Note */}
          <motion.div
            className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50 text-center text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            🔒 Keep your credentials secure. Never share your admin password with anyone.
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
