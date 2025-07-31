// src/components/TrackingPixel.tsx
'use client';

import { useEffect } from 'react';

interface TrackingPixelProps {
  type: 'proposal' | 'questionnaire' | 'portal';
  id: string;
  event?: string;
  section?: string; // For portal sections like 'dashboard', 'reports', etc.
}

export default function TrackingPixel({ type, id, event = 'open', section }: TrackingPixelProps) {
  useEffect(() => {
    // Build pixel URL with optional section
    let pixelUrl = `/api/pixel?type=${type}&id=${id}&event=${event}`;
    if (section) {
      pixelUrl += `&section=${section}`;
    }

    // Load the tracking pixel when component mounts
    const img = new Image();
    img.src = pixelUrl;
    
    console.log(`📊 Loading tracking pixel: ${type}/${id}/${event}${section ? `/${section}` : ''}`);
    
    // Optional: Track scroll events
    if (event === 'open') {
      let scrollTracked = false;
      const handleScroll = () => {
        if (!scrollTracked && window.scrollY > 100) {
          scrollTracked = true;
          const scrollImg = new Image();
          let scrollUrl = `/api/pixel?type=${type}&id=${id}&event=scroll`;
          if (section) {
            scrollUrl += `&section=${section}`;
          }
          scrollImg.src = scrollUrl;
          console.log(`📊 Scroll tracking: ${type}/${id}${section ? `/${section}` : ''}`);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [type, id, event, section]);

  // Return invisible div (pixel is loaded via JavaScript to avoid layout issues)
  return <div style={{ display: 'none' }} data-tracking={`${type}-${id}-${event}${section ? `-${section}` : ''}`} />;
}

// Also export a hook for more advanced tracking
export function useTracking(type: 'proposal' | 'questionnaire' | 'portal', id: string) {
  const track = (event: string, section?: string) => {
    let pixelUrl = `/api/pixel?type=${type}&id=${id}&event=${event}`;
    if (section) {
      pixelUrl += `&section=${section}`;
    }
    const img = new Image();
    img.src = pixelUrl;
    console.log(`📊 Manual tracking: ${type}/${id}/${event}${section ? `/${section}` : ''}`);
  };

  return { track };
}