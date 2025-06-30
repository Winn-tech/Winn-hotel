import { useState, useEffect, useMemo } from 'react';

const useImageShuffle = (images: string, interval: number = 3000) => {
  const imageArray = useMemo(() => {
    const arr = images.split(',').filter(img => img.trim() !== '');
    return arr;
  }, [images]);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    console.log('Setting up interval for', imageArray.length, 'images'); // Debug log
    
    if (imageArray.length <= 1) {
      console.log('Not enough images to shuffle'); // Debug log
      return;
    }

    const shuffleInterval = setInterval(() => {
      setCurrentImageIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % imageArray.length;
        return newIndex;
      });
    }, interval);

    return () => {
      console.log('Cleaning up interval'); // Debug log
      clearInterval(shuffleInterval);
    };
  }, [imageArray.length, interval]);

  const currentImage = imageArray[currentImageIndex] || imageArray[0] || '';
  
  return currentImage;
};

export default useImageShuffle;