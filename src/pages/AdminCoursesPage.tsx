import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { coursesApi } from '@/db/api';
import type { Course } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Plus } from 'lucide-react';

const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  age_group: z.string().min(1, 'Age group is required'),
  category: z.enum(['Robotics', 'Coding', 'AI', 'STEM']),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      age_group: '',
      category: 'Robotics',
      image_url: '',
    },
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await coursesApi.getAll();
      setCourses(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load courses',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    form.reset({
      title: course.title,
      description: course.description,
      age_group: course.age_group,
      category: course.category,
      image_url: course.image_url || '',
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingCourse(null);
    form.reset({
      title: '',
      description: '',
      age_group: '',
      category: 'Robotics',
      image_url: '',
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CourseFormData) => {
    try {
      setIsSubmitting(true);
      
      const courseData = {
        ...data,
        image_url: data.image_url || null,
      };

      if (editingCourse) {
        await coursesApi.update(editingCourse.id, courseData);
        toast({
          title: 'Success',
          description: 'Course updated successfully',
        });
      } else {
        await coursesApi.create(courseData as Omit<Course, 'id' | 'created_at' | 'updated_at'>);
        toast({
          title: 'Success',
          description: 'Course created successfully',
        });
      }

      setIsDialogOpen(false);
      loadCourses();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save course',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 xl:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 gradient-text">Manage Courses</h1>
              <p className="text-muted-foreground">Edit and create courses</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleCreate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingCourse ? 'Edit Course' : 'Create New Course'}</DialogTitle>
                  <DialogDescription>
                    {editingCourse ? 'Update course information' : 'Add a new course to the platform'}
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Course title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Course description"
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age_group"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age Group</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 8-12 years" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Robotics">Robotics</SelectItem>
                              <SelectItem value="Coding">Coding</SelectItem>
                              <SelectItem value="AI">AI</SelectItem>
                              <SelectItem value="STEM">STEM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="image_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : editingCourse ? 'Update' : 'Create'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <Card className="h-full">
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
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(course)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
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
      </div>
    </Layout>
  );
}
