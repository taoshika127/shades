import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function AboutMe() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const bodyStyle = { fontFamily: 'Montserrat, sans-serif' as const }
  const headingStyle = { fontFamily: 'Fjalla One, sans-serif' as const }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-10 md:py-16 px-5 md:px-20 bg-gray-100">
        <div className="max-w-container mx-auto">
          <header className="mb-8 md:mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-brown mb-3" style={headingStyle}>
              About Me
            </h1>
          </header>

          <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-10">
            <div className="space-y-7 text-brown max-w-3xl mx-auto" style={bodyStyle}>
              <section className="space-y-4">
                <p className="m-0 leading-relaxed">
                  Hi, I’m Becky (Sijia) Tao — founder of Pacific Light Shades.
                </p>
                <p className="m-0 leading-relaxed">
                  My background started in design and the built environment. I earned my Bachelor of Science Degree in Urban Planning and Design from the University of Tokyo back in 2012, where I first became interested in how people interact with space, and how to design spaces that meet both functional and aesthetic needs. I later continued my studies at Stanford University in Civil & Environmental Engineering during 2012 - 2014, focusing on Sustainable Design and Construction Management.
                </p>
                <p className="m-0 leading-relaxed">
                  After graduation, I worked at Google as an operations lead, and later at a startup serving the building industry. Much of my work involved large-scale commercial projects, where I collaborated closely with architects, structural engineers, general contractors, and developers. Through this experience, I developed a strong foundation in coordination, scheduling, cost estimation, and the overall construction process. Along the way, I also explored frontend engineering—designing and building websites and tools—combining my technical skills with my eye for design.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-brown" style={headingStyle}>
                  Why I Started This Business
                </h2>
                <p className="m-0 leading-relaxed mb-3">
                  Since 2021, I have gone through two personal home rebuilding and remodeling projects in Menlo Park and Palo Alto.
                </p>
                <p className="m-0 leading-relaxed mb-3">
                  I saw firsthand how window treatments are often left until the very end of a project—when budgets are already tight and options feel limited. Many homeowners either settle for ready-made solutions that don’t quite fit their space, or face very high costs when exploring custom options.
                </p>
                <p className="m-0 leading-relaxed mb-2">I wanted to create something better:</p>
                <ul className="list-disc pl-6 m-0 space-y-2 leading-relaxed">
                  <li>High-quality, fully customized window treatments</li>
                  <li>More approachable pricing through direct factory sourcing</li>
                  <li>A seamless, end-to-end experience without showroom overhead</li>
                </ul>
                <p className="m-0 leading-relaxed mt-4">
                  With my background in the building industry and experience working across design, construction, and operations, I was able to build a business model that leverages both my expertise and network. By integrating technology and AI tools into my workflow—ranging from design support and scheduling to cost estimation and marketing—I’m able to operate efficiently without the traditional overhead.
                </p>
                <p className="m-0 leading-relaxed mt-3">
                  This allows me to reduce unnecessary costs such as showroom expenses, excessive marketing spend, and administrative inefficiencies, and pass those savings directly to my clients—offering premium-quality window treatments at a more accessible price point compared to traditional retailers.
                </p>
                <p className="m-0 leading-relaxed mt-3">
                  At the same time, through my relationships with trusted general contractors and industry partners, I’m able to provide reliable installation and ongoing support, ensuring a smooth and dependable experience from start to finish.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-brown" style={headingStyle}>
                  What I Care About
                </h2>
                <p className="m-0 leading-relaxed mb-3">I approach every project as if it were my own home.</p>
                <p className="m-0 leading-relaxed mb-3">
                  A well-designed, organized home fosters a sense of control, comfort, and calm, while poor design can create unnecessary stress and disconnection. I’ve always been interested in how people interact with space—how we shape it to meet our needs, how it supports both connection and privacy, and how we experience it through light, texture, and atmosphere.
                </p>
                <p className="m-0 leading-relaxed mb-3">
                  Window treatments play a quiet but powerful role in this. They influence how light enters a space, how private or open a home feels, and how comfortable it is throughout the day.
                </p>
                <p className="m-0 leading-relaxed mb-3">
                  From an aesthetic perspective, they should align seamlessly with the overall design of the home. From a functional standpoint, they need to support light filtering, blackout, privacy, insulation, and energy efficiency.
                </p>
                <p className="m-0 leading-relaxed mb-3">
                  I also enjoy solving more complex window conditions—whether it’s high ceilings, angled or arched windows, Eichler homes, or other unique layouts—where thoughtful customization can make a meaningful difference.
                </p>
                <p className="m-0 leading-relaxed">
                  My goal is to create solutions that not only look right, but feel right—helping homeowners live more comfortably in their space.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-brown" style={headingStyle}>
                  🤍 Today
                </h2>
                <p className="m-0 leading-relaxed mb-3">
                  Today, Pacific Light Shades has served dozens of families across the Bay Area and beyond.
                </p>
                <p className="m-0 leading-relaxed mb-2">My goal is simple:</p>
                <p className="m-0 leading-relaxed mb-3">
                  To make beautiful, well-designed, and thoughtfully customized window treatments more accessible—without compromising on quality.
                </p>
                <p className="m-0 leading-relaxed mb-4">I look forward to being part of your home.</p>
                <p className="m-0 leading-relaxed font-[500] text-brown">— Becky (Sijia) Tao</p>
                <p className="m-0 leading-relaxed font-[500] text-brown">Founder of Pacific Light Shades</p>
                <p className="m-0 leading-relaxed font-[500] text-brown">Written on April 15, 2026</p>
              </section>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AboutMe
