// import { SafeMotion } from '@components/SafeMotion';
// import translate from '@utils/translate';
// import { useState } from 'react';
// export default function ModalSection() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [hasVisited, setHasVisited] = useLocalStorage();
// useEffect(() => {
//   const hasVisited = localStorage.getItem('hasVisited');
//   if (!hasVisited) {
//     setIsModalOpen(true);
//     localStorage.setItem('hasVisited', 'true');
//   }
// }, []);

//   return (
//     <>
//       {isModalOpen && (
//         <AnimatePresence>
//           <SafeMotion
//             className="fixed z-50 inset-0 p-4 bg-black bg-opacity-50 flex justify-center items-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="bg-white p-8 rounded-lg sm:shadow-lg max-w-lg w-full text-center">
//               <h3 className="text-xl font-bold mb-4">
//                 {translate('key_new_features')}
//               </h3>
//               <p className="text-gray-700 mb-6">
//                 {translate('key_what_has_changed')}
//               </p>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="bg-primary hover:bg-black transition-all px-6 py-3 rounded-lg text-white"
//               >
//                 {translate('key_close')}
//               </button>
//             </div>
//           </SafeMotion>
//         </AnimatePresence>
//       )}
//     </>
//   );
// }
