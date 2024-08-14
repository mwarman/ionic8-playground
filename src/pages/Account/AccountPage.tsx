import { IonContent, IonItem, IonLabel, IonList, IonListHeader, IonPage } from '@ionic/react';

import './AccountPage.scss';
import { PropsWithTestId } from 'common/components/types';
import { useConfig } from 'common/hooks/useConfig';
import Header from 'common/components/Header/Header';
import Container from 'common/components/Content/Container';

/**
 * The `AccountPage` component renders a list of account related items which
 * a user may perform.
 * @param {PropsWithTestId} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const AccountPage = ({ testid = 'page-account' }: PropsWithTestId): JSX.Element => {
  const config = useConfig();

  const version = `${config.VITE_BUILD_TS}.${config.VITE_BUILD_COMMIT_SHA}`;

  return (
    <IonPage className="page-account" data-testid={testid}>
      <Header title="My Account" />

      <IonContent fullscreen>
        <Container fixed>
          <IonList>
            <IonListHeader>
              <IonLabel>Account</IonLabel>
            </IonListHeader>
            <IonItem lines="full">
              <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem lines="full" routerLink="/auth/signout">
              <IonLabel>Sign Out</IonLabel>
            </IonItem>
          </IonList>

          <IonList>
            <IonListHeader>
              <IonLabel>Settings</IonLabel>
            </IonListHeader>
            <IonList>
              <IonItem>
                <IonLabel>Version {version}</IonLabel>
              </IonItem>
            </IonList>
          </IonList>

          <IonList>
            <IonListHeader>
              <IonLabel>Legal</IonLabel>
            </IonListHeader>
            <IonItem lines="full">
              <IonLabel>Privacy policy</IonLabel>
            </IonItem>
            <IonItem lines="full">
              <IonLabel>Terms and conditions</IonLabel>
            </IonItem>
          </IonList>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AccountPage;