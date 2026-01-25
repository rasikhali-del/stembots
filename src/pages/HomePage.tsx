import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layouts/Layout';
import { homepageApi, coursesApi } from '@/db/api';
import type { HomepageContent, Course } from '@/types';
import { ArrowRight, Code, Cpu, Lightbulb, Wrench, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for hero background
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
        setFeaturedCourses(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };

    loadContent();
    loadCourses();
  }, []);

  const programs = [
    { icon: Cpu, title: 'Robotics', description: 'Build and program amazing robots', color: 'text-primary', gradient: 'from-primary/20 to-primary/5' },
    { icon: Lightbulb, title: 'AI', description: 'Explore artificial intelligence', color: 'text-secondary', gradient: 'from-secondary/20 to-secondary/5' },
    { icon: Code, title: 'Coding', description: 'Learn programming languages', color: 'text-accent', gradient: 'from-accent/20 to-accent/5' },
    { icon: Wrench, title: 'STEM Kits', description: 'Hands-on learning experiences', color: 'text-primary', gradient: 'from-primary/20 to-primary/5' },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden py-20 xl:py-32">
        {/* Animated Background with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <img
            src="https://miaoda-site-img.s3cdn.medo.dev/images/99ba302c-ba74-4636-8086-6fc9ab4d861f.jpg"
            alt="STEM Education Background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/90"></div>
          
          {/* Animated grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(33,150,243,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(33,150,243,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Next-Gen STEM Education</span>
            </motion.div>

            <motion.h1 
              className="text-4xl xl:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="gradient-text">
                {content.hero_title || 'Empowering Young Minds Through STEM Education'}
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg xl:text-xl text-foreground/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {content.hero_subtitle || 'Discover the exciting world of Science, Technology, Engineering, and Mathematics through hands-on learning and innovative programs.'}
            </motion.p>

            <motion.div 
              className="flex flex-col xl:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(33, 150, 243, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" asChild className="group">
                  <Link to="/courses">
                    Explore Courses
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" asChild className="border-primary/30 hover:border-primary">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section with Stagger Animation */}
      <section className="py-16 xl:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl xl:text-4xl font-bold mb-4 gradient-text">Our Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of STEM programs designed to inspire and educate young learners
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 xl:grid-cols-2 @4xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <Card className={`h-full bg-gradient-to-br ${program.gradient} border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <program.icon className={`h-12 w-12 ${program.color} mb-4`} />
                    </motion.div>
                    <CardTitle className="group-hover:text-primary transition-colors">{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 xl:py-24 bg-card/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl xl:text-4xl font-bold mb-4 gradient-text">Featured Courses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out some of our most popular courses
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 xl:grid-cols-2 @4xl:grid-cols-4 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -12,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <Card className="h-full bg-card border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                  {course.image_url && (
                    <div className="aspect-video w-full overflow-hidden">
                      <motion.img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{course.age_group}</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium border border-primary/20">
                        {course.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg">
                <Link to="/courses">View All Courses</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 xl:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center bg-card/50 backdrop-blur-sm rounded-lg p-8 xl:p-12 border border-border/50"
          >
            <motion.h2 
              className="text-3xl xl:text-4xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Start Learning?
            </motion.h2>
            <motion.p 
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join thousands of students already learning with Stembots
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
    </Layout>
  );
}
