import { contentBackgrounds } from '../../data/backgroundImages';
import PaginationDots from '../PaginationDots';
import SectionDivider from '../SectionDivider';

export default function HeroLayout({
  heroImage,
  heroTitle,
  heroSubtitle,
  contentBackgroundImage = contentBackgrounds.woodTexture,
  heroTitleClass = 'text-primary font-stardos-stencil-bold text-center',
  heroSubtitleClass = 'text-base-content text-center max-w-2xl leading-relaxed text-lg lg:text-xl',
  featuredImage = null,
  allowStacking = false, // Prop to control stacking behavior
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
  // Debug: Log hanging image data
  console.log('HeroLayout Debug:', {
    featuredImage,
    hangingImage,
    shouldRenderHangingImage: featuredImage && hangingImage
  });

  return (
    <div className="min-h-screen">
      {/* Hero section - this is the big banner area at the top of the page with background image */}
      <div
        className="hero min-h-96 relative"
        style={{
          // Using inline styles here because we need dynamic image URLs from props
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover', // Makes sure image covers the whole area without stretching
          backgroundPosition: 'center', // Centers the image in the container
        }}
      >
        {/* Hero content wrapper - centers content and sets max width for readability */}
        <div className="hero-content text-center lg:text-left w-full max-w-7xl mx-auto px-4 sm:px-6 lg:p-8">
          {/* Flex container that stacks only on mobile, side-by-side on tablet and up */}
          <div
            className={`flex ${allowStacking ? 'flex-col lg:flex-row' : 'flex-row'} justify-between items-center gap-4 sm:gap-6 lg:gap-8`}
          >
            {/* Left side container - holds the main heading and subtitle text */}
            <div className="flex-1">
              {/* Main hero title with horizontal dots on the left */}
              <div className="flex items-center gap-4 mb-6 justify-start">
                {/* Horizontal dots on the left of title */}
                {showDotsDivider && (
                  <span className="text-accent font-mono tracking-[0.3em] text-base">
                    ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                  </span>
                )}
                
                {/* Main hero title */}
                <h1
                  className={`text-5xl lg:text-6xl xl:text-7xl ${
                    heroTitleClass || 'text-primary font-stardos-stencil-bold'
                  }`}
                >
                  {heroTitle}
                </h1>
              </div>
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
            {featuredImage && !hangingImage && (
              <div className="flex-1 flex justify-center lg:justify-end">
                {/* Image container with responsive sizing - gets bigger on larger screens */}
                <div className="w-96 sm:w-[32rem] lg:w-[44rem] xl:w-[52rem] 2xl:w-[60rem]">
                  {/* Featured image */}
                  <img
                    src={featuredImage}
                    alt="Featured content"
                    className="w-full h-auto object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hanging Featured Image - positioned absolutely to hang over hero section with responsive sizing */}
        {featuredImage && hangingImage && (
          <div className="absolute right-16 sm:right-24 lg:right-48 -bottom-8 sm:-bottom-12 md:-bottom-16 z-30 bg-red-500 p-2">
            <img 
              src={featuredImage} 
              alt="Featured content" 
              className="w-96 h-56 sm:w-[32rem] sm:h-72 md:w-[40rem] md:h-80 object-cover drop-shadow-2xl hover:scale-105 transition-transform duration-300 rounded-lg border-4 border-yellow-400"
              width="640"
              height="480"
              onLoad={() => console.log('Hanging image loaded successfully:', featuredImage)}
              onError={() => console.log('Hanging image failed to load:', featuredImage)}
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
