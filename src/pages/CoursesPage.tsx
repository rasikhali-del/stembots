import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useAnimationControls, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { coursesApi } from '@/db/api';
import type { Course } from '@/types';
import { BlurReveal, ClipText } from '@/components/common/AdvancedTextAnimations';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, { once: false, margin: "-15% 0px" });
  const controls = useAnimationControls();
  const navigate = useNavigate();

  const handleCourseClick = (course: Course) => {
    navigate(`/courses/${course.id}`);
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await coursesApi.getAll();
        setCourses(data);
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };
    loadCourses();
  }, []);

  // Card width + gap = one "unit" of scroll. We duplicate the list so it wraps seamlessly.
  const CARD_WIDTH = 340; // px per card (including gap handled by css gap)
  const GAP = 24; // gap-6 = 24px
  const totalWidth = courses.length * (CARD_WIDTH + GAP);

  const startAnimation = useCallback(() => {
    if (courses.length === 0) return;
    controls.start({
      x: [-0, -totalWidth],
      transition: {
        x: {
          duration: courses.length * 4, // ~4s per card for smooth speed
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      },
    });
  }, [controls, courses.length, totalWidth]);

  useEffect(() => {
    if (courses.length === 0) return;
    if (isHovering) {
      controls.stop();
    } else {
      startAnimation();
    }
  }, [courses.length, isHovering, startAnimation, controls]);

  // Duplicate the courses array for seamless looping
  const duplicatedCourses = [...courses, ...courses];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 xl:py-16">
        <section ref={carouselRef} className="mb-16 xl:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={carouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <ClipText className="text-3xl xl:text-4xl font-bold mb-4 gradient-text">
              Explore Courses
            </ClipText>
            <BlurReveal delay={0.2} className="text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of STEM courses designed for young learners
            </BlurReveal>
          </motion.div>

          {/* Infinite Scroll Slider */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Left fade */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
            {/* Right fade */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />

            <motion.div
              ref={trackRef}
              className="flex gap-6 py-4"
              animate={controls}
            >
              {duplicatedCourses.map((course, index) => (
                <motion.div
                  key={`${course.id}-${index}`}
                  className="flex-shrink-0"
                  style={{ width: CARD_WIDTH }}
                  whileHover={{
                    y: -12,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                >
                  <div className="relative group h-full">
                    {/* Dashed Border Container */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-orange-400 pointer-events-none group-hover:border-orange-500 transition-colors duration-300" />

                    <Card
                      className="h-full bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-sm border-none rounded-3xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden relative"
                      onClick={() => handleCourseClick(course)}
                    >
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
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-orange-500 transition-colors">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3 text-sm text-foreground/70 mt-2">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground font-medium">{course.age_group}</span>
                          <span className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-xs font-bold border border-orange-400/50">
                            {course.category}
                          </span>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-lg group/btn relative overflow-hidden shadow-md hover:shadow-lg"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(course);
                          }}
                        >
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
          </div>
        </section>
      </div>
    </Layout>
  );
}
