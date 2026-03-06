import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { coursesApi, reviewsApi, enrollmentsApi } from '@/db/api';
import type { Course, CourseReview } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { CourseReviewDialog } from '@/components/common/CourseReviewDialog';
import { BlurReveal, ClipText } from '@/components/common/AdvancedTextAnimations';
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Loader2,
} from 'lucide-react';

const enrollmentSchema = z.object({
  student_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  age: z.string().min(1, 'Please enter age'),
  guardian_name: z.string().min(2, 'Guardian name must be at least 2 characters'),
  message: z.string().optional(),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      student_name: '',
      email: '',
      phone: '',
      age: '',
      guardian_name: '',
      message: '',
    },
  });

  const loadReviews = async () => {
    if (!id) return;
    try {
      const data = await reviewsApi.getByCourse(id);
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  useEffect(() => {
    const loadCourse = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await coursesApi.getById(id);
        setCourse(data);
        await loadReviews();
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const onSubmit = async (data: EnrollmentFormData) => {
    if (!id) return;
    try {
      setIsSubmitting(true);
      await enrollmentsApi.create({
        course_id: id,
        student_name: data.student_name,
        email: data.email,
        phone: data.phone,
        age: data.age,
        guardian_name: data.guardian_name,
        message: data.message || null,
      });

      toast({
        title: 'Enrollment Submitted! 🎉',
        description:
          'Thank you for enrolling! We will contact you shortly with more details.',
      });

      form.reset();
      setEnrollOpen(false);    } catch (error) {
      console.error('Enrollment submission error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit enrollment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
          1
        )
      : null;

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="h-12 w-12 text-orange-500" />
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/courses">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 xl:py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild className="group">
            <Link to="/courses">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Courses
            </Link>
          </Button>
        </motion.div>

        {/* Course Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Course Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            {course.image_url ? (
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-orange-400" />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="px-3 py-1.5 bg-orange-500 text-white rounded-full text-sm font-bold shadow-lg">
                {course.category}
              </span>
            </div>
          </motion.div>

          {/* Course Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <ClipText className="text-3xl xl:text-4xl font-bold mb-4 gradient-text">
              {course.title}
            </ClipText>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800">
                <Users className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{course.age_group}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                <GraduationCap className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{course.category}</span>
              </div>
              {averageRating && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">
                    {averageRating} ({reviews.length} reviews)
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="font-medium">Self-Paced</span>
              </div>
            </div>

            <BlurReveal delay={0.2}>
              <p className="text-base xl:text-lg text-muted-foreground leading-relaxed mb-8">
                {course.description}
              </p>
            </BlurReveal>

            {/* Enroll Button */}
            <Dialog open={enrollOpen} onOpenChange={setEnrollOpen}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    size="lg"
                    className="w-full md:w-auto px-10 py-6 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Enroll Now
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Button>
                </motion.div>
              </DialogTrigger>

              {/* Enrollment Form Dialog */}
              <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Enroll in {course.title}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details below to enroll in this course. We'll get
                    in touch with you shortly!
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 mt-4"
                  >
                    <FormField
                      control={form.control}
                      name="student_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter student's full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="email@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="03XX-XXXXXXX"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student Age *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guardian_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent/Guardian Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter guardian's name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any questions or special requirements..."
                              className="min-h-20 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full py-5 text-base font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Submit Enrollment
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        {/* Course Highlights Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Hands-on practical experience',
              'Industry-relevant curriculum',
              'Expert instructors',
              'Project-based learning',
              'Certificate of completion',
              'Lifetime access to resources',
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/10 dark:to-slate-900 border-orange-200 dark:border-orange-800/30 hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center gap-3 p-4">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{highlight}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Reviews Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Student Reviews</h2>
            <CourseReviewDialog
              courseId={course.id}
              courseName={course.title}
              onReviewAdded={loadReviews}
            />
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow border-orange-100 dark:border-slate-800">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-sm">
                          {review.student_name}
                        </span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.review_text}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-orange-200 dark:border-slate-700">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Star className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-center">
                  No reviews yet. Be the first to share your experience!
                </p>
              </CardContent>
            </Card>
          )}
        </motion.section>
      </div>
    </Layout>
  );
}
