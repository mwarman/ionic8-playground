import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { home, people } from 'ionicons/icons';
import classNames from 'classnames';

import './AppMenu.scss';
import { BaseComponentProps } from '../types';

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
  return (
    <IonMenu
      className={classNames('menu-app', className)}
      contentId="content-main"
      data-testid={testid}
      menuId="menu-app"
      side="end"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle data-testid={`${testid}-title`}>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonMenuToggle>
          <IonItem routerLink="/tabs/home" lines="full" data-testid={`${testid}-item-home`}>
            <IonIcon icon={home} className="icon" />
            <IonLabel>Home</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem routerLink="/tabs/users" lines="full" data-testid={`${testid}-item-users`}>
            <IonIcon icon={people} className="icon" />
            <IonLabel>Users</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
