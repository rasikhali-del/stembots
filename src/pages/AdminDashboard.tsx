import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contactApi, coursesApi } from '@/db/api';
import type { ContactMessage, Course } from '@/types';
import { Trash2, BookOpen, MessageSquare, LogOut, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin session exists
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      toast({
        title: 'Unauthorized',
        description: 'Please login first',
        variant: 'destructive',
      });
      navigate('/admin-login');
      return;
    }

    loadData();
  }, [navigate, toast]);

  const loadData = async () => {
    try {
      const messagesData = await contactApi.getAll();
      const coursesData = await coursesApi.getAll();
      setMessages(messagesData);
      setCourses(coursesData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load data',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await contactApi.delete(id);
      setMessages(messages.filter(m => m.id !== id));
      toast({
        title: 'Success',
        description: 'Message deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 py-12 xl:py-16">
        <div className="container mx-auto px-4">
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 text-5xl opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '3s' }}>⭐</div>
          <div className="absolute top-40 right-20 text-4xl opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>✨</div>
          <div className="absolute bottom-32 left-20 text-4xl opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>🎒</div>
          <div className="absolute bottom-20 right-10 text-5xl opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '4s', animationDelay: '1.5s' }}>📐</div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex justify-between items-start"
          >
            <div>
              <h1 className="text-4xl xl:text-5xl font-bold mb-2 text-slate-900 dark:text-white">
                Dashboard Control Center
              </h1>
              <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                Manage your platform content and users
              </p>
            </div>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white gap-2"
              onClick={() => {
                localStorage.removeItem('adminSession');
                toast({
                  title: 'Logged Out',
                  description: 'You have been logged out successfully',
                });
                navigate('/admin-login');
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-0 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Courses</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{courses.length}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Courses available</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Messages</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-pink-400 to-red-400 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{messages.length}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">New messages</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10"
          >
            <Tabs defaultValue="messages" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/50">
                <TabsTrigger value="messages" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="courses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Courses
                </TabsTrigger>
              </TabsList>

              {/* Messages Tab */}
              <TabsContent value="messages" className="space-y-4 mt-6">
                {messages.length === 0 ? (
                  <Card className="border-0 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm">
                    <CardContent className="py-12 text-center">
                      <p className="text-slate-500 dark:text-slate-400 text-lg mb-2">No messages yet</p>
                      <p className="text-slate-400 dark:text-slate-500 text-sm">Messages from your visitors will appear here</p>
                    </CardContent>
                  </Card>
                ) : (
                  messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="border-0 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow group">
                        <CardHeader>
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg text-slate-900 dark:text-white">{message.name}</CardTitle>
                              <CardDescription className="text-slate-500 dark:text-slate-400">{message.email}</CardDescription>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Message</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this message? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => handleDeleteMessage(message.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">{message.message}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-500">
                            📅 {new Date(message.created_at).toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses" className="space-y-6 mt-6">
                <div className="flex justify-end">
                  <Button asChild className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                    <Link to="/admin/courses">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Manage Courses
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="border-0 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm hover:shadow-lg transition-shadow h-full">
                        <CardHeader>
                          <div className="flex justify-between items-start gap-3 mb-2">
                            <CardTitle className="text-lg text-slate-900 dark:text-white flex-1">{course.title}</CardTitle>
                            <span className="px-3 py-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-xs font-semibold flex-shrink-0">
                              {course.category}
                            </span>
                          </div>
                          <CardDescription className="text-slate-600 dark:text-slate-400">{course.age_group}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{course.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
