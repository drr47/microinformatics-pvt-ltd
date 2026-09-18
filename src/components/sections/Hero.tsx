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
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
              <Badge variant="gradient"><Sparkles className="h-3 w-3 mr-1" />Bio-IT & Healthcare AI Startup</Badge>
              <Badge variant="success">Incubated at NIC Faisalabad</Badge>
              <Badge variant="info">Ignite Funded</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Bridging Life Sciences <br />
              <span className="gradient-text">with Advanced Computing</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
              Microinformatics empowers the next generation of bioinformaticians, AI researchers, and healthcare innovators through cutting-edge training, research, and technology development.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="xl" variant="gradient" asChild className="group w-full sm:w-auto"><Link href="/courses#apply">Explore Courses <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" /></Link></Button>
              <Button size="xl" variant="outline" asChild className="w-full sm:w-auto"><Link href="/genomics">View Interactive Genomics</Link></Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 dark:text-slate-400">
              {trustBadges.map((badge, i) => (<span key={badge} className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-500" />{badge}</span>))}
            </motion.div>
          </div>
          <div className="flex justify-center"><DNAHelix basePairs={30} /></div>
        </div>
      </div>
    </section>
  )
}

export function Stats() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center p-6">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"><stat.icon className="h-6 w-6 text-white" /></div>
                <div><div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div><div className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</div></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const services = [
  { title: 'Computational Biology & Bioinformatics', description: 'NGS analysis, multiomics, CADD, and cheminformatics.', icon: FlaskConical, color: 'from-emerald-500 to-teal-500', href: '/genomics', features: ['WGS/WES', 'Multiomics', 'CADD', 'Cheminformatics'] },
  { title: 'AI/ML for Healthcare', description: 'AI diagnostics, generative AI, prompt engineering for biology.', icon: Cpu, href: '/ai-ml', color: 'from-blue-500 to-cyan-500', features: ['ML Diagnostics', 'Gen AI', 'Prompt Eng'] },
  { title: 'AI Center of Excellence', description: 'Pakistan flagship center for medical AI research and drug discovery.', icon: Globe, href: '/ai-center', color: 'from-purple-500 to-pink-500', features: ['Research', 'Drug Discovery', 'Partnerships'] },
]

export function Services() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="gradient" className="mb-4">Our Core Divisions</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Specialized Programs <span className="gradient-text">For Every Career</span></h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">From undergraduate students to industry professionals, our divisions cover the complete spectrum of bioinformatics, AI, and digital innovation.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <Card variant="elevated" hover className="h-full group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${service.color.split(' to ')[0]}, ${service.color.split(' to ')[1]})` }} />
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br mb-4 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${service.color.split(' to ')[0]}, ${service.color.split(' to ')[1]})` }}><service.icon className="h-6 w-6 text-white" /></div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 flex-1">{service.description}</p>
                  <ul className="space-y-1 mb-4">{service.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="h-3 w-3 text-emerald-500" />{f}</li>)}</ul>
                  <Button variant="outline" asChild className="w-full"><Link href={service.href}>Learn More <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
                </CardContent>
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
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge variant="gradient" className="mb-4 mx-auto" style={{ background: 'linear-gradient(135deg, #ffffff20, #ffffff10)' }}>Ready to Start Your Journey?</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Join the <span className="text-emerald-200">Bio-IT Revolution</span></h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">Whether you're a student, researcher, or professional, Microinformatics has the programs, mentorship, and community to accelerate your career.</p>
          <Button size="xl" variant="gradient" asChild className="w-full sm:w-auto"><Link href="/courses#apply">Apply Now</Link></Button>
        </motion.div>
      </div>
    </section>
  )
}
