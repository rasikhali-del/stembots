import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { homepageApi } from '@/db/api';
import type { HomepageContent } from '@/types';
import { Target, Eye, Users, Sparkles } from 'lucide-react';
import { ScrollAnimation } from '@/components/common/ScrollAnimation';
import { BlurReveal, ClipText, StaggerText, SlideInText } from '@/components/common/AdvancedTextAnimations';

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
        <ScrollAnimation animation="slideUp" className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">About Stembots</span>
          </motion.div>
          <ClipText className="text-4xl xl:text-5xl font-bold mb-4 gradient-text">
            About Stembots
          </ClipText>
          <BlurReveal delay={0.3} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspiring the next generation of innovators and problem solvers
          </BlurReveal>
        </ScrollAnimation>

        {/* Mission Section */}
        <ScrollAnimation animation="slideUp" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-15% 0px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500 pointer-events-none"></div>
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="h-8 w-8 text-primary" />
                  </motion.div>
                  <ClipText className="text-2xl gradient-text">
                    Our Mission
                  </ClipText>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <BlurReveal delay={0.2} className="text-muted-foreground leading-relaxed">
                  {content.about_mission || 'At Stembots, we believe every child has the potential to become a future innovator. Our mission is to inspire and educate young minds through engaging STEM programs that combine creativity, critical thinking, and hands-on learning.'}
                </BlurReveal>
              </CardContent>
            </Card>
          </motion.div>
        </ScrollAnimation>

        {/* Vision Section */}
        <ScrollAnimation animation="slideUp" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/30 transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/5 group-hover:via-secondary/10 group-hover:to-secondary/5 transition-all duration-500 pointer-events-none"></div>
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Eye className="h-8 w-8 text-secondary" />
                  </motion.div>
                  <ClipText className="text-2xl gradient-text-secondary">
                    Our Vision
                  </ClipText>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <BlurReveal delay={0.2} className="text-muted-foreground leading-relaxed">
                  {content.about_vision || 'We envision a world where every child has access to quality STEM education, empowering them to solve real-world problems and shape the future of technology.'}
                </BlurReveal>
              </CardContent>
            </Card>
          </motion.div>
        </ScrollAnimation>

        {/* Why STEM Section */}
        <ScrollAnimation animation="slideUp" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:via-accent/10 group-hover:to-accent/5 transition-all duration-500 pointer-events-none"></div>
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="h-8 w-8 text-accent" />
                  </motion.div>
                  <ClipText className="text-2xl">
                    Why STEM Education Matters
                  </ClipText>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <BlurReveal delay={0.1}>
                    STEM education is crucial in preparing students for the future. It develops critical thinking, problem-solving skills, and creativity that are essential in today's rapidly evolving world.
                  </BlurReveal>
                  <BlurReveal delay={0.2}>
                    Through our programs, students learn to approach challenges systematically, work collaboratively, and think innovatively. These skills extend far beyond the classroom and prepare them for success in any field they choose to pursue.
                  </BlurReveal>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </ScrollAnimation>

        {/* Values Section */}
        <ScrollAnimation animation="slideUp" className="mb-16">
          <ClipText className="text-3xl font-bold text-center mb-8 gradient-text">
            Our Values
          </ClipText>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Innovation', description: 'We encourage creative thinking and innovative solutions to real-world problems.', icon: '✨', color: 'from-primary' },
              { title: 'Excellence', description: 'We strive for excellence in everything we do, from curriculum design to student support.', icon: '🎯', color: 'from-secondary' },
              { title: 'Inclusivity', description: 'We believe STEM education should be accessible to all students, regardless of background.', icon: '🤝', color: 'from-accent' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <Card className="h-full text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500 pointer-events-none"></div>
                  <CardHeader className="relative">
                    <motion.div
                      className="text-4xl mb-2"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      {value.icon}
                    </motion.div>
                    <CardTitle className="text-xl gradient-text">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>

        {/* Leadership/Founders Section */}
        <ScrollAnimation animation="slideUp" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-15% 0px" }}
            transition={{ duration: 0.6 }}
          >
            <ClipText className="text-3xl font-bold text-center mb-12 gradient-text">
              Meet Our Team
            </ClipText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Founder 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  <div className="aspect-square w-full bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden relative">
                    <img 
                      src="/images/founder.jpg" 
                      alt="Founder" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22300%22 height=%22300%22/%3E%3Ccircle cx=%22150%22 cy=%22100%22 r=%2240%22 fill=%22%23999%22/%3E%3Crect x=%22100%22 y=%22150%22 width=%22100%22 height=%2280%22 fill=%22%23999%22/%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:gradient-text transition-all duration-300">Founder & CEO</CardTitle>
                    <motion.p 
                      className="text-sm text-primary font-semibold mt-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Leadership
                    </motion.p>
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
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: 0.15 }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/30 transition-all duration-300 group">
                  <div className="aspect-square w-full bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden relative">
                    <img 
                      src="/images/cofounder.jpg" 
                      alt="Co-Founder" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22300%22 height=%22300%22/%3E%3Ccircle cx=%22150%22 cy=%22100%22 r=%2240%22 fill=%22%23999%22/%3E%3Crect x=%22100%22 y=%22150%22 width=%22100%22 height=%2280%22 fill=%22%23999%22/%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:gradient-text transition-all duration-300">Co-Founder & Director</CardTitle>
                    <motion.p 
                      className="text-sm text-secondary font-semibold mt-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Curriculum
                    </motion.p>
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
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-orange-500/30 transition-all duration-300 group">
                  <div className="aspect-square w-full bg-gradient-to-br from-orange-500/10 to-orange-600/10 overflow-hidden relative">
                    <img 
                      src="/images/khadija.jpg" 
                      alt="Head of Arts - Khadija" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-6xl">🎨</div></div>';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-orange-500 transition-colors duration-300">Khadija</CardTitle>
                    <motion.p 
                      className="text-sm text-orange-600 font-semibold mt-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Head of Arts
                    </motion.p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Creative educator bringing innovation to STEM through art integration.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Lead Developer - Zain */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: 0.25 }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/30 transition-all duration-300 group">
                  <div className="aspect-square w-full bg-gradient-to-br from-purple-500/10 to-purple-600/10 overflow-hidden relative">
                    <img 
                      src="/images/zain.jpg" 
                      alt="Lead Developer - Zain" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-6xl">💻</div></div>';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-purple-500 transition-colors duration-300">Zain</CardTitle>
                    <motion.p 
                      className="text-sm text-purple-600 font-semibold mt-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Lead Developer
                    </motion.p>
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
        </ScrollAnimation>
      </div>
    </Layout>
  );
}
