// // useSmoothScroll.js
// import { useEffect } from 'react';

// export function useSmoothScrollbar({ smoothing = 0.08 } = {}) {
//   useEffect(() => {
//     let target = window.scrollY;
//     let current = target;
//     let ticking = false;

//     function onWheel(e) {
//       e.preventDefault();
//       const max = document.documentElement.scrollHeight - window.innerHeight;
//       target = Math.max(0, Math.min(max, target + e.deltaY));

//       if (!ticking) {
//         ticking = true;
//         requestAnimationFrame(() => {
//           current += (target - current) * smoothing;
//           window.scrollTo(0, current);
//           ticking = false;
//         });
//       }
//     }

//     window.addEventListener('wheel', onWheel, { passive: false });
//     return () => {
//       window.removeEventListener('wheel', onWheel);
//     };
//   }, [smoothing]);
// }
