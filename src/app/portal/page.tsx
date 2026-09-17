'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Brain, FlaskConical, Award, Users, Code2, Download, Clock, CheckCircle, AlertCircle, BarChart2, FileText, Video, Settings, LogOut, Bell, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    title: 'NGS Data Analysis Pipeline',
    progress: 65,
    status: 'In Progress',
    nextLesson: 'Variant Annotation with VEP',
    lessonsCompleted: 13,
    totalLessons: 20,
    category: 'Genomics',
    color: 'from-emerald-500 to-teal-500',
    icon: FlaskConical,
  },
  {
    id: 2,
    title: 'RNA-seq Differential Expression',
    progress: 100,
    status: 'Completed',
    nextLesson: 'Course Completed',
    lessonsCompleted: 15,
    totalLessons: 15,
    category: 'Transcriptomics',
    color: 'from-blue-500 to-cyan-500',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'ML for Medical Diagnostics',
    progress: 30,
    status: 'In Progress',
    nextLesson: 'CNN Architectures for Medical Imaging',
    lessonsCompleted: 6,
    totalLessons: 20,
    category: 'AI/ML',
    color: 'from-purple-500 to-pink-500',
    icon: Brain,
  },
  {
    id: 4,
    title: 'Generative AI for Research',
    progress: 100,
    status: 'Completed',
    nextLesson: 'Certificate Available',
    lessonsCompleted: 10,
    totalLessons: 10,
    category: 'AI/ML',
    color: 'from-amber-500 to-orange-500',
    icon: Code2,
  },
]

const upcomingSessions = [
  { date: '2025-01-20', time: '10:00 AM PKT', title: 'Live: Variant Calling with GATK', course: 'NGS Data Analysis', type: 'live' },
  { date: '2025-01-22', time: '02:00 PM PKT', title: 'Office Hours: RNA-seq Q&A', course: 'RNA-seq Differential Expression', type: 'office-hours' },
  { date: '2025-01-25', time: '10:00 AM PKT', title: 'Workshop: Fine-tuning LLMs', course: 'Generative AI for Research', type: 'workshop' },
  { date: '2025-01-27', time: '03:00 PM PKT', title: 'Live: CNN for Medical Imaging', course: 'ML for Medical Diagnostics', type: 'live' },
]

const achievements = [
  { title: 'NGS Analysis Certified', date: '2025-01-15', icon: Award, color: 'text-emerald-500' },
  { title: 'RNA-seq Specialist', date: '2025-01-10', icon: BookOpen, color: 'text-blue-500' },
  { title: 'Generative AI Practitioner', date: '2025-01-05', icon: Code2, color: 'text-amber-500' },
  { title: 'First Publication Submitted', date: '2024-12-28', icon: FileText, color: 'text-purple-500' },
  { title: '100 Hours Learning', date: '2024-12-20', icon: Clock, color: 'text-teal-500' },
  { title: 'Community Helper', date: '2024-12-15', icon: Users, color: 'text-pink-500' },
]

const resources = [
  { title: 'NGS Pipeline Cheatsheet', type: 'PDF', size: '2.3 MB', category: 'Genomics', icon: FileText },
  { title: 'RNA-seq Workflow Diagram', type: 'PDF', size: '1.8 MB', category: 'Transcriptomics', icon: FileText },
  { title: 'Python for Bioinformatics', type: 'PDF', size: '1.5 MB', category: 'Programming', icon: FileText },
  { title: 'ML Deployment Checklist', type: 'PDF', size: '890 KB', category: 'AI/ML', icon: FileText },
  { title: 'Docking Protocol SOP', type: 'PDF', size: '3.1 MB', category: 'Drug Design', icon: FileText },
  { title: 'scRNA-seq Tutorial Notebook', type: 'Notebook', size: '4.2 MB', category: 'Transcriptomics', icon: Code2 },
  { title: 'Genomics Video - Module 1', type: 'Video', size: '1.2 GB', category: 'Genomics', icon: Video },
  { title: 'AI Healthcare Reading List', type: 'PDF', size: '560 KB', category: 'AI/ML', icon: FileText },
]

