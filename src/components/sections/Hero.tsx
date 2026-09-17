'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Award, FlaskConical, Cpu, Globe, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DNAHelix } from '@/components/visualizations/DNAHelix'

const stats = [
  { value: '100+', label: 'Students Trained', icon: Users },
  { value: '15+', label: 'Research Publications', icon: FlaskConical },
  { value: '3', label: 'Incubation Centers', icon: Award },
  { value: '5+', label: 'AI Models Deployed', icon: Cpu },
]

const trustBadges = [
  'NIC Faisalabad Incubated',
  'Ignite Funded',
  'Beaconhouse Partner',
  'Govt. Recognized',
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-teal-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow animation-delay-1000" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse-glow animation-delay-2000" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center justify-center lg:justify-start gap-3 flex-wrap"
            >
              <Badge variant="gradient" className="animate-in slide-up-4">
                <Sparkles className="h-3 w-3 mr-1" />
                Bio-IT & Healthcare AI Startup
              </Badge>
              <Badge variant="success" className="animate-in slide-up-4 animation-delay-200">
                Incubated at NIC Faisalabad
              </Badge>
              <Badge variant="info" className="animate-in slide-up-4 animation-delay-300">
                Ignite Funded
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              Bridging Life Sciences
              <br />
              <span className="gradient-text">with Advanced Computing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Microinformatics empowers the next generation of bioinformaticians, AI researchers, 
              and healthcare innovators through cutting-edge training, research, and technology development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <Button size="xl" variant="gradient" asChild className="group w-full sm:w-auto">
                <Link href="/courses#apply">Explore Courses & Apply</Link>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="xl" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/genomics">View Interactive Genomics</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 dark:text-slate-400"
            >
              {trustBadges.map((badge, i) => (
                <span key={badge} className="flex items-center gap-1.5 animate-in slide-up-4" style={{ animationDelay: `${100 + i * 100}ms` }}>
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-200/50 dark:border-emerald-800/50 bg-white dark:bg-slate-800">
              <div className="aspect-video relative">
                <DNAHelix basePairs={35} autoRotate={true} showLabels={false} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent">
                <div className="flex items-center justify-center gap-6 text-white text-sm">
                  <span className="flex items-center gap-1.5">
                    <FlaskConical className="h-4 w-4 text-emerald-400" />
                    Genomics & Multiomics
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-teal-400" />
                    AI-Powered Analysis
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-cyan-400" />
                    Real-time 3D Visualization
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 lg:-left-8 w-40 h-40 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl opacity-20 blur-2xl animate-float" />
            <div className="absolute -top-6 -right-6 lg:-right-8 w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl opacity-20 blur-2xl animate-float animation-delay-1000" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float"
      >
        <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}

export function Stats() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center lg:text-left p-6"
            >
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    title: 'Computational Biology & Bioinformatics',
    description: 'Comprehensive training in NGS analysis, multiomics (genomics, transcriptomics, metagenomics), computer-aided drug design, and cheminformatics.',
    icon: FlaskConical,
    href: '/genomics',
    color: 'from-emerald-500 to-teal-500',
    features: ['NGS Data Analysis', 'Multiomics', 'CADD', 'Cheminformatics', 'Biopython & R'],
  },
  {
    title: 'Artificial Intelligence & ML',
    description: 'Cutting-edge AI/ML training focused on healthcare diagnostics, generative AI, prompt engineering, and machine learning for biological data.',
    icon: Cpu,
    href: '/ai-ml',
    color: 'from-blue-500 to-cyan-500',
    features: ['ML for Diagnostics', 'Generative AI', 'Prompt Engineering', 'Custom Models', 'Pathogen ID'],
  },
  {
    title: 'AI Center of Excellence',
    description: 'Pakistan\'s flagship center for medical AI research, industrial collaborations, drug discovery simulations, and structural biology modeling.',
    icon: Globe,
    href: '/ai-center',
    color: 'from-purple-500 to-pink-500',
    features: ['Medical AI Research', 'Drug Discovery', 'Structural Biology', 'Industry Partnerships', 'Student Programs'],
  },
  {
    title: 'AI-Driven Business & Marketing',
    description: 'Workshops on AI-powered media, digital marketing automation, content creation with generative AI, and self-branding for professionals.',
    icon: Sparkles,
    href: '/courses#business',
    color: 'from-amber-500 to-orange-500',
    features: ['Digital Marketing', 'Content Automation', 'Self Branding', 'Startup Growth', 'Career Strategy'],
  },
]

export function Services() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="gradient" className="mb-4">Our Core Divisions</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Specialized Programs for <span className="gradient-text">Every Career Stage</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            From undergraduate students to industry professionals, our four divisions cover the complete 
            spectrum of bioinformatics, AI, and digital innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card variant="elevated" hover className="h-full group relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${service.color.split(' to ')[0]}, ${service.color.split(' to ')[1]})` }}
                />
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br mb-4 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${service.color.split(' to ')[0]}, ${service.color.split(' to ')[1]})` }}
                  >
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 flex-1">{service.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, j) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" asChild className="w-full group">
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const highlights = [
  {
    title: 'Publication-Driven Internships',
    description: 'Students work on live research projects aiming for co-authorship on PubMed/Scopus indexed papers.',
    icon: FlaskConical,
  },
  {
    title: 'Hybrid Learning Format',
    description: 'Programs available both online (live Zoom sessions) and offline at Faisalabad facilities.',
    icon: Globe,
  },
  {
    title: '100+ Alumni Network',
    description: 'Over 100 undergraduates trained, transitioning from textbooks to publishing research.',
    icon: Users,
  },
  {
    title: 'AI Diagnostic Hardware',
    description: 'Developing AI-driven diagnostic devices for rapid pathogen identification and disease analysis.',
    icon: Cpu,
  },
]

export function Highlights() {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="gradient" className="mb-4">Why Choose Microinformatics</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Unique Advantages for <span className="gradient-text">Your Growth</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, i) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card variant="outlined" hover className="h-full p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <highlight.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{highlight.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{highlight.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="gradient" className="mb-4 mx-auto" style={{ background: 'linear-gradient(135deg, #ffffff20, #ffffff10)' }}>
            Ready to Start Your Journey?
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Join the <span className="text-emerald-200">Bio-IT Revolution</span>
          </h2>
          <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Whether you're a student, researcher, or professional, Microinformatics has the programs, 
            mentorship, and community to accelerate your career in computational biology and AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="secondary" asChild className="w-full sm:w-auto bg-white text-emerald-600 hover:bg-emerald-50">
              <Link href="/courses#apply">Apply for Internship</Link>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="xl" variant="outline" asChild className="w-full sm:w-auto border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}