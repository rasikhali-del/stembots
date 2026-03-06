import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RatingStars } from '@/components/ui/rating-stars';
import { reviewsApi } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle } from 'lucide-react';

const reviewSchema = z.object({
  student_name: z.string().min(2, 'Name must be at least 2 characters'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  review_text: z.string().min(10, 'Review must be at least 10 characters').max(500, 'Review must be less than 500 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface CourseReviewDialogProps {
  courseId: string;
  courseName: string;
  onReviewAdded?: () => void;
}

export function CourseReviewDialog({
  courseId,
  courseName,
  onReviewAdded,
}: CourseReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      student_name: '',
      rating: 0,
      review_text: '',
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      setIsSubmitting(true);
      await reviewsApi.create({
        course_id: courseId,
        student_name: data.student_name,
        rating: data.rating,
        review_text: data.review_text,
      });

      toast({
        title: 'Review posted!',
        description: 'Thank you for your review.',
      });

      form.reset();
      setOpen(false);
      onReviewAdded?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to post review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-primary/30">
          <MessageCircle className="h-4 w-4 mr-2" />
          Leave a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review {courseName}</DialogTitle>
          <DialogDescription>
            Share your experience with this course to help other students
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="student_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <RatingStars
                        rating={field.value}
                        onRatingChange={field.onChange}
                        interactive
                        size="lg"
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience with this course..."
                      className="min-h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Review'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
