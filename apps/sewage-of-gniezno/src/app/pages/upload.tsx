import { useState } from 'react';
import styled from 'styled-components';
import uploadFiles from '../actions/upload_files';
import BigDropzone from './components/big_dropzone';
import { ArrowForward } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';

const Layout = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  background-image: url('../../../assets/background.jpg');
  transform: scaleX(-1);
  > * {
    transform: scaleX(-1);
  }
`;

const SpaceAround = styled.div`
  display: flex;
  justify-content: space-around;
`;

const BigFileUploader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #dee2e6;
  border-radius: 16px;
  padding: 8px 32px 32px 32px;
  background-color: white;
  box-sizing: border-box;
  width: 33%;
`;

const SmallFileUploader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #dee2e6;
  border-radius: 16px;
  padding: 8px 32px 32px 32px;
  background-color: white;
  box-sizing: border-box;
  width: 15%;
`;

const Subheading = styled.h2``;

const Button = styled.div`
  display: flex;
  width: 25%;
  justify-content: center;
  align-items: center;
  align-self: start;
  margin: 32px 124px;
  border-radius: 16px;
  font-size: 24px;
  padding: 16px;
  background-color: darkgreen;
  color: #dee2e6;
  cursor: pointer;
  &:hover {
    background-color: #318c2c;
    * :nth-child(2) {
      transform: translate(16px) scale(1.5);
    }
  }
`;

const ButtonArrow = styled(ArrowForward)`
  && {
    margin-left: 8px;
    fontsize: 24px;
    transition: transform 200ms;
  }
`;

const Upload = () => {
  const [declaredSewage, setDeclaredSewage] = useState<File | null>(null);
  const [realSewage, setRealSewage] = useState<File | null>(null);
  const [waterConsumption, setWaterConsumption] = useState<File | null>(null);
  const [sewageReception, setSewageReception] = useState<File | null>(null);
  const [companies, setCompanies] = useState<File | null>(null);
  const [containers, setContainers] = useState<File | null>(null);
  const [meters, setMeters] = useState<File | null>(null);
  const [residents, setResidents] = useState<File | null>(null);

  const navigate = useNavigate();

  const { mutate: upload } = useMutation(
    'upload-files',
    () =>
      uploadFiles({
        declaredSewage,
        realSewage,
        waterConsumption,
        sewageReception,
        companies,
        containers,
        meters,
        residents,
      }),
    {
      onSuccess: () => navigate('/results'),
      onError: () => {
        toast.error('Wystąpił błąd');
      },
    }
  );

  return (
    <Layout>
      <SpaceAround>
        <BigFileUploader>
          <Subheading>Zadeklarowane Ścieki</Subheading>
          <BigDropzone file={declaredSewage} setFile={setDeclaredSewage} />
        </BigFileUploader>
        <BigFileUploader>
          <Subheading>Rzeczywiste Ścieki</Subheading>
          <BigDropzone file={realSewage} setFile={setRealSewage} />
        </BigFileUploader>
      </SpaceAround>
      <SpaceAround>
        <BigFileUploader>
          <Subheading>Zużycie wody</Subheading>
          <BigDropzone file={waterConsumption} setFile={setWaterConsumption} />
        </BigFileUploader>
        <BigFileUploader>
          <Subheading>Odbiór ścieków</Subheading>
          <BigDropzone file={sewageReception} setFile={setSewageReception} />
        </BigFileUploader>
      </SpaceAround>
      <SpaceAround>
        <SmallFileUploader>
          <Subheading>Firmy ascenizacyjne</Subheading>
          <BigDropzone file={companies} setFile={setCompanies} />
        </SmallFileUploader>
        <SmallFileUploader>
          <Subheading>Zbiorniki</Subheading>
          <BigDropzone file={containers} setFile={setContainers} />
        </SmallFileUploader>
        <SmallFileUploader>
          <Subheading>Liczniki</Subheading>
          <BigDropzone file={meters} setFile={setMeters} />
        </SmallFileUploader>
        <SmallFileUploader>
          <Subheading>Osoby zamieszkałe</Subheading>
          <BigDropzone file={residents} setFile={setResidents} />
        </SmallFileUploader>
      </SpaceAround>
      <Button onClick={() => upload()}>
        <span>Zaimportuj dane</span>
        <ButtonArrow />
      </Button>
    </Layout>
  );
};

export default Upload;
