import { useState } from "react";

export default function ModalCarousel({ post, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
 

  if (!post) return null;

  const handleNext = () => {
      if(currentIndex < post.photos.length -1){
          setCurrentIndex(currentIndex +1);
      } else{
          setCurrentIndex(0);
      };
       }
      const handlePrev = () => {
        if(currentIndex > 0){
          setCurrentIndex(currentIndex -1)
        } else{
          setCurrentIndex(post.photos.length - 1);
        }
      };


  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div onClick={(e)=>e.stopPropagation()} className="relative bg-white rounded-lg max-w-3xl w-full p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-2xl"
        >
          ✕
        </button>

        {/* Image Carousel */}
        <div className="flex items-center justify-center">
          {/* Left button */}
         {post.photos.length > 1 && (
            <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
          >
            ◀
          </button>
         )}
        
          <div className="relative flex items-center justify-center">

          </div>
          {/* Current image */}
          <img
            src={`data:image/jpeg;base64,${post.photos[currentIndex].image}`}
            alt={`photo-${currentIndex}`}
            className="max-h-[80vh] object-contain"
          />

          {/* Right button */}
          {post.photos.length > 1 &&(
            <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 
                     bg-black/50 text-white px-3 py-2 rounded-full" 
          >
            ▶
          </button>
          )}
          
        </div>

        {/* Caption */}
        <p className="text-center mt-3">{post.caption}</p>
      </div>
    </div>
  );
}
