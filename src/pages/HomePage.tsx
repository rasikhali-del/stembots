import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layouts/Layout';
import { homepageApi, coursesApi } from '@/db/api';
import type { HomepageContent, Course } from '@/types';
import { ArrowRight, Code, Cpu, Lightbulb, Wrench } from 'lucide-react';

export default function HomePage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);

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
    { icon: Cpu, title: 'Robotics', description: 'Build and program amazing robots', color: 'text-primary' },
    { icon: Lightbulb, title: 'AI', description: 'Explore artificial intelligence', color: 'text-secondary' },
    { icon: Code, title: 'Coding', description: 'Learn programming languages', color: 'text-accent' },
    { icon: Wrench, title: 'STEM Kits', description: 'Hands-on learning experiences', color: 'text-primary' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 xl:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl xl:text-6xl font-bold mb-6 gradient-text">
              {content.hero_title || 'Empowering Young Minds Through STEM Education'}
            </h1>
            <p className="text-lg xl:text-xl text-muted-foreground mb-8">
              {content.hero_subtitle || 'Discover the exciting world of Science, Technology, Engineering, and Mathematics through hands-on learning and innovative programs.'}
            </p>
            <div className="flex flex-col xl:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 xl:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Our Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of STEM programs designed to inspire and educate young learners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 @4xl:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-hover transition-shadow duration-300">
                  <CardHeader>
                    <program.icon className={`h-12 w-12 ${program.color} mb-4`} />
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 xl:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out some of our most popular courses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 @4xl:grid-cols-4 gap-6 mb-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-hover transition-shadow duration-300">
                  {course.image_url && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{course.age_group}</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                        {course.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 xl:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-8 xl:p-12"
          >
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of students already learning with Stembots
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
