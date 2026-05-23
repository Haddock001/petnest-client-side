import { useEffect, useRef } from 'react';

export const useScrollSnap = () => {
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const container = window;
    let currentSectionIndex = 0;

    const handleWheel = (e) => {
      const sections = document.querySelectorAll('.scroll-section');
      if (!sections.length) return;

      // Get current scroll position
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;

      // If user has scrolled past the last snap section, allow normal scrolling
      const lastSnap = sections[sections.length - 1];
      const lastSnapBottom = lastSnap.offsetTop + lastSnap.offsetHeight;
      // If the viewport top is at or below the bottom of the last snap section,
      // we stop auto-snapping so the user can manually scroll through the rest
      if (currentScroll + 1 >= lastSnapBottom) {
        return;
      }

      // Find which snap-section we're currently in (only sections with class 'scroll-section')
      let currentIndex = 0;
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (currentScroll >= sectionTop - windowHeight / 2) {
          currentIndex = index;
        }
      });

      // Only allow snapping between the first two snap sections (index 0 and 1)
      // If there aren't at least two snap sections, do nothing
      if (sections.length < 2) return;

      // Determine scroll direction
      const isScrollingDown = e.deltaY > 0;

      // Snap only when:
      // - user is on index 0 (Home) and scrolls down -> snap to index 1
      // - user is on index 1 (BrowsePets) and scrolls up -> snap to index 0
      // All other scrolls should be allowed (including scrolling down from BrowsePets)
      if (currentIndex === 0 && isScrollingDown) {
        // from Home -> BrowsePets
        currentSectionIndex = 1;
      } else if (currentIndex === 1 && !isScrollingDown) {
        // from BrowsePets -> Home (scrolling up)
        currentSectionIndex = 0;
      } else {
        // allow normal scrolling
        return;
      }

      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      // Prevent default scroll and perform snap
      e.preventDefault();
      snapToSection(currentSectionIndex, sections);
    };

    const snapToSection = (index, sections) => {
      isScrollingRef.current = true;

      const targetSection = sections[index];
      const targetPosition = targetSection.offsetTop;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Re-enable scrolling after animation completes
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200); // Match smooth scroll duration
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return containerRef;
};
