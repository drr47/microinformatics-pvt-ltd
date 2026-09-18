'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock, Send, Loader2, CheckCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

const contactInfo = [
  { icon: MapPin, title: 'Visit Us', lines: ['Beaconhouse International College', 'Sargodha Road, Faisalabad, Pakistan'] },
  { icon: Mail, title: 'Email Us', lines: ['info@microinformatics.pk', 'admissions@microinformatics.pk'] },
  { icon: Phone, title: 'Call Us', lines: ['+92 300 123 4567', '+92 41 111 222 333'] },
  { icon: Clock, title: 'Office Hours', lines: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'] },
]

const faqs = [
  { q: 'What are the prerequisites for your courses?', a: 'Prerequisites vary by course. Beginner courses require basic biology and Python knowledge, while advanced courses require prior experience in NGS analysis, ML, or structural biology.' },
  { q: 'Are courses online, offline, or hybrid?', a: 'We offer all three formats. Most courses are hybrid (live online plus optional in-person in Faisalabad), and some advanced courses are fully online.' },
  { q: 'Do you provide certificates?', a: 'Yes. Every completed course comes with a verified digital certificate, and internship graduates receive a certificate detailing their project and publication status.' },
  { q: 'Can international students apply?', a: 'Absolutely. Our online and hybrid programs welcome international students, and payment can be made via international transfer.' },
  { q: 'How do I partner with the AI Center of Excellence?', a: 'We offer research collaborations, industry innovation sprints, student projects and technology transfer. Contact research@microinformatics.pk to discuss.' },
]

type FormStatus = 'idle' | 'submitting' | 'success'

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const next: Record<string, string> = {}
    if (!formData.name.trim()) next.name = 'Name is required'
    if (!formData.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Invalid email format'
    if (!formData.subject) next.subject = 'Subject is required'
    if (!formData.message.trim()) next.message = 'Message is required'
    else if (formData.message.trim().length < 20) next.message = 'Message must be at least 20 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setFormStatus('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setFormStatus('success')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setFormStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'admissions', label: 'Course Admissions' },
    { value: 'internship', label: 'Internship Program' },
    { value: 'partnership', label: 'Research Partnership' },
    { value: 'ai-center', label: 'AI Center Collaboration' },
    { value: 'other', label: 'Other' },
  ]

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
            <Badge variant="gradient" className="mb-4">Get in Touch</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Let&apos;s Start a <span className="gradient-text">Conversation</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Questions about our programs, collaborations, or support? Our team responds within 24 hours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card variant="elevated" hover className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-3">{info.title}</h3>
                    <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                      {info.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={faq.q}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <details className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                      <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-medium text-slate-900 dark:text-white">
                        {faq.q}
                        <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{faq.a}</p>
                    </details>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">We&apos;ll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  {formStatus === 'success' ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                      <Button variant="outline" onClick={() => setFormStatus('idle')}>Send Another Message</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input name="name" label="Full Name" placeholder="Your name" value={formData.name} onChange={handleChange} error={errors.name} required />
                        <Input name="email" label="Email Address" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} error={errors.email} required />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input name="phone" label="Phone (Optional)" placeholder="+92 XXX XXXXXXX" value={formData.phone} onChange={handleChange} />
                        <Select name="subject" label="Subject" options={subjectOptions} value={formData.subject} onChange={handleChange} error={errors.subject} required />
                      </div>
                      <Textarea name="message" label="Message" placeholder="Tell us about your goals, questions, or project ideas..." value={formData.message} onChange={handleChange} error={errors.message} required rows={5} />
                      <Button type="submit" variant="gradient" size="lg" className="w-full" isLoading={formStatus === 'submitting'}>
                        {formStatus === 'submitting' ? (<><Loader2 className="h-5 w-5" />Sending...</>) : (<>Send Message<Send className="h-5 w-5 ml-2" /></>)}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
