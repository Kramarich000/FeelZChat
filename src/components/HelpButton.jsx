import translate from '@utils/translate';
import { motion } from 'framer-motion';
import { SafeMotion } from '@components/SafeMotion';
import { BsQuestionSquareFill } from 'react-icons/bs';
import PrefetchLink from '@components/PrefetchLink';
export default function HelpButton() {
  return (
    <PrefetchLink to={'/help'}>
      <SafeMotion
        initial={{ opacity: 0, transform: 'translateY(50px)' }}
        animate={{ opacity: 1, transform: 'translateY(0)' }}
        exit={{ opacity: 0, transform: 'translateY(50px)' }}
        transition={{ duration: 0.5 }}
        className="help-btn-container fixed bottom-10 left-10 flex items-center justify-center gap-5 hover:border-black transition-colors bg-amber-50 border-primary border-b-8 p-3 rounded-4xl"
      >
        <p>{translate('key_have_questions')}</p>
        <BsQuestionSquareFill
          className="help-btn-icon"
          size={50}
          color="rgb(14, 116, 144)"
        />
      </SafeMotion>
    </PrefetchLink>
  );
}
