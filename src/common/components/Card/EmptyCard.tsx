import { useTranslation } from 'react-i18next';

import MessageCard, { MessageCardProps } from './MessageCard';
import { IconName } from '../Icon/Icon';

/**
 * Properties for the `EmptyCard` component.
 * @see {@link MessageCard}
 */
interface EmptyCardProps extends MessageCardProps {}

/**
 * The `EmptyCard` component renders a `MessageCard` displaying information
 * when there is no data to display. For example, when a list of items has
 * no items to display.
 * @param {EmptyCardProps} props - Component properties.
 * @returns JSX
 */
const EmptyCard = ({
  icon = IconName.CircleInfo,
  testid = 'card-empty',
  title,
  ...cardProps
}: EmptyCardProps): JSX.Element => {
  const { t } = useTranslation();
  title ??= t('error-no-data');

  return <MessageCard icon={icon} testid={testid} title={title} {...cardProps} />;
};

export default EmptyCard;
