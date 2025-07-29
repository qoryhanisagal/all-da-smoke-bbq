import HeroLayout from '../../components/HeroLayout/HeroLayout';
import ImageGallery from '../../components/ImageGallery';
import galleryImages from '../../data/galleryImages';
import { heroBackgrounds } from '../../data/backgroundImages';

const GalleryPage = () => {
  return (
    <div className="overflow-x-hidden" data-theme="lofi">
      <HeroLayout
        heroImage={heroBackgrounds.hero1}
        heroTitle="Our Gallery"
        heroSubtitle="Take a visual journey through our BBQ experience. From smoky kitchens to satisfied smiles, see what makes All Da Smoke special."
        allowStacking={false}
      >
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <ImageGallery images={galleryImages} />
        </div>
      </HeroLayout>
    </div>
  );
};

export default GalleryPage;
