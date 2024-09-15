import {
  Button,
  Loader,
  Modal,
  TextInput,
  UnstyledButton,
  Notification,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './ContactUsModal.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import i18n from '../../../../../../i18n';
import { FormDataType } from '../../../../../../types/types';
import validateForm from '../../../../../../utils/validateForm';

export default function ContactUsModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  const { language } = i18n;

  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    surname: '',
    birthdate: '',
    city: '',
    email: '',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    name: '',
    surname: '',
    birthdate: '',
    city: '',
    email: '',
    phone: '',
  });

  const fields: string[] = [
    'name',
    'surname',
    'birthdate',
    'city',
    'email',
    'phone',
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value.trim()) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const isFormValid = () => {
    const { valid, errors } = validateForm(formData, t, language);
    setFormErrors(errors);
    return valid;
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (isFormValid()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowNotification(true);
        setFormData({
          name: '',
          surname: '',
          birthdate: '',
          city: '',
          email: '',
          phone: '',
        });
        close();
      }, 2000);
    }
  };

  const handleModalClose = () => {
    setFormData({
      name: '',
      surname: '',
      birthdate: '',
      city: '',
      email: '',
      phone: '',
    });
    setFormErrors({
      name: '',
      surname: '',
      birthdate: '',
      city: '',
      email: '',
      phone: '',
    });
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleModalClose}
        title={t('formTitle')}
        size="xl"
      >
        <section className="sectionModal">
          {loading && (
            <div className="loader container">
              <Loader
                size="xl"
                color="#61a9c7"
                variant="dots"
                data-testid="formLoader"
              />
            </div>
          )}
          <form className="form">
            <div className="inputContainer">
              {fields.map((field) => {
                return (
                  <TextInput
                    label={t(field)}
                    variant="filled"
                    radius={50}
                    className={` input ${field}`}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    error={formErrors[field]}
                    placeholder={t(field)}
                    required
                    key={field}
                    data-testid={field}
                  />
                );
              })}
            </div>

            <Button
              size="md"
              color="#61a9c7"
              type="button"
              onClick={handleSubmit}
              className="formButton"
              data-testid="submitFormButton"
            >
              {t('submit')}
            </Button>
          </form>
        </section>
      </Modal>

      <UnstyledButton onClick={open} className="contactButton">
        {t('contactUs')}
      </UnstyledButton>

      {showNotification && (
        <Notification
          title={t('perfect')}
          color="#61a9c7"
          onClose={() => setShowNotification(false)}
          className="notification"
          data-testid="notification"
        >
          {t('message-sent')}
        </Notification>
      )}
    </>
  );
}
