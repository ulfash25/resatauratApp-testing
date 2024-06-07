const lazyLoad = () => {
    const images = document.querySelectorAll("img[loading=\"lazy\"]")
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, imgObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target
                    lazyImage.src = lazyImage.dataset.src
                    lazyImage.classList.remove("lazy")
                    imgObserver.unobserve(lazyImage)
                }
            })
        })

        images.forEach((img) => {
            observer.observe(img)
        })
    } else {
        images.forEach((img) => {
            img.src = img.dataset.src
        })
    }
}

export default {
    init: lazyLoad,
}
