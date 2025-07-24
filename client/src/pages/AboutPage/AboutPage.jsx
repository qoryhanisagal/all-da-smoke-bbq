import owners from '../../assets/img/owners.png';

export default function AboutPage() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${owners})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center flex-col pt-10 px-4">
        {/* Move heading higher */}
        <div className="mt-10">
          <h1 className="text-5xl font-bold text-primary">
            All Da Smoke Family
          </h1>
        </div>

        {/* Keep paragraph and button lower */}
        <div className="max-w-md mt-10">
          <p className="mb-5">
            All Da Smoke BBQ began with a simple idea: bringing people together
            over incredible food. As a veteran, I learned the importance of
            dedication, precision, and building strong bonds. When I returned
            home, my amazing wife and I poured that same passion into something
            we truly loved: BBQ. What started as backyard cookouts for friends
            and neighbors quickly grew into a shared dream. Every recipe, every
            rub, and every batch of our unique sauces are crafted with care
            right here by our family. My wife's unwavering support and
            incredible palate have been just as essential as the smoke and fire.
            We believe in using quality ingredients and time-honored techniques
            to create flavors that tell a story—a story of commitment,
            community, and, of course, all da smoke flavor that makes our BBQ
            special. From our family to yours, we invite you to taste the
            tradition and passion in every bite.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
