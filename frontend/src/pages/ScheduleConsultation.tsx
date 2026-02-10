import Header from '../components/Header'
import Footer from '../components/Footer'

function ScheduleConsultation() {
  return (
    <div className="schedule-consultation-page">
      <Header />
      <div className="py-20 px-5 md:px-20 bg-white">
        <div className="max-w-container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brown mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
            Schedule Free Consultation
          </h1>
          <p className="text-base md:text-lg text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            This page is under construction.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ScheduleConsultation

