import { useState, useEffect, useMemo } from 'react';

const useImageShuffle = (images: string, interval: number = 3000) => {
  const imageArray = useMemo(() => {
    return images
      .split(',')
      .map(img => img.trim())
      .filter(img => img !== '');
  }, [images]);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (imageArray.length <= 1) return;

    const shuffleInterval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageArray.length);
    }, interval);

    return () => clearInterval(shuffleInterval);
  }, [imageArray.length, interval]);

  const currentImage = imageArray[currentImageIndex] || '';

  return currentImage;
};

export default useImageShuffle;
