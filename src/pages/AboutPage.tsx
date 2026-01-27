import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { homepageApi } from '@/db/api';
import type { HomepageContent } from '@/types';
import { Target, Eye, Users } from 'lucide-react';

export default function AboutPage() {
  const [content, setContent] = useState<Record<string, string>>({});

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
        console.error('Failed to load content:', error);
      }
    };

    loadContent();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 xl:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl xl:text-5xl font-bold mb-4 gradient-text">About Stembots</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspiring the next generation of innovators and problem solvers
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {content.about_mission || 'At Stembots, we believe every child has the potential to become a future innovator. Our mission is to inspire and educate young minds through engaging STEM programs that combine creativity, critical thinking, and hands-on learning.'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-8 w-8 text-secondary" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {content.about_vision || 'We envision a world where every child has access to quality STEM education, empowering them to solve real-world problems and shape the future of technology.'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why STEM Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-8 w-8 text-accent" />
                <CardTitle className="text-2xl">Why STEM Education Matters</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  STEM education is crucial in preparing students for the future. It develops critical thinking, problem-solving skills, and creativity that are essential in today's rapidly evolving world.
                </p>
                <p>
                  Through our programs, students learn to approach challenges systematically, work collaboratively, and think innovatively. These skills extend far beyond the classroom and prepare them for success in any field they choose to pursue.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Innovation', description: 'We encourage creative thinking and innovative solutions to real-world problems.' },
              { title: 'Excellence', description: 'We strive for excellence in everything we do, from curriculum design to student support.' },
              { title: 'Inclusivity', description: 'We believe STEM education should be accessible to all students, regardless of background.' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full text-center hover:shadow-hover transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leadership/Founders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Founder 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-hover transition-shadow duration-300">
                <div className="aspect-square w-full bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <img 
                    src="/images/founder.jpg" 
                    alt="Founder" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22300%22 height=%22300%22/%3E%3Ccircle cx=%22150%22 cy=%22100%22 r=%2240%22 fill=%22%23999%22/%3E%3Crect x=%22100%22 y=%22150%22 width=%22100%22 height=%2280%22 fill=%22%23999%22/%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Founder & CEO</CardTitle>
                  <p className="text-sm text-primary font-semibold mt-1">Leadership</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Visionary leader with passion for STEM education and innovation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Co-Founder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-hover transition-shadow duration-300">
                <div className="aspect-square w-full bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <img 
                    src="/images/cofounder.jpg" 
                    alt="Co-Founder" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22300%22 height=%22300%22/%3E%3Ccircle cx=%22150%22 cy=%22100%22 r=%2240%22 fill=%22%23999%22/%3E%3Crect x=%22100%22 y=%22150%22 width=%22100%22 height=%2280%22 fill=%22%23999%22/%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Co-Founder & Director</CardTitle>
                  <p className="text-sm text-secondary font-semibold mt-1">Curriculum</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Strategic innovator dedicated to accessible STEM education.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

                        {/* Head of Arts - Khadija */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-hover transition-shadow duration-300">
                <div className="aspect-square w-full bg-gradient-to-br from-orange-500/10 to-orange-600/10 overflow-hidden">
                  <img 
                    src="/images/khadija.jpg" 
                    alt="Head of Arts - Khadija" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-6xl">🎨</div></div>';
                      }
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Khadija</CardTitle>
                  <p className="text-sm text-orange-600 font-semibold mt-1">Head of Arts</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Creative director bringing imagination and artistic excellence to STEM education programs.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

                        {/* Lead Developer - Zain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-hover transition-shadow duration-300">
                <div className="aspect-square w-full bg-gradient-to-br from-purple-500/10 to-purple-600/10 overflow-hidden">
                  <img 
                    src="/images/zain.jpg" 
                    alt="Lead Developer - Zain" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-6xl">💻</div></div>';
                      }
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Zain</CardTitle>
                  <p className="text-sm text-purple-600 font-semibold mt-1">Lead Developer</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Full-stack developer passionate about coding education and building innovative solutions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
