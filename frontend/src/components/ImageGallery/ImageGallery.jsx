import { useEffect, useRef, useState } from "react";
import "./ImageGallery.css";
import chevronLeftImage from "../../assets/svg/chevron-left.svg";
import { createImageUrl } from "../../utils";

const THUMBNAIL_WIDTH = 110;
const GAP = 16; // gap between thumbnails

const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState(5);
  const thumbnailsRef = useRef(null);
  const thumbnailContainerRef = useRef(null);

  // Calculate the maximum number of thumbnails that fit in the container
  useEffect(() => {
    const updateVisibleThumbnails = () => {
      if (thumbnailContainerRef.current) {
        const containerWidth = thumbnailContainerRef.current.clientWidth;
        // The effective width per thumbnail includes the gap (except for the last one)
        const count = Math.max(
          1,
          Math.floor((containerWidth + GAP) / (THUMBNAIL_WIDTH + GAP))
        );
        setVisibleThumbnails(count);
      }
    };

    updateVisibleThumbnails();
    window.addEventListener("resize", updateVisibleThumbnails);
    return () => {
      window.removeEventListener("resize", updateVisibleThumbnails);
    };
  }, []);

  // Scroll the thumbnails container when the start index changes
  useEffect(() => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.style.scrollBehavior = "smooth";
      thumbnailsRef.current.scrollLeft = startIndex * (THUMBNAIL_WIDTH + GAP);
    }
  }, [startIndex]);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + visibleThumbnails < images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="gallery-container">
      {/* Active Image */}
      <div className="active-image-container">
        <img
          src={createImageUrl(activeImage)}
          alt="Active"
          className="active-image"
        />
      </div>

      {/* Thumbnails with Scroll */}
      <div className="thumbnail-container" ref={thumbnailContainerRef}>
        <button
          onClick={handlePrev}
          className="thumbnail-btn thumbnail-btn-left"
          disabled={startIndex === 0}
        >
          <img src={chevronLeftImage} alt="Previous" />
        </button>

        <div
          className="thumbnails"
          ref={thumbnailsRef}
          style={{
            overflowX: "hidden",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            // Remove the fixed width so it fills the container
          }}
        >
          {images
            .slice(startIndex, startIndex + visibleThumbnails)
            .map((image, index) => (
              <img
                key={index}
                src={createImageUrl(image)}
                alt="Thumbnail"
                className={`thumbnail ${
                  activeImage === image ? "active-thumbnail" : ""
                }`}
                onClick={() => setActiveImage(image)}
              />
            ))}
        </div>

        <button
          onClick={handleNext}
          className="thumbnail-btn thumbnail-btn-right"
          disabled={startIndex + visibleThumbnails >= images.length}
        >
          <img src={chevronLeftImage} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
