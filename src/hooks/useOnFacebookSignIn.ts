import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { auth } from '../utils';

const facebookProvider = new FacebookAuthProvider();

export const useOnFacebookSignIn = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFacebookSignIn = useCallback(() => {
    setIsLoading(true);
    signInWithPopup(auth, facebookProvider).finally(() => {
      setIsLoading(false);
      onSuccess();
    });
  }, [onSuccess]);

  return { isLoading, onFacebookSignIn };
};
