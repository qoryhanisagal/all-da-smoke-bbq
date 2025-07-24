import HeroLayout from '../../components/HeroLayout/HeroLayout';
import { heroBackgrounds } from '../../data/backgroundImages';

export default function PitMasterPage() {
  return (
    <div>
      <HeroLayout
        heroImage={heroBackgrounds.hero3}
        heroTitle="Meet Our Pitmasters"
        heroSubtitle="The masters behind the smoke and flavor"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8">BBQ Masters</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Our experienced pitmasters bring decades of BBQ expertise and passion 
              to every dish we serve. Meet the talented team behind All Da Smoke.
            </p>
          </div>
          
          {/* Placeholder for pitmaster profiles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    <i className="bi bi-person-fill text-3xl"></i>
                  </div>
                </div>
                <h3 className="card-title justify-center">Master Chef</h3>
                <p>20+ years of BBQ experience</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    <i className="bi bi-person-fill text-3xl"></i>
                  </div>
                </div>
                <h3 className="card-title justify-center">Smoke Master</h3>
                <p>Expert in slow smoking techniques</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    <i className="bi bi-person-fill text-3xl"></i>
                  </div>
                </div>
                <h3 className="card-title justify-center">Grill Master</h3>
                <p>Specializes in rubs and seasonings</p>
              </div>
            </div>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}
