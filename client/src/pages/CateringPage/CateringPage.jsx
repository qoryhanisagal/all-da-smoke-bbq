import HeroLayout from '../../components/HeroLayout/HeroLayout';
import { heroBackgrounds } from '../../data/backgroundImages';

export default function CateringPage() {
  return (
    <div data-theme="lofi">
      {/* Hero section with background image and title */}
      <HeroLayout
        heroImage={heroBackgrounds.hero1}
        heroTitle="Catering Services"
        heroSubtitle="Let us bring the authentic BBQ experience to your next event"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Premium BBQ Catering</h2>
            <p className="text-lg max-w-2xl mx-auto mb-12">
              From intimate gatherings to large corporate events, All Da Smoke
              delivers exceptional BBQ catering that will make your event
              unforgettable.
            </p>
          </div>

          {/* Placeholder for catering content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Corporate Events</h3>
                <p>
                  Perfect for office parties, meetings, and company
                  celebrations.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Private Parties</h3>
                <p>
                  Make your birthday, anniversary, or family gathering special.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Weddings</h3>
                <p>
                  Authentic BBQ for your special day with full-service options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}