const notifications = [
  { id: 1, message: 'Your certificate for RNA-seq course is ready!', time: '2 hours ago', read: false, type: 'success' },
  { id: 2, message: 'New live session: Variant Calling with GATK on Jan 20', time: '5 hours ago', read: false, type: 'info' },
  { id: 3, message: 'Assignment graded: RNA-seq DE Analysis (A+)', time: '1 day ago', read: true, type: 'success' },
  { id: 4, message: 'Reminder: Office hours tomorrow at 2 PM PKT', time: '2 days ago', read: true, type: 'warning' },
  { id: 5, message: 'New resource added: ML Deployment Checklist', time: '3 days ago', read: true, type: 'info' },
]

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'schedule' | 'achievements' | 'resources' | 'settings'>('dashboard')
  const [showNotifications, setShowNotifications] = useState(false)

  const stats: { label: string; value: string; icon: any; color: string }[] = [
    { label: 'Courses Enrolled', value: '4', icon: BookOpen, color: 'text-emerald-500' },
    { label: 'Completed', value: '2', icon: CheckCircle, color: 'text-blue-500' },
    { label: 'In Progress', value: '2', icon: Clock, color: 'text-amber-500' },
    { label: 'Certificates', value: '2', icon: Award, color: 'text-purple-500' },
  ]

  const totalProgress = Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/portal" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">Microinformatics Portal</span>
              </Link>
              <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
                  { id: 'courses', label: 'My Courses', icon: BookOpen },
                  { id: 'schedule', label: 'Schedule', icon: Clock },
                  { id: 'achievements', label: 'Achievements', icon: Award },
                  { id: 'resources', label: 'Resources', icon: FileText },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 dark:text-white">Notifications</h4>
                      <Button variant="ghost" size="sm" onClick={() => {}}>Mark all read</Button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
                          <p className="text-sm text-slate-900 dark:text-white">{notif.message}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
                      <Button variant="ghost" size="sm" className="w-full">View All</Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-medium">
                MA
              </div>
              <Button variant="ghost" size="sm" onClick={() => {}}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {activeTab === 'dashboard' && (
            <DashboardView stats={stats} totalProgress={totalProgress} courses={courses} upcomingSessions={upcomingSessions} achievements={achievements} />
          )}
          {activeTab === 'courses' && <CoursesView courses={courses} />}
          {activeTab === 'schedule' && <ScheduleView sessions={upcomingSessions} />}
          {activeTab === 'achievements' && <AchievementsView achievements={achievements} />}
          {activeTab === 'resources' && <ResourcesView resources={resources} />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  )
}

