import HeroLayout from '../../components/HeroLayout/HeroLayout';
import { heroBackgrounds } from '../../data/backgroundImages';
import owners from '../../assets/img/owners.png';

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <HeroLayout
        heroImage={heroBackgrounds.hero1}
        heroTitle={
          <>
            About
            <br />
            <span className="whitespace-nowrap">All Da Smoke</span>
          </>
        }
        heroSubtitle="A veteran-owned family business bringing authentic BBQ and community together, one plate at a time."
        heroTitleClass="text-accent text-left font-stardos-stencil-bold text-2xl sm:text-3xl lg:text-4xl px-4"
        allowStacking={false}
      >
        <div className="container mx-auto max-w-6xl px-4 py-12">
          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Story Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-stardos-stencil-bold text-primary mb-6">
                Our Story
              </h2>
              <p className="text-base-content leading-relaxed font-stardos-stencil-normal">
                All Da Smoke BBQ began with a simple idea: bringing people
                together over incredible food. As a veteran, I learned the
                importance of dedication, precision, and building strong bonds.
                When I returned home, my amazing wife and I poured that same
                passion into something we truly loved: BBQ.
              </p>
              <p className="text-base-content leading-relaxed font-stardos-stencil-normal">
                What started as backyard cookouts for friends and neighbors
                quickly grew into a shared dream. Every recipe, every rub, and
                every batch of our unique sauces are crafted with care right
                here by our family.
              </p>
              <p className="text-base-content leading-relaxed font-stardos-stencil-normal">
                My wife's unwavering support and incredible palate have been
                just as essential as the smoke and fire. We believe in using
                quality ingredients and time-honored techniques to create
                flavors that tell a story—a story of commitment, community, and
                all da smoke flavor that makes our BBQ special.
              </p>
            </div>

            {/* Family Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="card bg-base-100 shadow-xl max-w-md">
                <figure>
                  <img
                    src={owners}
                    alt="All Da Smoke Family"
                    className="w-full h-64 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title font-stardos-stencil-bold text-primary">
                    The All Da Smoke Family
                  </h3>
                  <p className="text-sm font-stardos-stencil-normal">
                    From our family to yours, we invite you to taste the
                    tradition and passion in every bite.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="text-4xl text-primary mb-4">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h3 className="card-title font-stardos-stencil-bold text-primary justify-center">
                  Veteran Owned
                </h3>
                <p className="font-stardos-stencil-normal">
                  Built on military values of dedication, precision, and service
                  to community.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="text-4xl text-primary mb-4">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <h3 className="card-title font-stardos-stencil-bold text-primary justify-center">
                  Family Recipes
                </h3>
                <p className="font-stardos-stencil-normal">
                  Every sauce, rub, and recipe is crafted with love by our
                  family.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="text-4xl text-primary mb-4">
                  <i className="bi bi-people-fill"></i>
                </div>
                <h3 className="card-title font-stardos-stencil-bold text-primary justify-center">
                  Community First
                </h3>
                <p className="font-stardos-stencil-normal">
                  Bringing people together through authentic BBQ and genuine
                  hospitality.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-2xl font-stardos-stencil-bold text-primary mb-4">
                  Ready to Experience All Da Smoke?
                </h3>
                <p className="font-stardos-stencil-normal mb-6">
                  Visit us today and taste the passion, tradition, and community
                  in every bite.
                </p>
                <div className="card-actions justify-center space-x-4">
                  <button className="btn btn-primary font-stardos-stencil-bold">
                    <i className="bi bi-geo-alt-fill"></i>
                    Visit Us
                  </button>
                  <button className="btn btn-outline btn-primary font-stardos-stencil-bold">
                    <i className="bi bi-telephone-fill"></i>
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}
