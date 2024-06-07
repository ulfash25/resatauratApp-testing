const lazyLoad = () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          const lazyImageSrc = lazyImage.dataset.src;
          lazyImage.src = lazyImageSrc;
          lazyImage.classList.remove('lazy');
          imgObserver.unobserve(lazyImage);
        }
      });
    });

    images.forEach((img) => {
      observer.observe(img);
    });
  } else {
    images.forEach((img) => {
      const imgSrc = img.dataset.src;
      img.setAttribute('src', imgSrc); // Menggunakan setAttribute untuk menghindari perubahan langsung pada parameter fungsi img
    });
  }
};

export default {
  init: lazyLoad,
};
