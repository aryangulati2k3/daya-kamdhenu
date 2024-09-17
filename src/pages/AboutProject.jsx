import cowSeva from "../assets/Cowseva.png";
import cowSevaPerson from "../assets/CowsevaP.png";
import Button from "../component/Button";

function AboutProject() {
  return (
    <main className="main-container flex flex-col p-4 lg:p-12 gap-5 mt-0 md:mt-14">
      {/* Cover Image with hover animation */}
      <figure className="relative w-full overflow-hidden rounded-lg shadow-xl">
        <img
          src={cowSeva}
          alt="cow-seva-cover-image"
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </figure>

      {/* Main Text Content */}
      <p className="text-neutral-700 text-sm sm:text-base md:text-lg lg:text-xl max-w-full mx-auto leading-relaxed">
        The cow is an amazing divine being who carries the most powerful and
        sublime vibrations of the Universe, the true mother of mankind. She
        feeds her children, her people, with her own milk. From the milk of a
        cow, a person creates yogurt, butter, ghee, cheese, all kinds of sweets,
        etc. It is impossible to imagine a day without these blissful products.
        Indispensable ingredients such as ghee, which is sometimes called liquid
        gold; manure, which is a symbol of purification and protection; and cow
        urine, which is truly living water; and powerful biostimulants are in
        canonical Ayurveda and modern medicine. Everything that comes from the
        cow, even its breath, is healing for the body and soul. The bull in the
        farm plows the land, helps in sowing and harvesting, transports heavy
        loads and is the father of the family! The cow and the bull are the
        basis for the well-being of the family, its health and happiness. And
        from the well-being in families comes the well-being of all mankind.
      </p>

      {/* Image and Supporting Text */}
      <section className="w-full flex flex-col md:flex-row items-center gap-8 mt-10">
        {/* Second Image with hover effect */}
        <figure className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-xl">
          <img
            src={cowSevaPerson}
            alt="cow-seva-person"
            className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </figure>

        {/* Text Block */}
        <div className="w-full md:w-1/2 text-neutral-700 space-y-4">
          <p>
            Previously there were more than a hundred breeds of cows in India but today there are only 32. The Ashram of Sri Devraha Baba
            undertook the mission of preserving and reproducing rare breeds. We
            can work together to protect cows and become the voice of this
            silent animal.
          </p>
          <p>
            People should know: donations to keep cows alive will be returned to
            them a hundredfold – this is evidenced by the scriptures and spoken
            by the holy sages.
          </p>
          <p>
            Cows are intelligent, gentle, and affectionate animals. Each of them
            is a person with their own feelings, emotions, and mood. Anyone who
            is lucky enough to communicate with a cow knows how meaningfully it
            communicates and generously shares its love with people.
          </p>
        </div>
      </section>

      {/* Call to Action Button with smooth hover effect */}
      <section className="flex justify-center mt-10">
        <Button
          btnText="ADOPT A COW"
          className="w-full h-14 bg-neutral-700 text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </section>
    </main>
  );
}

export default AboutProject;
