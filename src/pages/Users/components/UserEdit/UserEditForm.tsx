import { useState } from 'react';
import { IonButton, IonRow, useIonRouter } from '@ionic/react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import classNames from 'classnames';

import './UserEditForm.scss';
import { BaseComponentProps } from 'common/components/types';
import { User } from 'common/models/user';
import { useUpdateUser } from 'pages/Users/api/useUpdateUser';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import Input from 'common/components/Input/Input';
import CardRow from 'common/components/Card/CardRow';
import ErrorCard from 'common/components/Card/ErrorCard';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';
import Icon, { IconName } from 'common/components/Icon/Icon';

/**
 * Properties for the `UserEditForm` component.
 * @see {@link BaseComponentProps}
 */
interface UserEditFormProps extends BaseComponentProps {
  user: User;
}

/**
 * User edit form values.
 * @param {User} user - A `User` object.
 */
interface UserEditFormValues {
  user: User;
}

/**
 * User edit form validation schema.
 */
const validationSchema = object<UserEditFormValues>({
  user: object({
    name: string().required('Required. '),
    username: string()
      .required('Required. ')
      .min(8, 'Must be at least 8 characters. ')
      .max(30, 'Must be at most 30 characters. '),
    email: string().required('Required. ').email('Must be an email address. '),
    phone: string().required('Required. '),
    website: string().url('Must be a URL. '),
  }),
});

/**
 * The `UserEditForm` component renders a Formik form for editing a `User`.
 * @param {UserEditFormProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const UserEditForm = ({
  className,
  user,
  testid = 'form-user-edit',
}: UserEditFormProps): JSX.Element => {
  const router = useIonRouter();
  const [error, setError] = useState<string>('');
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { createToast } = useToasts();

  const onCancel = () => {
    router.goBack();
  };

  return (
    <div className={classNames('form-user-edit', className)} data-testid={testid}>
      {error && (
        <CardRow className="row-message" testid={`${testid}-error`}>
          <ErrorCard content={`We are experiencing problems processing your request. ${error}`} />
        </CardRow>
      )}
      <Formik<UserEditFormValues>
        enableReinitialize={true}
        initialValues={{ user: user }}
        onSubmit={(values, { setSubmitting }) => {
          setError('');
          updateUser(
            { user: { ...user, ...values.user } },
            {
              onSuccess: (user) => {
                setSubmitting(false);
                createToast({
                  buttons: [DismissButton],
                  duration: 5000,
                  message: `${user.name} updated`,
                });
                if (router.canGoBack()) {
                  router.goBack();
                } else {
                  router.push(`/tabs/users/${user.id}`, 'back', 'replace');
                }
              },
              onError(error) {
                setError(error.message);
                setSubmitting(false);
              },
            },
          );
        }}
        validationSchema={validationSchema}
      >
        {({ dirty, isSubmitting }) => (
          <Form data-testid={`${testid}-form`}>
            <section>
              <IonRow className="section-heading">
                <Icon icon={IconName.User} />
                <div>Contact Info</div>
              </IonRow>
              <Input
                name="user.name"
                label="Name"
                labelPlacement="stacked"
                disabled={isSubmitting}
                required
                autoFocus
                data-testid={`${testid}-field-name`}
              ></Input>
              <Input
                name="user.username"
                label="Username"
                labelPlacement="stacked"
                disabled={isSubmitting}
                minlength={8}
                maxlength={30}
                data-testid={`${testid}-field-username`}
              ></Input>
              <Input
                name="user.email"
                type="email"
                label="Email"
                labelPlacement="stacked"
                disabled={isSubmitting}
                required
                data-testid={`${testid}-field-email`}
              ></Input>
              <Input
                name="user.phone"
                label="Phone"
                labelPlacement="stacked"
                disabled={isSubmitting}
                required
                data-testid={`${testid}-field-phone`}
              ></Input>
              <Input
                name="user.website"
                label="Website"
                labelPlacement="stacked"
                disabled={isSubmitting}
                data-testid={`${testid}-field-website`}
              ></Input>
            </section>

            <div className="buttons">
              <IonButton
                type="button"
                color="secondary"
                fill="clear"
                disabled={isSubmitting}
                onClick={onCancel}
                data-testid={`${testid}-button-cancel`}
              >
                Cancel
              </IonButton>
              <IonButton
                type="submit"
                color="primary"
                disabled={isSubmitting || !dirty}
                data-testid={`${testid}-button-submit`}
              >
                {isPending ? <LoaderSpinner className="spinner-button-save" /> : 'Save'}
              </IonButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserEditForm;
