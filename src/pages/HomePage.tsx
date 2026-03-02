import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useInView, useMotionValueEvent } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layouts/Layout';
import { homepageApi, coursesApi } from '@/db/api';
import type { HomepageContent, Course } from '@/types';
import { ArrowRight, Code, Cpu, Lightbulb, Wrench, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlurReveal, StaggerText, ClipText } from '@/components/common/AdvancedTextAnimations';

export default function HomePage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [isHoveringCourses, setIsHoveringCourses] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  
  // Track scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrollDirection(latest > previous ? 'down' : 'up');
  });

  // Auto-scroll carousel effect with infinite loop
  useEffect(() => {
    if (featuredCourses.length === 0 || isHoveringCourses) return;

    const interval = setInterval(() => {
      setCurrentCourseIndex((prev) => {
        const nextIndex = (prev + 1) % featuredCourses.length;
        return nextIndex;
      });
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [featuredCourses.length, isHoveringCourses]);

  // Section refs for scroll animations
  const programsRef = useRef(null);
  const coursesRef = useRef(null);
  const ctaRef = useRef(null);
  
  const programsInView = useInView(programsRef, { once: false, margin: "-15% 0px" });
  const coursesInView = useInView(coursesRef, { once: false, margin: "-15% 0px" });
  const ctaInView = useInView(ctaRef, { once: false, margin: "-15% 0px" });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await homepageApi.getAll();
        const contentMap: Record<string, string> = {};
        data.forEach((item: HomepageContent) => {
          contentMap[item.section_id] = item.content;
        });
        setContent(contentMap);
      } catch (error) {
        console.error('Failed to load homepage content:', error);
      }
    };

    const loadCourses = async () => {
      try {
        const data = await coursesApi.getAll();
        setFeaturedCourses(data);
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };

    loadContent();
    loadCourses();
  }, []);

  const programs = [
    { icon: Cpu, title: 'Robotics', description: 'Build and program amazing robots', color: 'text-yellow-500', gradient: 'from-yellow-400/30 to-yellow-500/10', bgColor: 'bg-yellow-100/10' },
    { icon: Lightbulb, title: 'AI', description: 'Explore artificial intelligence', color: 'text-orange-500', gradient: 'from-orange-400/30 to-orange-500/10', bgColor: 'bg-orange-100/10' },
    { icon: Code, title: 'Coding', description: 'Learn programming languages', color: 'text-red-500', gradient: 'from-red-400/30 to-red-500/10', bgColor: 'bg-red-100/10' },
    { icon: Wrench, title: 'STEM Kits', description: 'Hands-on learning experiences', color: 'text-green-500', gradient: 'from-green-400/30 to-green-500/10', bgColor: 'bg-green-100/10' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        damping: 12
      }
    }
  };

  return (
    <Layout>
     
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50"
        style={{ scaleX: scrollYProgress }}
        initial={{ scaleX: 0 }}
      />

      
      <section className="relative overflow-hidden py-16 xl:py-24 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        {/* Decorative Floating Elements */}
        <div className="absolute top-20 left-10 text-5xl opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '3s' }}>⭐</div>
        <div className="absolute top-40 right-20 text-4xl opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-32 left-20 text-4xl opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>🎒</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '4s', animationDelay: '1.5s' }}>📐</div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
              >
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">
                  Stembots
                </span>
              </motion.div>

              <motion.h1 
                className="text-4xl xl:text-5xl font-bold mb-6 leading-tight text-slate-900 dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <StaggerText
                  delay={0.3}
                  staggerDelay={0.12}
                  className="block"
                >
                  Fun and Engaging
                </StaggerText>
                <StaggerText
                  delay={0.4}
                  staggerDelay={0.12}
                  className="block"
                >
                  Online Coding Classes
                </StaggerText>
                <StaggerText
                  delay={0.5}
                  staggerDelay={0.12}
                  className="block"
                >
                  for Kids and Teens
                </StaggerText>
              </motion.h1>

              <BlurReveal delay={0.8} className="text-base xl:text-lg text-foreground/80 mb-8 leading-relaxed">
                {content.hero_subtitle || 'Unlock your child\'s creativity and confidence with our online coding classes for kids and interactive STEM programs. Designed for children aged 6-18, we inspire young minds to explore technology, solve problems, and build innovative projects—all while having fun!'}
              </BlurReveal>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" asChild className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-orange-500/50">
                    <Link to="/courses">
                      Explore Courses
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-96 xl:h-full flex items-center justify-center"
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="hero.png" 
                  alt="Children learning STEM - Coding Classes for Kids"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  loading="eager"
                />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/4 -right-20 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>
      

      {/* Programs Section with Scroll Animation */}
      <section ref={programsRef} className="py-16 xl:py-24 relative overflow-hidden bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={programsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === 'down' ? 40 : -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <ClipText className="text-4xl xl:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
              Our Programs
            </ClipText>
            <BlurReveal delay={0.2} className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore our diverse range of STEM programs designed to inspire and educate young learners
            </BlurReveal>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 xl:grid-cols-2 @4xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={programsInView ? "visible" : "hidden"}
          >
            {programs.map((program) => (
              <motion.div
                key={program.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <Card className={`h-full bg-gradient-to-br ${program.gradient} border-0 hover:shadow-lg transition-all duration-300 group overflow-hidden relative ${program.bgColor}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                      className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 ${program.bgColor} bg-opacity-40`}
                    >
                      <program.icon className={`h-8 w-8 ${program.color}`} />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-slate-900 dark:group-hover:text-white transition-colors font-bold text-slate-900 dark:text-white">{program.title}</CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{program.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* Featured Courses Section with Auto-Scroll Carousel */}
      <section ref={coursesRef} className="py-16 xl:py-24 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={coursesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === 'down' ? 40 : -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <ClipText className="text-4xl xl:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
              Featured Courses
            </ClipText>
            <BlurReveal delay={0.2} className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Check out some of our most popular courses
            </BlurReveal>
          </motion.div>

          {/* Carousel Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHoveringCourses(true)}
            onMouseLeave={() => setIsHoveringCourses(false)}
          >
            {/* Course Carousel */}
            <motion.div 
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={coursesInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
            >            <motion.div
              className="flex gap-6 pb-4"
              animate={{ x: -currentCourseIndex * (100 / Math.min(featuredCourses.length, 3)) + '%' }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 1
              }}
            >
                {featuredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="flex-shrink-0 w-full md:w-1/2 xl:w-1/3"
                    whileHover={{ 
                      y: -12,
                      transition: { type: 'spring', stiffness: 300, damping: 20 }
                    }}
                  >
                    <div className="relative group h-full">
                      <Card className="h-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-0 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden relative">
                        {course.image_url && (
                          <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                            <motion.img
                              src={course.image_url}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                            />
                          </div>
                        )}
                        <CardHeader className="pt-5 pb-3">
                          <CardTitle className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">{course.title}</CardTitle>
                          <CardDescription className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mt-2">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-400 font-medium">{course.age_group}</span>
                            <span className="px-3 py-1 bg-gradient-to-r from-pink-400/20 to-purple-400/20 text-slate-900 dark:text-white rounded-full text-xs font-bold border border-pink-400/50">
                              {course.category}
                            </span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-lg group/btn relative overflow-hidden shadow-md hover:shadow-orange-500/50 transition-all" size="sm">
                            <span className="relative z-10">Enroll Now</span>
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
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 xl:-ml-8 z-10 p-2 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white shadow-lg hover:shadow-orange-500/50 transition-all"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentCourseIndex((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length)}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 xl:-mr-8 z-10 p-2 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white shadow-lg hover:shadow-orange-500/50 transition-all"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentCourseIndex((prev) => (prev + 1) % featuredCourses.length)}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredCourses.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentCourseIndex ? 'w-8 bg-gradient-to-r from-orange-400 to-yellow-500 shadow-lg shadow-orange-500/50' : 'w-2 bg-orange-300/50 hover:bg-orange-400/70'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => setCurrentCourseIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Scroll Animation */}
      <section ref={ctaRef} className="py-16 xl:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={ctaInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: scrollDirection === 'down' ? 40 : -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center bg-card/50 backdrop-blur-sm rounded-lg p-8 xl:p-12 border border-border/50"
          >
            <ClipText className="text-4xl xl:text-5xl font-bold mb-6 gradient-text leading-tight">
              Ready to Start Learning?
            </ClipText>
            <BlurReveal delay={0.2} className="text-lg text-foreground/75 mb-8 leading-relaxed">
              Join thousands of students already learning with Stembots
            </BlurReveal>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>


{/* Stembots for Institutions Section */}
<section className="py-16 xl:py-24 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5"></div>
  <div className="container mx-auto px-4 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-15% 0px" }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto text-center mb-12"
    >
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4 backdrop-blur-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false }}
      >
        <Sparkles className="w-4 h-4 text-secondary" />
        <span className="text-sm font-medium text-secondary">For Educational Institutions</span>
      </motion.div>
      <ClipText className="text-4xl xl:text-5xl font-bold mb-6 gradient-text-secondary leading-tight">
        Stembots for Institutions
      </ClipText>
      <BlurReveal delay={0.2} className="text-lg text-foreground/75 max-w-xl mx-auto mb-2 leading-relaxed">
        Bring our 2-month Summer/Winter STEM Camps to your school or academy!
      </BlurReveal>
      <BlurReveal delay={0.3} className="text-lg text-foreground/75 max-w-xl mx-auto leading-relaxed">
        Perfect for institutions looking to inspire students with hands-on robotics, coding, and AI activities.
      </BlurReveal>
    </motion.div>
    <motion.form
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-15% 0px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="max-w-xl mx-auto bg-card/50 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6 border border-border/50 hover:border-secondary/30 transition-colors duration-300"
      onSubmit={e => { e.preventDefault(); /* handle submit here */ }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <label className="block mb-2 font-semibold text-sm text-foreground">Institution Name</label>
          <input
            type="text"
            name="institution"
            required
            className="w-full px-4 py-2.5 border border-border/50 rounded-lg bg-background/50 focus:bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50"
            placeholder="School/Academy Name"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <label className="block mb-2 font-semibold text-sm text-foreground">Focal Person</label>
          <input
            type="text"
            name="focalPerson"
            required
            className="w-full px-4 py-2.5 border border-border/50 rounded-lg bg-background/50 focus:bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50"
            placeholder="Contact Person Name"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <label className="block mb-2 font-semibold text-sm text-foreground">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2.5 border border-border/50 rounded-lg bg-background/50 focus:bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50"
            placeholder="contact@email.com"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <label className="block mb-2 font-semibold text-sm text-foreground">Contact Number</label>
          <input
            type="tel"
            name="contact"
            required
            className="w-full px-4 py-2.5 border border-border/50 rounded-lg bg-background/50 focus:bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50"
            placeholder="03XX-XXXXXXX"
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <label className="block mb-2 font-semibold text-sm text-foreground">Message (Optional)</label>
        <textarea
          name="message"
          className="w-full px-4 py-2.5 border border-border/50 rounded-lg bg-background/50 focus:bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 min-h-24 resize-none"
          placeholder="Any specific requirements or questions?"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.35 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button type="submit" className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 relative overflow-hidden group">
          <span className="relative z-10">Submit Inquiry</span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </Button>
      </motion.div>
    </motion.form>
  </div>
</section>
    </Layout>
  );
}