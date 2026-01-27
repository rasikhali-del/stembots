import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { coursesApi } from '@/db/api';
import { supabase } from '@/db/supabase';
import type { Course } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Robotics', 'Coding', 'AI', 'Leadership', 'Arts'];

  // Function to handle WhatsApp redirect
  const handleEnrollClick = (course: Course) => {
    const message = `Hello! I'm interested in enrolling in the *${course.title}* course from *STEMBOTS*. I would like to learn more about this program.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await coursesApi.getAll();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error('Failed to load courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();

    // Set up real-time subscription to courses table
    const subscription = supabase
      .channel('courses-channel')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'courses'
        },
        async () => {
          // Reload courses whenever there's a change
          try {
            const data = await coursesApi.getAll();
            setCourses(data);
            setFilteredCourses(data);
          } catch (error) {
            console.error('Failed to sync courses:', error);
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => course.category === selectedCategory));
    }
  }, [selectedCategory, courses]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 xl:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium STEM Courses</span>
          </motion.div>

          <h1 className="text-4xl xl:text-5xl font-bold mb-4 gradient-text">Our Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of STEM courses designed for young learners
          </p>
        </motion.div>

        {/* Category Filter with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'shadow-lg shadow-primary/30' 
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Courses Grid with AnimatePresence */}
        {loading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 @4xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-card border-border/50">
                <Skeleton className="aspect-video w-full bg-muted" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-muted" />
                  <Skeleton className="h-4 w-full bg-muted" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/2 bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 xl:grid-cols-2 @4xl:grid-cols-3 gap-6"
            >
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ 
                    y: -12,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <Card 
                    className="h-full bg-card border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden cursor-pointer relative"
                    onClick={() => handleEnrollClick(course)}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500 pointer-events-none"></div>
                    
                    {course.image_url && (
                      <div className="aspect-video w-full overflow-hidden relative">
                        <motion.img
                          src={course.image_url}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    
                    <CardHeader className="relative">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {course.title}
                        </CardTitle>
                        <motion.span 
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium whitespace-nowrap ml-2 border border-primary/20"
                          whileHover={{ scale: 1.1 }}
                        >
                          {course.category}
                        </motion.span>
                      </div>
                      <CardDescription className="group-hover:text-foreground/80 transition-colors">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Age: {course.age_group}
                        </span>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-primary/30 hover:border-primary hover:bg-primary/10 group-hover:shadow-lg group-hover:shadow-primary/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEnrollClick(course);
                            }}
                          >
                            Enroll Now
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filteredCourses.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground">No courses found in this category.</p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
