'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Award, Building2, Users, FlaskConical, BookOpen, Globe, Target, Star, Zap, Shield, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const team = [
  {
    name: 'Haseeb Raza',
    role: 'CEO & Founder',
    bio: 'Microbiologist & Data Scientist. Published researcher in computational biology, antimicrobial resistance, and novel gene prediction. Leads research strategy and AI diagnostics development.',
    expertise: ['Computational Biology', 'AMR Research', 'AI Diagnostics', 'NGS Analysis'],
    linkedin: 'https://pk.linkedin.com/in/haseeb-raza-344947297',
    publications: 12,
  },
  {
    name: 'Kaneez Rubab',
    role: 'Co-Founder & Research Lead',
    bio: 'Published computational biology researcher specializing in multiomics, ribosome profiling, and translational regulation. Leads curriculum design and student research programs.',
    expertise: ['Multiomics', 'Ribosome Profiling', 'Translational Control', 'Bioinformatics'],
    linkedin: 'https://pk.linkedin.com/in/kaneez-rubab',
    publications: 8,
  },
]

const advisors = [
  { name: 'Dr. Sarah Ahmed', role: 'Senior Bioinformatician', affiliation: 'NIH / Former FAO' },
  { name: 'Prof. Michael Chen', role: 'AI in Healthcare', affiliation: 'Stanford University' },
  { name: 'Dr. Fatima Hassan', role: 'Clinical Genomics', affiliation: 'AKU Hospital' },
  { name: 'Prof. David Park', role: 'Computational Drug Discovery', affiliation: 'MIT' },
]

const incubators = [
  {
    name: 'National Incubation Center (NIC) Faisalabad',
    logo: 'NIC',
    description: 'Pakistan\'s premier technology incubator under the Ministry of IT & Telecom. Provides funding, mentorship, and industry connections.',
    since: '2024',
    website: 'https://nicfaisalabad.pk',
    color: 'from-blue-500 to-cyan-500',
    achievements: ['Ignite Fund Recipient', 'Top 10 Startup 2024', 'Demo Day Winner'],
  },
  {
    name: 'Beaconhouse International College',
    logo: 'BIC',
    description: 'Leading educational institution providing academic partnership, research facilities, and student pipeline for training programs.',
    since: '2024',
    website: 'https://beaconhouse.edu.pk',
    color: 'from-emerald-500 to-teal-500',
    achievements: ['Academic Partner', 'Lab Access', 'Curriculum Integration'],
  },
  {
    name: 'Ignite National Technology Fund',
    logo: 'IGNITE',
    description: 'Government funding body under Ministry of IT & Telecom supporting early-stage deep tech startups in Pakistan.',
    since: '2024',
    website: 'https://ignite.org.pk',
    color: 'from-purple-500 to-pink-500',
    achievements: ['Seed Funding', 'Govt. Recognition', 'Policy Support'],
  },
]

const achievements = [
  { year: '2024', title: 'Company Founded', description: 'Microinformatics (Pvt.) Ltd registered in Faisalabad, Pakistan', icon: Award },
  { year: '2024', title: 'NIC Faisalabad Incubation', description: 'Selected for National Incubation Center cohort with Ignite funding', icon: Building2 },
  { year: '2024', title: 'Beaconhouse Partnership', description: 'Academic partnership with Beaconhouse International College', icon: Users },
  { year: '2024', title: 'First Internship Cohort', description: 'Launched flagship 6-month research internship program', icon: FlaskConical },
  { year: '2025', title: '100+ Students Trained', description: 'Reached milestone of 100+ students across all programs', icon: BookOpen },
  { year: '2025', title: 'AI Center of Excellence', description: 'Established Pakistan AI Center of Excellence in Faisalabad', icon: Globe },
  { year: '2025', title: 'First Publications', description: 'Student research published in PubMed/Scopus indexed journals', icon: Star },
  { year: '2025', title: 'Diagnostic Device R&D', description: 'Initiated AI-driven diagnostic hardware development', icon: Zap },
  { year: '2026', title: 'International Collaborations', description: 'Partnerships with global research institutions and universities', icon: Target },
]

