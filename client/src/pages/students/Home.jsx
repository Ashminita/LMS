import React from 'react'
import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CoursesSection from '../../components/students/CoursesSection'
import CallToAction from '../../components/students/CallToAction'
import Footer from '../../components/students/Footer'

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center bg-[#0E1116] text-white min-h-screen">
  <Hero />
  <Companies />
  <CoursesSection />
  <CallToAction />
  <Footer />
</div>

  )
}

export default Home