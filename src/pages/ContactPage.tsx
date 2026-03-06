import { useState } from 'react';
import { motion } from 'motion/react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { contactApi, emailApi } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import { Mail, Instagram, Phone } from 'lucide-react';
import { ScrollAnimation } from '@/components/common/ScrollAnimation';
import { BlurReveal, ClipText } from '@/components/common/AdvancedTextAnimations';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      await contactApi.create(data);
      
      // Send email notification
      await emailApi.sendContactNotification(data.name, data.email, data.message, data.phone);
      
      toast({
        title: 'Message sent!',
        description: 'Thank you for contacting us. We\'ll get back to you soon.',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 xl:py-16">
        <ScrollAnimation animation="slideUp" className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ClipText className="text-4xl xl:text-5xl font-bold mb-4 gradient-text">
              Contact Us
            </ClipText>
            <BlurReveal delay={0.3} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </BlurReveal>
          </motion.div>
        </ScrollAnimation>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ScrollAnimation animation="slideUp">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-15% 0px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500 pointer-events-none"></div>
                <CardHeader className="relative">
                  <CardTitle className="gradient-text">Send us a message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you shortly</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your name" 
                                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                      >
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="your.email@example.com" 
                                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel" 
                                  placeholder="03XX-XXXXXXX" 
                                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                      >
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us how we can help you..."
                                  className="min-h-32 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200 resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 relative overflow-hidden group/btn" 
                          disabled={isSubmitting}
                        >
                          <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                          />
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </ScrollAnimation>
          <ScrollAnimation animation="slideUp" delay={100}>
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-15% 0px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500 pointer-events-none"></div>
                <CardHeader className="relative">
                  <CardTitle className="gradient-text">Get in Touch</CardTitle>
                  <CardDescription>Connect with us through various channels</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-6">
                  <motion.div 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Mail className="h-6 w-6 text-primary relative z-10 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-foreground">Email</h3>
                      <a href="mailto:info@stembots.com.pk" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                        info@stembots.com.pk
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Phone className="h-6 w-6 text-primary relative z-10 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-foreground">WhatsApp</h3>
                      <a href="https://wa.me/+92 320 0221188" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                        +92 320 0221188
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Instagram className="h-6 w-6 text-primary relative z-10 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-foreground">Instagram</h3>
                      <a
                        href="https://instagram.com/stem.bots"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        @stem.bots
                      </a>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-orange-500/5 border-2 border-dashed border-orange-400 hover:border-solid hover:border-orange-500 transition-all duration-300 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange/0 via-orange/0 to-orange/0 group-hover:from-orange-500/5 group-hover:via-yellow-500/5 group-hover:to-orange-500/5 transition-all duration-500 pointer-events-none"></div>
                  <CardHeader className="relative">
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Classes only on weekends</CardTitle>
                    <CardDescription>Saturday & Sunday • 9:00 AM - 3:00 PM</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-4">
                      {/* Weekly Calendar */}
                      <div className="bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-xl p-6 border-2 border-dashed border-orange-300 hover:border-orange-400 transition-all duration-300">
                        <div className="grid grid-cols-7 gap-2 mb-4">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                            <motion.div
                              key={day}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="text-center text-xs font-semibold text-muted-foreground"
                            >
                              {day}
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2">
                          {[...Array(42)].map((_, idx) => {
                            const dayOfWeek = (idx) % 7;
                            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday and Sunday
                            const dayNum = idx - 5; // Start from day 1
                            const isValidDay = dayNum > 0 && dayNum <= 28;
                            
                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.3, delay: (idx % 7) * 0.05 }}
                                whileHover={isValidDay && isWeekend ? { scale: 1.1, y: -2 } : {}}
                                className={`h-10 flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 ${
                                  isValidDay && isWeekend
                                    ? 'bg-gradient-to-br from-orange-400 to-yellow-500 text-white shadow-lg hover:shadow-orange-500/50 cursor-pointer font-bold'
                                    : isValidDay
                                    ? 'bg-orange-100/20 text-muted-foreground hover:bg-orange-100/30'
                                    : 'transparent'
                                }`}
                              >
                                {isValidDay && dayNum}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Time Slots */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-foreground">Class Hours</h4>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="bg-gradient-to-br from-orange-400/20 to-yellow-500/20 border-2 border-dashed border-orange-400 rounded-lg p-4 hover:border-solid hover:border-orange-500 transition-all duration-200 cursor-pointer group text-center"
                        >
                          <p className="text-sm font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Full Day Class</p>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/70 mt-2 font-semibold">🕐 9:00 AM - 3:00 PM</p>
                        </motion.div>
                      </div>

                      {/* Note */}
                      <div className="bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 border-2 border-dashed border-yellow-400 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          ✨ <span className="font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">Pro Tip:</span> <span className="text-foreground">Book your slot early to secure your spot for weekend classes!</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </ScrollAnimation>
        </div>
      </div>
    </Layout>
  );
}
