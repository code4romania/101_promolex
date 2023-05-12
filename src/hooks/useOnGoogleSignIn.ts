import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { auth } from '../utils';

const googleProvider = new GoogleAuthProvider();

export const useOnGoogleSignIn = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const onGoogleSignIn = useCallback(() => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider).finally(() => {
      setIsLoading(false);
      onSuccess();
    });
  }, [onSuccess]);

  return { isLoading, onGoogleSignIn };
};
