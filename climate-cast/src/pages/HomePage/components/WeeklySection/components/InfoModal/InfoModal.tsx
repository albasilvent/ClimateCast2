import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import './InfoModal.scss';
import { IoArrowDown } from 'react-icons/io5';
import DailySection from '../../../DailySection/DailySection';

interface InfoModalProps {
  dailyData: any;
}

export default function InfoModal({ dailyData }: InfoModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={t('info')}
        size="1700px"
        centered
        data-testid="infoModal"
      >
        <DailySection dailyData={dailyData} />
      </Modal>

      <Button
        onClick={open}
        className="modalButton"
        color="#75c1e2"
        rightSection={<IoArrowDown size={20} />}
      >
        {t('forecast')}
      </Button>
    </>
  );
}
