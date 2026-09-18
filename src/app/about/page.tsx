'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const team = [
  {
    name: 'Haseeb Raza',
    role: 'CEO & Founder',
    bio: 'Microbiologist and data scientist. Published researcher in computational biology, antimicrobial resistance and novel gene prediction.',
    linkedin: 'https://pk.linkedin.com/in/haseeb-raza-344947297',
    publications: 12,
  },
  {
    name: 'Kaneez Rubab',
    role: 'Co-Founder & Research Lead',
    bio: 'Computational biology researcher specializing in multiomics, ribosome profiling and translational regulation.',
    linkedin: 'https://pk.linkedin.com/in/kaneez-rubab',
    publications: 8,
  },
]

const incubators = [
  { name: 'National Incubation Center (NIC) Faisalabad', description: "Pakistan's premier technology incubator under the Ministry of IT & Telecom.", since: '2024', accent: 'from-blue-500 to-cyan-500' },
  { name: 'Beaconhouse International College', description: 'Academic partner providing research facilities and a student pipeline for training programs.', since: '2024', accent: 'from-emerald-500 to-teal-500' },
  { name: 'Ignite National Technology Fund', description: 'Government funding body supporting early-stage deep tech startups in Pakistan.', since: '2024', accent: 'from-purple-500 to-pink-500' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden">
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <Badge variant="gradient" className="mb-4">About Microinformatics</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Bridging Life Sciences <span className="gradient-text">with Advanced Computing</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              A Bio-IT and Healthcare AI startup founded in August 2024, operating at the intersection of computational biology, AI and healthcare innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="elevated" hover className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-white">
                          {member.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-3">{member.role}</p>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{member.bio}</p>
                        <div className="flex items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {member.publications} Publications</span>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">LinkedIn</a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge variant="gradient" className="mb-4">Institutional Backing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Incubators & Partners</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {incubators.map((incubator, i) => (
              <motion.div
                key={incubator.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="elevated" hover className="h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${incubator.accent} mb-4`} />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{incubator.name}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{incubator.description}</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Partner since {incubator.since}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/contact">Work With Us <ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
