import HeroLayout from '../../components/HeroLayout/HeroLayout';
import { heroBackgrounds } from '../../data/backgroundImages';

export default function NewsletterPage() {
  return (
    <div>
      <HeroLayout
        heroImage={heroBackgrounds.hero2}
        heroTitle="Join Our Newsletter"
        heroSubtitle="Stay updated with the latest BBQ news, specials, and events"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">All Da Smoke Newsletter</h2>
            <p className="text-lg mb-12">
              Be the first to know about new menu items, special events, catering discounts, 
              and exclusive BBQ tips from our pitmasters.
            </p>
            
            <div className="card bg-base-100 shadow-xl p-8">
              <form className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your first name" 
                    className="input input-bordered w-full" 
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your last name" 
                    className="input input-bordered w-full" 
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email Address</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="input input-bordered w-full" 
                  />
                </div>
                
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" className="checkbox checkbox-primary" />
                    <span className="label-text">I want to receive special offers and promotions</span>
                  </label>
                </div>
                
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" className="checkbox checkbox-primary" />
                    <span className="label-text">I want to receive event notifications</span>
                  </label>
                </div>
                
                <button className="btn btn-primary btn-lg w-full">
                  Subscribe to Newsletter
                </button>
              </form>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <i className="bi bi-envelope-heart text-4xl text-primary mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Weekly Updates</h3>
                <p>Get the latest news and specials delivered to your inbox</p>
              </div>
              <div className="text-center">
                <i className="bi bi-calendar-event text-4xl text-primary mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Event Invites</h3>
                <p>Be the first to know about BBQ events and competitions</p>
              </div>
              <div className="text-center">
                <i className="bi bi-percent text-4xl text-primary mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Exclusive Deals</h3>
                <p>Subscriber-only discounts and early access to promotions</p>
              </div>
            </div>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}