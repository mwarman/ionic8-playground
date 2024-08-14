import { ComponentPropsWithoutRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBuilding,
  faCircleInfo,
  faEnvelope,
  faHouse,
  faLink,
  faMapLocationDot,
  faPenToSquare,
  faPhone,
  faSignOutAlt,
  faTrash,
  faTriangleExclamation,
  faUser,
  faUserGear,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { BaseComponentProps } from '../types';

/**
 * Properties for the `Icon` component.
 * @see {@link BaseComponentProps}
 * @see {@link FontAwesomeIcon}
 */
export interface IconProps
  extends BaseComponentProps,
    Omit<ComponentPropsWithoutRef<typeof FontAwesomeIcon>, 'icon'> {
  icon: IconName;
}

/**
 * Icon names.
 */
export enum IconName {
  Building = 'building',
  CircleInfo = 'circle_info',
  Envelope = 'envelope',
  House = 'house',
  Link = 'link',
  MapLocationDot = 'map_location_dot',
  PenToSquare = 'pen_to_square',
  Phone = 'phone',
  SignOut = 'sign_out',
  Trash = 'trash',
  TriangleExclamation = 'triangle_exclamation',
  User = 'user',
  Users = 'users',
  UserGear = 'user_gear',
}

/**
 * A key/value mapping of every icon used in the application.
 */
const icons: Record<IconName, IconProp> = {
  building: faBuilding,
  circle_info: faCircleInfo,
  envelope: faEnvelope,
  house: faHouse,
  link: faLink,
  map_location_dot: faMapLocationDot,
  pen_to_square: faPenToSquare,
  phone: faPhone,
  sign_out: faSignOutAlt,
  trash: faTrash,
  triangle_exclamation: faTriangleExclamation,
  user_gear: faUserGear,
  user: faUser,
  users: faUsers,
};

/**
 * The `Icon` component renders an icon. Wraps the `FontAwesomeIcon` component.
 *
 * @param {IconProps} props - Component properties.
 * @returns {JSX.Element} JSX
 * @see {@link FontAwesomeIcon}
 */
const Icon = ({ className, icon, testid = 'icon', ...iconProps }: IconProps): JSX.Element => {
  const faIcon = icons[icon];
  return (
    <FontAwesomeIcon
      className={classNames('icon', className)}
      icon={faIcon}
      {...iconProps}
      data-testid={testid}
    />
  );
};

export default Icon;