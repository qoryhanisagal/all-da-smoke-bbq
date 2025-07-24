import { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="card bg-base-100 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-lg group"
            onClick={() => handleImageClick(image)}
          >
            {/* Card image section */}
            <figure className="relative overflow-hidden rounded-t-lg">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Category badge */}
              <div className="badge badge-neutral absolute top-2 left-2 font-stardos-stencil-bold text-xs opacity-90">
                {image.category}
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <i className="bi bi-zoom-in text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
              </div>
            </figure>

            {/* Card body */}
            <div className="card-body p-4">
              <h3 className="card-title text-sm sm:text-base font-stardos-stencil-bold text-center">
                {image.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for enlarged image view */}
      {selectedImage && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl p-0 bg-transparent shadow-none">
            <div className="relative">
              <img
                src={selectedImage.src.replace('400/300', '800/600')}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <button
                className="btn btn-circle btn-sm absolute top-4 right-4 bg-black bg-opacity-50 border-none text-white hover:bg-opacity-70"
                onClick={closeModal}
              >
                <i className="bi bi-x text-lg"></i>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
                <h3 className="text-lg font-stardos-stencil-bold">{selectedImage.title}</h3>
                <p className="text-sm font-stardos-stencil-normal opacity-90">{selectedImage.category}</p>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;