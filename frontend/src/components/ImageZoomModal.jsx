import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const ImageZoomGallery = ({ images = [], productName = '' }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) return null;

  const currentImg = images[activeIdx] || images[0];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Stage with Hover Magnifier */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 aspect-[3/4] shadow-md group">
        <div
          className="w-full h-full cursor-zoom-in relative overflow-hidden"
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsFullscreen(true)}
        >
          <img
            src={currentImg}
            alt={`${productName} view ${activeIdx + 1}`}
            className="w-full h-full object-cover object-center transition-opacity duration-200"
          />

          {/* Zoom Magnifier Lens Window overlay on hover */}
          {isZooming && (
            <div
              className="absolute inset-0 pointer-events-none z-20 border-2 border-amber-400/80 shadow-2xl bg-no-repeat rounded-xl"
              style={{
                backgroundImage: `url(${currentImg})`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundSize: '250%',
              }}
            />
          )}

          {/* Zoom Hint Badge */}
          <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-400/30 opacity-90 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
            <span>Hover to Zoom • Click Fullscreen</span>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(true);
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 flex items-center justify-center hover:scale-110 transition-transform border border-amber-400/30 z-30"
            title="Open Fullscreen Gallery"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Previous / Next Arrow Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-white backdrop-blur-md flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all shadow-lg z-30"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-white backdrop-blur-md flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all shadow-lg z-30"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* 📸 10+ Image Thumbnail Selector Horizontal Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            📸 Product Photo Gallery ({images.length} High-Res Shots)
          </span>
          <span>
            {activeIdx + 1} of {images.length}
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500">
          {images.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setActiveIdx(index)}
              className={`relative flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                activeIdx === index
                  ? 'border-amber-500 ring-2 ring-amber-500/30 scale-105 shadow-md'
                  : 'border-gray-200 dark:border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-slate-950/80 text-amber-300 text-[9px] font-bold px-1 rounded">
                #{index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Header Bar */}
          <div className="flex items-center justify-between text-white border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-cinzel text-amber-400 font-bold text-lg">
                {productName}
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30">
                Photo {activeIdx + 1} / {images.length}
              </span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Large Image Stage */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={currentImg}
              alt={productName}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto justify-center pt-2">
            {images.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setActiveIdx(index)}
                className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeIdx === index ? 'border-amber-400 scale-110' : 'border-transparent opacity-50'
                }`}
              >
                <img src={imgUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
