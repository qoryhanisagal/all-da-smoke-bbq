import { contentBackgrounds } from '../../data/backgroundImages';
import PaginationDots from '../PaginationDots';
import DecorativeDots from '../DecorativeDots';

export default function HeroLayout({
  heroImage,
  heroTitle,
  heroSubtitle,
  contentBackgroundImage = contentBackgrounds.woodTexture,
  heroTitleClass = 'text-accent font-stardos-stencil-bold text-left text-2xl sm:text-3xl lg:text-4xl',
  heroSubtitleClass = 'text-primary-content text-left max-w-xs sm:max-w-lg lg:max-w-2xl leading-relaxed text-sm sm:text-base lg:text-lg',
  featuredImage = null,
  contentAlignment = 'left', // Prop for main content alignment
  hangingImage = false, // Prop to make featured image hang over like homepage logo
  showDotsDivider = false, // Prop to show horizontal dots before title
  // Pagination dots props
  showPaginationDots = false,
  paginationCount = 0,
  paginationActiveIndex = 0,
  onPaginationDotClick = () => {},
  children,
}) {
  return (
    <div className="min-h-screen">
      {/* Hero section - this is the big banner area at the top of the page with background image */}
      <div
        className="hero min-h-64 sm:min-h-80 lg:min-h-96 relative"
        style={{
          // Using inline styles here because we need dynamic image URLs from props
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover', // Makes sure image covers the whole area without stretching
          backgroundPosition: 'center', // Centers the image in the container
        }}
      >
        {/* Hero content positioned absolutely */}
        <div className="absolute inset-0 flex items-center text-white">
          <div className="w-full px-4 sm:px-8 lg:px-28">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-12">
              {/* Left side - Text content */}
              <div className="w-full lg:w-1/2 text-center lg:text-left relative">
                {/* Decorative dots on the left */}
                {showDotsDivider && (
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex">
                    <DecorativeDots
                      count={8}
                      orientation="vertical"
                      size="sm"
                      color="text-accent"
                      spacing="gap-2"
                    />
                  </div>
                )}

                {/* Hero title */}
                <h1
                  className={`mb-2 sm:mb-4 ${
                    heroTitleClass ||
                    'text-accent font-stardos-stencil-bold text-2xl sm:text-3xl lg:text-4xl'
                  }`}
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  {heroTitle}
                </h1>

                {/* Subtitle text - only shows if heroSubtitle prop is provided */}
                {heroSubtitle && (
                  <p
                    className={`mb-4 sm:mb-6 max-w-lg mx-auto lg:mx-0 ${
                      heroSubtitleClass ||
                      'text-primary-content text-sm sm:text-base lg:text-lg'
                    }`}
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                  >
                    {heroSubtitle}
                  </p>
                )}
              </div>

              {/* Right side - No image here, it will hang outside */}
              <div className="lg:w-1/2">
                {/* Spacer to maintain layout balance */}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image section - only shows if not hanging */}
        {featuredImage && !hangingImage && (
          <div className="absolute right-4 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20">
            <img
              src={featuredImage}
              alt="Featured content"
              className="w-64 h-48 sm:w-[32rem] sm:h-80 md:w-[40rem] md:h-96 object-cover drop-shadow-2xl hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </div>
        )}

        {/* Hanging Featured Image - positioned absolutely to hang over hero section with responsive sizing */}
        {featuredImage && hangingImage && (
          <div className="absolute right-16 sm:right-24 lg:right-48 -bottom-8 sm:-bottom-12 md:-bottom-16 z-30">
            <img
              src={featuredImage}
              alt="Featured content"
              className="w-96 h-56 sm:w-[32rem] sm:h-72 md:w-[40rem] md:h-80 object-cover drop-shadow-2xl hover:scale-105 transition-transform duration-300 rounded-lg"
              width="640"
              height="480"
            />
          </div>
        )}

        {/* Pagination Dots - positioned on the left side horizontally */}
        {showPaginationDots && paginationCount > 1 && (
          <div className="absolute left-6 sm:left-8 lg:left-12 -bottom-8 sm:-bottom-12 md:-bottom-16 z-30">
            <PaginationDots
              count={paginationCount}
              activeIndex={paginationActiveIndex}
              onDotClick={onPaginationDotClick}
              showOrientationToggle={false}
              defaultOrientation="horizontal"
              className=""
            />
          </div>
        )}
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
