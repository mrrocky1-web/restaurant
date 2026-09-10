import React, { useState } from 'react';
import { restaurantPhotos } from '../data/initialData';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const RestaurantGallery = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const activePhoto = selectedPhotoIndex !== null ? restaurantPhotos[selectedPhotoIndex] : null;

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev === 0 ? restaurantPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev === restaurantPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-6">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest border border-amber-500/20">
          <Camera className="w-4 h-4 text-amber-500" />
          <span>RESTAURANT ATMOSPHERE & KITCHEN</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          EXPLORE OUR KINGDOM & DINING SPACES
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Take a look inside our luxury dining halls, live tandoori open kitchens, terrace garden, and bakery stations. All photos taken live at our flagship outlets.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
      </div>

      {/* Grid of 6 Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurantPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhotoIndex(index)}
            className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-amber-200/50 dark:border-amber-900/30 bg-slate-900"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Badge */}
            <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              Photo #{index + 1}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <h4 className="font-cinzel text-base font-bold text-amber-200 group-hover:text-amber-400 transition-colors">
                {photo.title}
              </h4>
              <p className="text-[11px] text-gray-300 line-clamp-2">{photo.caption}</p>
              <div className="pt-1 flex items-center gap-1 text-[10px] text-amber-300 font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Click to expand photo</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors z-50"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-slate-800/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors z-50"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-slate-800/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors z-50"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full space-y-4 text-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 bg-slate-900 max-h-[70vh] flex items-center justify-center">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="space-y-1 text-white max-w-xl mx-auto">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">
                Photo {selectedPhotoIndex + 1} of {restaurantPhotos.length}
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-amber-200">{activePhoto.title}</h3>
              <p className="text-xs text-gray-300">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