function DashboardView({ stats, totalProgress, courses, upcomingSessions, achievements }: any) {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Maria!</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Here's your learning progress overview</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{totalProgress}%</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">Overall Progress</p>
              <div className="w-40 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${totalProgress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat: { label: string; value: string; icon: any; color: string }, i: number) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <Card variant="elevated" className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}10` }}>
                    <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-2">
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Continue Learning</CardTitle>
              <Button variant="ghost" size="sm" asChild><Link href="/portal?tab=courses">View All</Link></Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {courses.slice(0, 3).map((course: any, i: number) => (
                  <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <CourseProgressCard course={course} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {upcomingSessions.slice(0, 3).map((session: any, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <SessionCard session={session} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement: any, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <AchievementItem achievement={achievement} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Browse Courses', desc: 'Explore new programs', icon: BookOpen, href: '/courses', color: 'from-emerald-500 to-teal-500' },
                { title: 'AI Lab', desc: 'Access GPU compute', icon: Brain, href: '/portal/ai-lab', color: 'from-blue-500 to-cyan-500' },
                { title: 'Research Datasets', desc: 'Download curated data', icon: FlaskConical, href: '/portal/datasets', color: 'from-purple-500 to-pink-500' },
                { title: 'Community Forum', desc: 'Connect with peers', icon: Users, href: '/portal/forum', color: 'from-amber-500 to-orange-500' },
              ].map((action, i) => (
                <motion.div key={action.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <Link href={action.href} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-colors text-left group block">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `linear-gradient(135deg, ${action.color.split(' to ')[0]}, ${action.color.split(' to ')[1]})` }}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="font-medium text-slate-900 dark:text-white">{action.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{action.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function CoursesView({ courses }: any) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Courses</h1>
        <p className="text-slate-600 dark:text-slate-300">Track your progress and continue learning</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any, i: number) => (
          <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ScheduleView({ sessions }: any) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Schedule</h1>
        <p className="text-slate-600 dark:text-slate-300">Upcoming live sessions and office hours</p>
      </motion.div>

      <div className="space-y-4">
        {sessions.map((session: any, i: number) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
            <SessionCard session={session} detailed />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function AchievementsView({ achievements }: any) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Achievements</h1>
        <p className="text-slate-600 dark:text-slate-300">Your learning milestones and certificates</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement: any, i: number) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
            <AchievementCard achievement={achievement} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ResourcesView({ resources }: any) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Resources & Downloads</h1>
            <p className="text-slate-600 dark:text-slate-300">Access course materials, cheatsheets, and datasets</p>
          </div>
          <Input placeholder="Search resources..." className="w-64" />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource: any, i: number) => (
          <motion.div key={resource.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <ResourceCard resource={resource} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-300">Manage your account and preferences</p>
      </motion.div>

      <Card variant="elevated" className="p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Profile</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue="Maria Ahmed" />
          <Input label="Email" type="email" defaultValue="maria@university.edu" />
          <Input label="University / Organization" defaultValue="Beaconhouse International College" />
          <Input label="Research Interest" defaultValue="Computational Biology, AMR" />
        </div>
      </Card>

      <Card variant="elevated" className="p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Notifications</h2>
        <div className="space-y-4">
          {[
            { title: 'Email Notifications', desc: 'Course updates, assignments, live sessions' },
            { title: 'Push Notifications', desc: 'Real-time alerts for live sessions' },
            { title: 'Weekly Digest', desc: 'Summary of progress and upcoming events' },
            { title: 'Achievement Alerts', desc: 'Celebrate your milestones' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
            </div>
          ))}
        </div>
      </Card>

      <Card variant="elevated" className="p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Danger Zone</h2>
        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
          Delete Account
        </Button>
      </Card>
    </div>
  )
}

function CourseProgressCard({ course }: any) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${course.color.split(' to ')[0]}, ${course.color.split(' to ')[1]})` }}>
          <course.icon className="h-5 w-5 text-white" />
        </div>
        <Badge variant={course.status === 'Completed' ? 'success' : 'warning'} className="text-xs">{course.status}</Badge>
      </div>
      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{course.title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{course.lessonsCompleted}/{course.totalLessons} lessons • {course.category}</p>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${course.progress}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${course.color.split(' to ')[0]}, ${course.color.split(' to ')[1]})` }}
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">{course.progress}% complete</span>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/courses/${course.id}`}>Continue</Link>
        </Button>
      </div>
    </div>
  )
}

function CourseCard({ course }: any) {
  return (
    <Card variant="elevated" hover className="h-full flex flex-col">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${course.color.split(' to ')[0]}, ${course.color.split(' to ')[1]})` }}>
        <course.icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className="text-xs">{course.category}</Badge>
        <Badge variant={course.status === 'Completed' ? 'success' : 'warning'} className="text-xs">{course.status}</Badge>
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">{course.title}</h3>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${course.progress}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${course.color.split(' to ')[0]}, ${course.color.split(' to ')[1]})` }}
        />
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">{course.lessonsCompleted}/{course.totalLessons} lessons</div>
      <Button variant="gradient" size="sm" className="w-full" asChild>
        <Link href={`/courses/${course.id}`}>{course.status === 'Completed' ? 'Review' : 'Continue Learning'}</Link>
      </Button>
    </Card>
  )
}

function SessionCard({ session, detailed }: { session: any; detailed?: boolean }) {
  const typeColors: Record<string, string> = {
    live: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    'office-hours': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    workshop: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  }

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: typeColors[session.type] }}>
        <Clock className="h-6 w-6" style={{ color: typeColors[session.type].split(' ')[1] }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeColors[session.type]}`}>{session.type.replace('-', ' ')}</span>
          <Badge variant="outline" className="text-xs">{session.course}</Badge>
        </div>
        <h4 className="font-medium text-slate-900 dark:text-white">{session.title}</h4>
        {detailed && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Zoom link available 15 mins before session</p>}
      </div>
      <div className="text-right">
        <p className="font-medium text-slate-900 dark:text-white">{session.date}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{session.time}</p>
      </div>
      <Button variant="outline" size="sm">Join</Button>
    </div>
  )
}

function AchievementItem({ achievement }: any) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${achievement.color}10` }}>
        <achievement.icon className="h-4 w-4" style={{ color: achievement.color }} />
      </div>
      <div>
        <p className="font-medium text-slate-900 dark:text-white text-sm">{achievement.title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{achievement.date}</p>
      </div>
    </div>
  )
}

function AchievementCard({ achievement }: any) {
  return (
    <Card variant="outlined" hover className="p-5 text-center">
      <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: `${achievement.color}10` }}>
        <achievement.icon className="h-7 w-7" style={{ color: achievement.color }} />
      </div>
      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{achievement.title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400">Earned {achievement.date}</p>
      <Button variant="ghost" size="sm" className="mt-3">View Certificate</Button>
    </Card>
  )
}

function ResourceCard({ resource }: any) {
  return (
    <Card variant="outlined" hover className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <resource.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <Badge variant="outline" className="text-xs">{resource.type}</Badge>
      </div>
      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{resource.title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{resource.category}</p>
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{resource.size}</span>
        <Button variant="ghost" size="sm" className="p-1"><Download className="h-4 w-4" /></Button>
      </div>
    </Card>
  )
}