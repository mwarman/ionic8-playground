import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import { useEffect } from 'react';

import './SignOutPage.scss';
import { PropsWithTestId } from 'common/components/types';
import { useSignOut } from './api/useSignOut';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';

/**
 * The `SignOutPage` renders a loader while the application removes
 * authentication state from the currently signed in user.
 * @param {PropsWithTestId} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const SignOutPage = ({ testid = 'page-signout' }: PropsWithTestId): JSX.Element => {
  const router = useIonRouter();
  const { mutate: signOut } = useSignOut();

  useEffect(() => {
    signOut(undefined, {
      onSuccess: () => {
        router.push('/auth/signin', 'forward', 'replace');
      },
      onError: () => {
        // TODO handle sign out error
        router.push('/tabs/home', 'forward', 'replace');
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage className="page-signout" data-testid={testid}>
      <IonContent fullscreen>
        <LoaderSpinner />
      </IonContent>
    </IonPage>
  );
};

export default SignOutPage;