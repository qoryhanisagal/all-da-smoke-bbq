import { useState, useRef } from 'react';
import PaginationDots from '../PaginationDots/PaginationDots';
import MenuCard from '../MenuCard/MenuCard';
import CarouselArrows from '../CarouselArrows/CarouselArrows';

const MenuCarousel = ({ items, onItemClick, onOrderClick }) => {
  // Track the active index for pagination dots
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // Paginate through all items
  const pageCount = items.length;

  // Scroll to the selected item when a dot is clicked
  const handleDotClick = (index) => {
    setActiveIndex(index);
    scrollToItem(index);
  };

  // Scroll to specific item
  const scrollToItem = (index) => {
    if (carouselRef.current) {
      const itemEls = carouselRef.current.querySelectorAll('.carousel-item');
      if (itemEls[index]) {
        itemEls[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  // Handle previous arrow click
  const handlePrevClick = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
    setActiveIndex(newIndex);
    scrollToItem(newIndex);
  };

  // Handle next arrow click
  const handleNextClick = () => {
    const newIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(newIndex);
    scrollToItem(newIndex);
  };

  return (
    <div className="w-full mb-8 px-16">
      {' '}
      {/* Horizontal padding for arrow space */}
      {/* Carousel wrapper with relative positioning for arrows */}
      <div className="relative">
        {/* Main carousel container */}
        <div
          ref={carouselRef}
          className="carousel carousel-vertical sm:carousel-horizontal carousel-center w-full space-y-2 sm:space-y-0 sm:space-x-4 p-2 sm:p-4"
        >
          {items.map((item) => (
            <div key={item.id} className="carousel-item w-full sm:w-auto">
              <MenuCard
                item={item}
                onItemClick={onItemClick}
                onOrderClick={onOrderClick}
                className="sm:w-64 md:w-72 lg:w-80 xl:w-96"
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows - only show on desktop */}
        <div className="hidden sm:block">
          <CarouselArrows
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
        </div>
      </div>
      {/* Pagination dots: interactive, controls which item is scrolled into view. */}
      <PaginationDots
        count={pageCount}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
      />
    </div>
  );
};

export default MenuCarousel;
