import Saqib from '../assets/saqib.jpg'
import Faisal from '../assets/faisal.jpg'
import Mishfa from '../assets/mishfa.jpg'
export default function AboutUs(){
    return(
        <section className="lg:px-40 px-10 py-2 bg-secondary-color">
      <div className="mt-20 px-2">
        <h1 className="text-2xl lg:text-5xl text-center text-brown">About Us!</h1>
      </div>
      <div className="my-6 lg:my-20 flex flex-col lg:flex-row gap-16 justify-between">
        {/* Card 1 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 glow-effect rounded-lg overflow-hidden">
          <img
            src={Faisal}
            alt="Md. Faisal Ahmed"
            className="hover:scale-110 transition-transform duration-300 lg:w-[56rem]"
          />
          <div className="p-4">
            <h2 className="text-base font-bold">Md. Faisal Ahmed</h2>
            <p className="text-xs">East Delta University</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 glow-effect rounded-lg overflow-hidden ">

          <img
            src={Mishfa}
            alt="Lazima Mishfa"
            className="hover:scale-110 transition-transform duration-300 lg:w-[56rem]"
          />
          <div className="p-4">
            <h2 className="text-base font-bold">Lazima Anwar Mishfa</h2>
            <p className="text-xs">East Delta University</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 glow-effect rounded-lg overflow-hidden">
          <img
            src={Saqib}
            alt="Md. Shahidul Islam Sakib"
            className="hover:scale-110 transition-transform duration-300 lg:w-[56rem]"
          />
          <div className="p-4">
            <h2 className="text-base font-bold">Md. Shahidul Islam Sakib</h2>
            <p className="text-xs">East Delta University</p>
          </div>
        </div>
      </div>
    </section>
    )
}