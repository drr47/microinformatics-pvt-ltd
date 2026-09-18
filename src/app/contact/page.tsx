'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock, Send, Loader2, CheckCircle, AlertCircle, ChevronRight, MessageSquare, Calendar, User, Building2, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      'Beaconhouse International College',
      'Sargodha Road, Faisalabad, Pakistan',
    ],
    secondary: 'National Incubation Center (NIC) Faisalabad',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      'info@microinformatics.pk',
      'admissions@microinformatics.pk',
      'research@microinformatics.pk',
    ],
    secondary: 'Typically respond within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: [
      '+92 300 123 4567',
      '+92 41 111 222 333',
    ],
    secondary: 'Mon-Fri: 9:00 AM - 6:00 PM PKT',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: [
      'Monday - Friday: 9:00 AM - 6:00 PM',
      'Saturday: 10:00 AM - 2:00 PM',
    ],
    secondary: 'Closed on Sundays & Public Holidays',
  },
]

const faqs = [
  {
    q: 'What are the prerequisites for your courses?',
    a: 'Prerequisites vary by course. Beginner courses require basic biology and Python knowledge. Advanced courses require prior experience in NGS analysis, ML, or structural biology. Check individual course pages for details.',
  },
  {
    q: 'Are courses online, offline, or hybrid?',
    a: 'We offer all three formats. Most courses are hybrid (live online + optional in-person at Faisalabad). Some advanced courses are fully online. The internship program is hybrid with mandatory in-person components.',
  },
  {
    q: 'Do you provide certificates?',
    a: 'Yes, all completed courses come with a verified digital certificate. Internship graduates receive a comprehensive certificate with project details and publication status.',
  },
  {
    q: 'Can international students apply?',
    a: 'Absolutely! Our online and hybrid programs welcome international students. Payment can be made via international transfer. Time zones are accommodated for live sessions.',
  },
  {
    q: 'What is the application process?',
    a: 'Fill out the application form on our website. Our team reviews applications within 3-5 business days. Shortlisted candidates may have a brief interview. Accepted students receive enrollment instructions.',
  },
  {
    q: 'Do you offer scholarships or financial aid?',
    a: 'We offer merit-based scholarships (up to 50% off) for outstanding students. Need-based financial aid is available for Pakistani students. Contact admissions for details.',
  },
  {
    q: 'What makes your internship program unique?',
    a: 'Our 6-month internship is publication-driven - students work on real research projects aiming for PubMed/Scopus publications. Includes 1-on-1 mentorship, compute access, and career guidance.',
  },
  {
    q: 'How do I partner with the AI Center of Excellence?',
    a: 'We offer multiple partnership models: research collaborations, industry innovation sprints, student projects, and technology transfer. Contact research@microinformatics.pk to discuss.',
  },
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    courseInterest: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setFormStatus('submitting')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In production, replace with actual API call
    console.log('Form submitted:', formData)
    
    setFormStatus('success')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', courseInterest: '' })
    
    setTimeout(() => setFormStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'admissions', label: 'Course Admissions' },
    { value: 'internship', label: 'Internship Program' },
    { value: 'partnership', label: 'Research Partnership' },
    { value: 'ai-center', label: 'AI Center Collaboration' },
    { value: 'media', label: 'Media & Press' },
    { value: 'careers', label: 'Career Opportunities' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-3 flex-wrap"
          >
            <Badge variant="gradient">
              <MessageSquare className="h-3 w-3 mr-1" />
              Get in Touch
            </Badge>
            <Badge variant="success">24hr Response</Badge>
            <Badge variant="info">Multiple Channels</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Let\'s Start a <span className="gradient-text">Conversation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Have questions about our programs, want to collaborate, or need support? 
            Our team is here to help. Reach out through any channel below.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="elevated" hover className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">{info.title}</h3>
                  <div className="space-y-1 text-slate-600 dark:text-slate-300">
                    {info.details.map((detail, j) => (
                      <p key={j} className="text-sm">{detail}</p>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{info.secondary}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Apply for a Course', desc: 'Start your application today', icon: User, href: '/courses#apply', color: 'from-emerald-500 to-teal-500' },
                    { title: 'Schedule a Call', desc: 'Book a 15-min consultation', icon: Calendar, href: '/contact#call', color: 'from-blue-500 to-cyan-500' },
                    { title: 'Partner With Us', desc: 'Research or industry collaboration', icon: Building2, href: '/contact#partner', color: 'from-purple-500 to-pink-500' },
                    { title: 'Visit Our Campus', desc: 'Tour NIC Faisalabad or BIC', icon: MapPin, href: '/contact#visit', color: 'from-amber-500 to-orange-500' },
                  ].map((action, i) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Button variant="outline" className="w-full justify-start gap-4 p-4 h-auto text-left hover:bg-gradient-to-r" style={{ background: `linear-gradient(135deg, ${action.color.split(' to ')[0]}10, ${action.color.split(' to ')[1]}10)` }} asChild>
                        <a href={action.href}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${action.color.split(' to ')[0]}, ${action.color.split(' to ')[1]})` }}>
                            <action.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{action.title}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{action.desc}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400 ml-auto" />
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 lg:mt-0"
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
                      <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
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
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card variant="elevated" className="p-6 h-full">
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <p className="text-slate-600 dark:text-slate-300">We\'ll get back to you within 24 hours</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {formStatus === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                        <Button variant="outline" onClick={() => setFormStatus('idle')}>
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input
                            name="name"
                            label="Full Name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            required
                          />
                          <Input
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input
                            name="phone"
                            label="Phone (Optional)"
                            placeholder="+92 XXX XXXXXXX"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          <Select
                            name="subject"
                            label="Subject"
                            options={subjectOptions}
                            value={formData.subject}
                            onChange={handleChange}
                            error={errors.subject}
                            required
                          />
                        </div>
                        <Input
                          name="courseInterest"
                          label="Course of Interest (Optional)"
                          placeholder="e.g., NGS Analysis, ML Diagnostics, Internship"
                          value={formData.courseInterest}
                          onChange={handleChange}
                        />
                        <Textarea
                          name="message"
                          label="Message"
                          placeholder="Tell us about your goals, questions, or project ideas..."
                          value={formData.message}
                          onChange={handleChange}
                          error={errors.message}
                          required
                          rows={5}
                        />
                        <Button
                          type="submit"
                          variant="gradient"
                          size="lg"
                          className="w-full"
                          isLoading={formStatus === 'submitting'}
                        >
                          {formStatus === 'submitting' ? (
                            <>
                              <Loader2 className="h-5 w-5" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="h-5 w-5 ml-2" />
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                          By submitting, you agree to our Privacy Policy and Terms of Service.
                        </p>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
              Visit Us In Person
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Campus Locations in <span className="text-emerald-200">Faisalabad</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card variant="glass" className="p-6 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white">Beaconhouse International College</h3>
                </div>
                <p className="text-emerald-100 text-sm">Sargodha Road, Faisalabad</p>
                <p className="text-emerald-200 text-sm mt-1">Main campus - Training labs & lectures</p>
              </Card>
              <Card variant="glass" className="p-6 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                    <Rocket className="h-5 w-5 text-teal-400" />
                  </div>
                  <h3 className="font-bold text-white">National Incubation Center</h3>
                </div>
                <p className="text-teal-100 text-sm">Faisalabad Campus</p>
                <p className="text-teal-200 text-sm mt-1">Startup hub - Research & innovation</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}