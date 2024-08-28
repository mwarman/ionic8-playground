import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { boolean, object } from 'yup';

import { useGetSettings } from 'common/api/useGetSettings';
import { BaseComponentProps } from 'common/components/types';
import { Settings } from 'common/models/settings';
import { useUpdateSettings } from 'common/api/useUpdateSettings';
import { useProgress } from 'common/hooks/useProgress';
import { useToasts } from 'common/hooks/useToasts';
import { DismissButton } from 'common/components/Toast/Toast';
import ToggleInput from 'common/components/Input/ToggleInput';
import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';

type SettingsFormValues = Pick<Settings, 'allowNotifications'>;

const validationSchema = object<SettingsFormValues>({
  allowNotifications: boolean(),
});

const SettingsForm = ({
  className,
  testid = 'form-settings',
}: BaseComponentProps): JSX.Element | false => {
  const { data: settings, isLoading } = useGetSettings();
  const { mutate: updateSettings } = useUpdateSettings();
  const { setProgress } = useProgress();
  const { createToast } = useToasts();

  if (isLoading) {
    return (
      <IonList className={classNames('form-settings', className)} data-testid={testid}>
        <IonListHeader>
          <IonLabel>Settings</IonLabel>
        </IonListHeader>
        <IonItem lines="full">
          <LoaderSkeleton animated heightStyle="1.5rem" />
        </IonItem>
      </IonList>
    );
  }

  if (settings) {
    return (
      <Formik<SettingsFormValues>
        enableReinitialize={true}
        initialValues={{
          allowNotifications: settings.allowNotifications,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setProgress(true);
          updateSettings(
            { settings: values },
            {
              onSuccess: () => {
                createToast({
                  message: 'Settings updated.',
                  duration: 3000,
                  buttons: [DismissButton],
                });
              },
              onError: () => {
                createToast({
                  message: 'Unable to update settings.',
                  buttons: [DismissButton],
                  color: 'danger',
                });
              },
              onSettled: () => {
                setProgress(false);
                setSubmitting(false);
              },
            },
          );
        }}
        validationSchema={validationSchema}
        data-testid={testid}
      >
        {({ isSubmitting, submitForm }) => (
          <Form>
            <IonList className={classNames('form-settings', className)}>
              <IonListHeader>
                <IonLabel>Settings</IonLabel>
              </IonListHeader>
              <IonItem lines="full">
                <ToggleInput
                  name="allowNotifications"
                  disabled={isSubmitting}
                  onIonChange={() => submitForm()}
                  testid={`${testid}-field-allowNotifications`}
                >
                  Notifications
                </ToggleInput>
              </IonItem>
            </IonList>
          </Form>
        )}
      </Formik>
    );
  } else {
    return false;
  }
};

export default SettingsForm;
