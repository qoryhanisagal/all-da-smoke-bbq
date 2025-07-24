import FAQs from '../../components/FAQs/FAQs';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import { menuFAQs, cateringFAQs, generalFAQs } from '../../data/faqs';
import { heroBackgrounds } from '../../data/backgroundImages';

export default function FAQsPage() {
  return (
    <div data-theme="lofi">
      <HeroLayout
        allowStacking={true}
        heroImage={heroBackgrounds.hero1}
        heroTitle="Frequently Asked Questions"
        heroSubtitle="Find answers to commonly asked questions about our BBQ, menu, catering, and more."
        heroTitleClass="text-accent text-left font-stardos-stencil-bold text-2xl sm:text-3xl lg:text-4xl px-4"
      >
        {/* FAQ Sections */}
        <div className="container mx-auto px-4 py-8 space-y-16 text-left">
          {/* General FAQs */}
          <section>
            <div className="flex w-full flex-col lg:flex-row items-start">
              <div className="card rounded-box flex h-32 flex-none w-full lg:w-1/3 items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl font-semibold font-stardos-stencil-bold">
                    General Questions
                  </h3>
                </div>
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="card rounded-box flex-1 p-4">
                <FAQs faqs={generalFAQs} showTitle={false} />
              </div>
            </div>
          </section>

          {/* Menu FAQs */}
          <section>
            <div className="flex w-full flex-col lg:flex-row items-start">
              <div className="card rounded-box flex h-32 flex-none w-full lg:w-1/3 items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl font-semibold font-stardos-stencil-bold">
                    Menu & Food
                  </h3>
                </div>
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="card rounded-box flex-1 p-4">
                <FAQs faqs={menuFAQs} showTitle={false} />
              </div>
            </div>
          </section>

          {/* Catering FAQs */}
          <section>
            <div className="flex w-full flex-col lg:flex-row items-start">
              <div className="card rounded-box flex h-32 flex-none w-full lg:w-1/3 items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl font-semibold font-stardos-stencil-bold">
                    Catering Services
                  </h3>
                </div>
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="card rounded-box flex-1 p-4 flex flex-col justify-start">
                <FAQs faqs={cateringFAQs} showTitle={false} />
              </div>
            </div>
          </section>
        </div>
      </HeroLayout>
    </div>
  );
}
