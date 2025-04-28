import React from 'react';
import { Link } from 'react-router-dom';
import { BsEmojiTearFill } from 'react-icons/bs';
import translate from '../utils/translate';

const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {translate('key_back_to_home')}
    </div>
  );
};

export default Profile;
