import { motion } from 'framer-motion';
import Header from '@components/Header';
import Footer from '@components/Footer';
import translate from '../utils/translate';

export default function Privacy() {
  return (
    <div className="absolute top-0 left-0 min-h-full w-full bg-blue-200 flex flex-col justify-center items-center">
      <Header />
      <motion.div
        layout
        initial={{ opacity: 0, transform: 'translateY(-50px)' }}
        animate={{ opacity: 1, transform: 'translateY(0)' }}
        exit={{ opacity: 0, transform: 'translateY(-50px)' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container p-10 m-10 max-w-[1200px] bg-white rounded-2xl border-b-20 border-primary border-r-100">
          <h1 className="text-4xl font-bold mb-4">
            {translate('key_privacy')}
          </h1>
          <div className="text-lg space-y-4">
            <p>{translate('key_privacy_intro')}</p>
            <h2 className="text-2xl font-medium">
              {translate('key_section_data_collection')}
            </h2>
            <p>{translate('key_data_collection')}</p>
            <h2 className="text-2xl font-medium">
              {translate('key_section_data_usage')}
            </h2>
            <p>{translate('key_data_usage')}</p>
            <h2 className="text-2xl font-medium">
              {translate('key_section_data_protection')}
            </h2>
            <p>{translate('key_data_protection')}</p>
            <h2 className="text-2xl font-medium">
              {translate('key_section_data_sharing')}
            </h2>
            <p>{translate('key_data_sharing')}</p>
            <h2 className="text-2xl font-medium">
              {translate('key_section_policy_changes')}
            </h2>
            <p>{translate('key_policy_changes')}</p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
