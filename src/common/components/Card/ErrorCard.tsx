import { useTranslation } from 'react-i18next';

import MessageCard, { MessageCardProps } from './MessageCard';
import { IconName } from '../Icon/Icon';

/**
 * Properties for the `ErrorCard` component.
 * @see {@link MessageCardProps}
 */
interface ErrorCardProps extends MessageCardProps {}

/**
 * The `ErrorCard` component renders a `MessageCard` displaying information
 * describing an exceptional event which has occurred.
 * @param {ErrorCardProps} props - Component properties.
 * @returns JSX
 */
const ErrorCard = ({
  color = 'danger',
  icon = IconName.TriangleExclamation,
  testid = 'card-error',
  title,
  ...cardProps
}: ErrorCardProps): JSX.Element => {
  const { t } = useTranslation();
  title ??= t('error-generic');

  return <MessageCard color={color} icon={icon} testid={testid} title={title} {...cardProps} />;
};

export default ErrorCard;
