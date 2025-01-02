import fb from '../assets/fb.png'
import ig from '../assets/ig.png'
import github from '../assets/github.png'
import linkedin from '../assets/linkedin.png'
export default function Footer(){
    return(
        <footer className="bg-[#ec9e78] lg:px-40 px-2 py-2 lg:py-6">
      <section>
        <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-4">
          <div className="text-center lg:text-left">
            <h2 className="text-maroon text-xl md:text-2xl lg:text-4xl pt-2 lg:pt-6">QuizWhiz</h2>
            <p className="text-pink text-base md:text-lg lg:text-2xl pt-2 lg:pt-6">Get exam-ready, stress-free.</p>
          </div>
          <div className="w-full lg:w-auto flex justify-center">
            <div className="flex justify-center gap-3 lg:gap-4">
              <a
                className="w-[24px] lg:w-[40px] hover:scale-110 transition-transform duration-300"
                href=""
              >
                <img src={fb} alt="Facebook" className="glow-effect" />
              </a>
              <a
                className="w-[24px] lg:w-[40px] hover:scale-110 transition-transform duration-300"
                href=""
              >
                <img src={ig} alt="Instagram" className="glow-effect" />
              </a>
              <a
                className="w-[24px] lg:w-[40px] hover:scale-110 transition-transform duration-300"
                href=""
              >
                <img src={github} alt="GitHub" className="glow-effect" />
              </a>
              <a
                className="w-[24px] lg:w-[40px] hover:scale-110 transition-transform duration-300"
                href=""
              >
                <img src={linkedin} alt="LinkedIn" className="glow-effect" />
              </a>
            </div>
          </div>
          <div className="pt-2 md:pt-4 lg:pt-6 text-center mb-6">
            <p className="text-maroon text-xs lg:text-base">&copy; All rights reserved</p>
          </div>
        </div>
      </section>
    </footer>
    )
}