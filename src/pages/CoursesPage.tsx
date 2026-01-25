import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { coursesApi } from '@/db/api';
import type { Course } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Robotics', 'Coding', 'AI', 'STEM'];

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
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => course.category === selectedCategory));
    }
  }, [selectedCategory, courses]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 xl:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-5xl font-bold mb-4 gradient-text">Our Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of STEM courses designed for young learners
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 @4xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
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
          <motion.div
            layout
            className="grid grid-cols-1 xl:grid-cols-2 @4xl:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                  {course.image_url && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium whitespace-nowrap ml-2">
                        {course.category}
                      </span>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Age: {course.age_group}
                      </span>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
