import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { coursesApi } from '@/db/api';
import type { Course } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BlurReveal, ClipText } from '@/components/common/AdvancedTextAnimations';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const carouselRef = useRef(null);
  const carouselInView = useInView(carouselRef, { once: false, margin: "-15% 0px" });
  const navigate = useNavigate();

  // Navigate to course detail page
  const handleCourseClick = (course: Course) => {
    navigate(`/courses/${course.id}`);
  };

  // Auto-scroll carousel effect with infinite loop
  useEffect(() => {
    if (courses.length === 0 || isHoveringCarousel) return;

    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => {
        const nextIndex = (prev + 1) % courses.length;
        return nextIndex;
      });
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [courses.length, isHoveringCarousel]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await coursesApi.getAll();
        setCourses(data); // Show all courses
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };

    loadCourses();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 xl:py-16">
        {/* Featured Courses Carousel Section */}
        <section ref={carouselRef} className="mb-16 xl:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={carouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8"
          >
            <ClipText className="text-3xl xl:text-4xl font-bold mb-4 gradient-text">
              Explore Courses
            </ClipText>
            <BlurReveal delay={0.2} className="text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of STEM courses designed for young learners
            </BlurReveal>
          </motion.div>

          {/* Carousel Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHoveringCarousel(true)}
            onMouseLeave={() => setIsHoveringCarousel(false)}
          >
            {/* Course Carousel */}
            <motion.div 
              className="overflow-hidden rounded-xl"
              initial={{ opacity: 0 }}
              animate={carouselInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex gap-6"
                animate={{ x: -currentCarouselIndex * (100 / Math.min(courses.length, 4)) + '%' }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 1
                }}
              >
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-2/5 xl:w-1/3"
                    whileHover={{ 
                      y: -12,
                      transition: { type: 'spring', stiffness: 300, damping: 20 }
                    }}
                  >
                    <div className="relative group h-full">
                      {/* Dashed Border Container */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-orange-400 pointer-events-none group-hover:border-orange-500 transition-colors duration-300"></div>
                      
                      <Card className="h-full bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-sm border-none rounded-3xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden relative" onClick={() => handleCourseClick(course)}>
                        {course.image_url && (
                          <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
                            <motion.img
                              src={course.image_url}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                            />
                          </div>
                        )}
                        <CardHeader className="pt-6 pb-4">
                          <CardTitle className="text-xl font-bold text-foreground group-hover:text-orange-500 transition-colors">{course.title}</CardTitle>
                          <CardDescription className="line-clamp-3 text-sm text-foreground/70 mt-2">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-medium">{course.age_group}</span>
                            <span className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-xs font-bold border border-orange-400/50">
                              {course.category}
                            </span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-lg group/btn relative overflow-hidden shadow-md hover:shadow-lg" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(course);
                          }}>
                            <span className="relative z-10">Explore Program</span>
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.5 }}
                            />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Navigation Arrows */}
            {courses.length > 0 && (
              <>
                <motion.button
                  className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 xl:-ml-8 z-10 p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentCarouselIndex((prev) => (prev - 1 + courses.length) % courses.length)}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 xl:-mr-8 z-10 p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentCarouselIndex((prev) => (prev + 1) % courses.length)}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {courses.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentCarouselIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/40'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setCurrentCarouselIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
