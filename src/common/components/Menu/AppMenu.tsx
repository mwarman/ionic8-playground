import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import './AppMenu.scss';
import { BaseComponentProps } from '../types';
import { useAuth } from 'common/hooks/useAuth';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import Avatar from '../Icon/Avatar';
import Icon, { IconName } from '../Icon/Icon';

/**
 * Properties for the `AppMenu` component.
 * @see {@link BaseComponentProps}
 */
interface AppMenuProps extends BaseComponentProps {}

/**
 * The `AppMenu` component renders the main application menu. Facilitates
 * navigation throughout the major sections of the application.
 * @param {AppMenuProps} props - Component properties.
 * @returns JSX
 */
const AppMenu = ({ className, testid = 'menu-app' }: AppMenuProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { data: currentUser } = useGetCurrentUser();
  const { t } = useTranslation();

  const showUserHeader = isAuthenticated && !!currentUser;

  return (
    <IonMenu
      className={classNames('ls-app-menu', className)}
      contentId="content-main"
      data-testid={testid}
      menuId="menu-app"
      side="end"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ls-app-menu__title" data-testid={`${testid}-title`}>
            {showUserHeader ? (
              <IonRow className="ion-align-items-center">
                <Avatar className="ls-app-menu__title-avatar" value={currentUser.name} />
                <div>{currentUser.name}</div>
              </IonRow>
            ) : (
              <>Menu</>
            )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isAuthenticated && (
          <>
            <IonMenuToggle>
              <IonItem routerLink="/tabs/home" lines="full" data-testid={`${testid}-item-home`}>
                <Icon className="ls-app-menu__toggle-icon" icon={IconName.House} fixedWidth />
                <IonLabel>{t('navigation.home')}</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/tabs/users" lines="full" data-testid={`${testid}-item-users`}>
                <Icon className="ls-app-menu__toggle-icon" icon={IconName.Users} fixedWidth />
                <IonLabel>{t('navigation.users')}</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem
                routerLink="/tabs/account"
                lines="full"
                data-testid={`${testid}-item-account`}
              >
                <Icon className="ls-app-menu__toggle-icon" icon={IconName.UserGear} fixedWidth />
                <IonLabel>{t('navigation.account')}</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem
                routerLink="/auth/signout"
                lines="full"
                data-testid={`${testid}-item-signout`}
              >
                <Icon className="ls-app-menu__toggle-icon" icon={IconName.SignOut} fixedWidth />
                <IonLabel>{t('navigation.signout')}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
