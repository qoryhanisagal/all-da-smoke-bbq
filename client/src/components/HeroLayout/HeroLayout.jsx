import { contentBackgrounds } from '../../data/backgroundImages';

export default function HeroLayout({
  heroImage,
  heroTitle,
  heroSubtitle,
  contentBackgroundImage = contentBackgrounds.woodTexture,
  heroTitleClass = 'text-accent text-left font-stardos-stencil-bold whitespace-nowrap text-3xl sm:text-4xl lg:text-5xl px-4',
  heroSubtitleClass = 'text-left font-stardos-stencil-normal text-accent-content max-w-2xl leading-relaxed text-lg lg:text-xl',
  featuredImage = '/src/assets/img/page-stamp.png',
  allowStacking = false, // Prop to control stacking behavior
  contentAlignment = 'left', // Prop for main content alignment
  children,
}) {
  return (
    <div className="min-h-screen">
      {/* Hero section - this is the big banner area at the top of the page with background image */}
      <div
        className="hero min-h-96"
        style={{
          // Using inline styles here because we need dynamic image URLs from props
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover', // Makes sure image covers the whole area without stretching
          backgroundPosition: 'center', // Centers the image in the container
        }}
      >
        {/* Hero content wrapper - centers content and sets max width for readability */}
        <div className="hero-content text-center lg:text-left w-full max-w-7xl mx-auto px-4 lg:p-8">
          {/* Flex container that stacks only on mobile, side-by-side on tablet and up */}
          <div
            className={`flex ${allowStacking ? 'flex-col lg:flex-row' : 'flex-row'} justify-between items-center gap-8`}
          >
            {/* Left side container - holds the main heading and subtitle text */}
            <div className="flex-1">
              {/* Main hero title - now defaults to stencil font, can still be overridden with heroTitleClass */}
              <h1
                className={`text-5xl lg:text-6xl xl:text-7xl mb-6 ${
                  heroTitleClass || 'text-primary font-stardos-stencil-bold'
                }`}
              >
                {heroTitle}
              </h1>
              {/* Subtitle text - only shows if heroSubtitle prop is provided */}
              {heroSubtitle && (
                <p
                  className={`text-lg max-w-lg ${
                    heroSubtitleClass || 'text-base-content' // Uses theme's base text color by default
                  }`}
                >
                  {heroSubtitle}
                </p>
              )}
            </div>

            {/* Right side container - reserved for featured image but currently disabled for testing */}
            {featuredImage && (
              <div className="flex-1 flex justify-center lg:justify-end">
                {/* Image container with responsive sizing - gets bigger on larger screens */}
                <div className="w-96 sm:w-[32rem] lg:w-[44rem] xl:w-[52rem] 2xl:w-[60rem]">
                  {/* Featured image temporarily commented out to test if it's causing layout issues */}
                  {/* <img
                    src={featuredImage}
                    alt="Featured content"
                    className="w-full h-auto object-cover rounded-lg shadow-2xl"
                  /> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content section - everything below the hero goes here */}
      <div className="min-h-screen bg-base-100">
        {/* Conditional rendering - if there's a background image for content, use it */}
        {contentBackgroundImage ? (
          <div
            className="min-h-screen"
            style={{
              // Another dynamic background image, this time for the content area
              backgroundImage: `url(${contentBackgroundImage})`,
              backgroundSize: 'cover', // Same settings as hero for consistency
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat', // Prevents image from repeating if it's smaller than container
            }}
          >
            {/* Semi-transparent overlay to make text readable over background image */}
            {/* bg-base-100/30 means use the theme's base background color at 30% opacity */}
            <div
              className={`bg-base-100/30 min-h-screen p-4 lg:p-8 ${
                contentAlignment === 'left'
                  ? 'text-left'
                  : contentAlignment === 'right'
                    ? 'text-right'
                    : 'text-center'
              }`}
            >
              {/* This is where all the page content gets rendered via the children prop */}
              {children}
            </div>
          </div>
        ) : (
          /* If no background image, just use a plain content area with theme colors */
          <div
            className={`min-h-screen p-4 lg:p-8 ${
              contentAlignment === 'left'
                ? 'text-left'
                : contentAlignment === 'right'
                  ? 'text-right'
                  : 'text-center'
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