const values = [
  { title: 'Scientific Rigor', description: 'Every program is grounded in peer-reviewed methodology and reproducible computational practices.', icon: FlaskConical },
  { title: 'Innovation First', description: 'We push boundaries with cutting-edge AI, genomics, and healthcare technology.', icon: Zap },
  { title: 'Student Success', description: 'Our metric is your publication record, career advancement, and research impact.', icon: Target },
  { title: 'Open Science', description: 'Committed to open-source tools, data sharing, and collaborative research.', icon: Globe },
  { title: 'Ethical AI', description: 'Responsible AI development with focus on healthcare equity and patient privacy.', icon: Shield },
  { title: 'Community Impact', description: 'Building Pakistan\'s bioinformatics ecosystem, one researcher at a time.', icon: Heart },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-3 flex-wrap"
          >
            <Badge variant="gradient">
              <Users className="h-3 w-3 mr-1" />
              About Microinformatics
            </Badge>
            <Badge variant="success">Pvt. Ltd Company</Badge>
            <Badge variant="info">Est. 2024</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Bridging Life Sciences <br />
            <span className="gradient-text">with Advanced Computing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Microinformatics is a Bio-IT and Healthcare AI startup founded in August 2024 by Haseeb Raza. 
            We operate at the intersection of computational biology, artificial intelligence, and healthcare innovation.
          </motion.p>
        </div>
      </section>

      <section id="team" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="gradient" className="mb-4">Leadership Team</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Meet Our <span className="gradient-text">Founders</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Experienced researchers and entrepreneurs driving innovation in computational biology and healthcare AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Card variant="elevated" hover className="p-6 h-full">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                        <Badge variant="gradient" className="text-sm">{member.role}</Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">{member.bio}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.map((exp) => (
                          <Badge key={exp} variant="outline" className="text-xs">{exp}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" /> {member.publications} Publications
                        </span>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">Advisory Board</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {advisors.map((advisor, i) => (
                <motion.div
                  key={advisor.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card variant="outlined" className="p-6 text-center h-full">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                      <Users className="h-8 w-8 text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{advisor.name}</h4>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-1">{advisor.role}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{advisor.affiliation}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="incubators" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="gradient" className="mb-4">Institutional Backing</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our <span className="gradient-text">Incubators & Partners</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Supported by Pakistan's leading technology incubators and academic institutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {incubators.map((incubator, i) => (
              <motion.div
                key={incubator.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Card variant="elevated" hover className="p-6 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl opacity-10 rounded-full" style={{ background: `linear-gradient(135deg, ${incubator.color.split(' to ')[0]}, ${incubator.color.split(' to ')[1]})` }} />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white font-bold text-2xl" style={{ background: `linear-gradient(135deg, ${incubator.color.split(' to ')[0]}, ${incubator.color.split(' to ')[1]})` }}>
                      {incubator.logo}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{incubator.name}</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{incubator.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Partner since </span>
                      <span className="font-medium text-slate-900 dark:text-white">{incubator.since}</span>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {incubator.achievements.map((achievement) => (
                        <div key={achievement} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: `linear-gradient(135deg, ${incubator.color.split(' to ')[0]}, ${incubator.color.split(' to ')[1]})` }} />
                          {achievement}
                        </div>
                      ))}
                    </div>
                    
                    <a href={incubator.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      Visit Website <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="gradient" className="mb-4">Journey</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our <span className="gradient-text">Timeline</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Key milestones in our journey from startup to leading Bio-IT institution.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500" />
            
            <div className="space-y-12">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 z-10" style={{ background: `linear-gradient(135deg, #059669, #0d9488)` }} />
                  <div className="absolute left-6 top-6 text-xs font-medium text-emerald-600 dark:text-emerald-400">{achievement.year}</div>
                  
                  <Card variant="outlined" hover className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-500">
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{achievement.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300">{achievement.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="values" className="py-24 lg:py-32 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="gradient" className="mb-4">Core Values</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              What <span className="gradient-text">Drives Us</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Our principles guide every decision, program, and partnership we build.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card variant="outlined" hover className="p-6 h-full text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="gradient" className="mb-4 mx-auto" style={{ background: 'linear-gradient(135deg, #ffffff20, #ffffff10)' }}>
              Join Our Mission
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Be Part of the <span className="text-emerald-200">Bio-IT Revolution</span>
            </h2>
            <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Whether you're a student, researcher, or industry partner, there's a place for you 
              in our growing community of computational biologists and AI innovators.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" variant="secondary" asChild className="w-full sm:w-auto bg-white text-emerald-600 hover:bg-emerald-50">
                <a href="/courses">Explore Programs</a>
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="xl" variant="outline" asChild className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                <a href="/contact">Partner With Us</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}