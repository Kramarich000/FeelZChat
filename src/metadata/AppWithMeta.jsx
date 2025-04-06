import { useEffect } from 'react';
import App from '../App';

export default function AppWithMeta() {
    useEffect(() => {
      document.title = "FeelZChat";  
      
      const metaTitle = document.querySelector('meta[property="og:title"]');
      const metaDescription = document.querySelector('meta[property="og:description"]');
      const metaImage = document.querySelector('meta[property="og:image"]');
      
      if (metaTitle) metaTitle.setAttribute("content", "FeelZChat");
      if (metaDescription) metaDescription.setAttribute("content", "A modern messaging app for seamless communication.");
      if (metaImage) metaImage.setAttribute("content", "https://example.com/preview-image.jpg");
  
    }, []);  
  
    return <App />;
  }