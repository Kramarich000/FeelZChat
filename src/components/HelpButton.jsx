import translate from '@utils/translate';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsQuestionSquareFill } from 'react-icons/bs';
export default function HelpButton() {
  return (
    <Link to={'/help'}>
      <motion.div
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
      </motion.div>
    </Link>
  );
}
