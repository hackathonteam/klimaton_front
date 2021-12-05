import { useState } from 'react';
import styled from 'styled-components';
import uploadFiles from '../actions/upload_files';
import BigDropzone from './components/big_dropzone';
import { ArrowForward } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar_vert';
import getLastModifiedInfo from '../actions/get_last_modified_info';

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
`;

const ContentLayout = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  background-color: #6377c6;
  background-image: url('../../../assets/background.jpg');
  transform: scaleX(-1);
  > * {
    transform: scaleX(-1);
  }
  transition: background-image 200ms;
`;

const Grid = styled.div`
  display: grid;
  grid-template: repeat(4, calc(25% - 64px)) / repeat(4, calc(25% - 64px));
  background-color: #6377c6;
  background-image: url('../../../assets/background.jpg');
  padding: 64px;
  grid-gap: 64px;
`;

const BigFileUploader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #dee2e6;
  border-radius: 16px;
  padding: 8px 32px 8px 32px;
  background-color: white;
  box-sizing: border-box;
  grid-column: span 2;
`;

const SmallFileUploader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #dee2e6;
  border-radius: 16px;
  padding: 8px 32px 8px 32px;
  background-color: white;
  box-sizing: border-box;
`;

const Subheading = styled.h2``;

const Button = styled.div`
  display: flex;
  height: 25%;
  justify-content: center;
  align-items: center;
  align-self: end;
  border-radius: 16px;
  font-size: 24px;
  padding: 16px;
  background-color: darkgreen;
  color: #dee2e6;
  cursor: pointer;
  grid-column: 4;
  &:hover {
    background-color: #318c2c;
    * :nth-child(2) {
      transform: translate(8px) scale(1.25);
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

const LastModifiedInfo = styled.p`
  text-align: center;
  margin: 0;
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
      onSuccess: () =>
        navigate('/results', { state: { imported: true } } as NavigateOptions),
      onError: () => {
        toast.error('Wystąpił błąd');
      },
    }
  );

  const { data: lastModifiedData } = useQuery(
    'last-modified',
    getLastModifiedInfo
  );

  const areFilesSelected = [
    declaredSewage,
    realSewage,
    waterConsumption,
    sewageReception,
    companies,
    containers,
    meters,
    residents,
  ].some((value) => value);

  return (
    <Layout>
      <Navbar />
      <Grid>
        <BigFileUploader>
          <Subheading>Zadeklarowane Ścieki</Subheading>
          <BigDropzone file={declaredSewage} setFile={setDeclaredSewage} />
          {!declaredSewage && lastModifiedData && (
            <LastModifiedInfo>
              Ostatnia aktualizacja:{' '}
              {lastModifiedData?.declaredSewage || 'nigdy'}
            </LastModifiedInfo>
          )}
        </BigFileUploader>
        <BigFileUploader>
          <Subheading>Rzeczywiste Ścieki</Subheading>
          <BigDropzone file={realSewage} setFile={setRealSewage} />
          {!realSewage && lastModifiedData && (
            <LastModifiedInfo>
              Ostatnia aktualizacja: {lastModifiedData?.realSewage || 'nigdy'}
            </LastModifiedInfo>
          )}
        </BigFileUploader>

        <BigFileUploader>
          <Subheading>Zużycie wody</Subheading>
          <BigDropzone file={waterConsumption} setFile={setWaterConsumption} />
          {!waterConsumption && lastModifiedData && (
            <LastModifiedInfo>
              Ostatnia aktualizacja:{' '}
              {lastModifiedData?.waterConsumption || 'nigdy'}
            </LastModifiedInfo>
          )}
        </BigFileUploader>
        <BigFileUploader>
          <Subheading>Odbiór ścieków</Subheading>
          <BigDropzone file={sewageReception} setFile={setSewageReception} />
          {!sewageReception && lastModifiedData && (
            <LastModifiedInfo>
              Ostatnia aktualizacja:{' '}
              {lastModifiedData?.sewageReception || 'nigdy'}
            </LastModifiedInfo>
          )}
        </BigFileUploader>

        <SmallFileUploader>
          <Subheading>Firmy ascenizacyjne</Subheading>
          <BigDropzone file={companies} setFile={setCompanies} />
          {!companies && lastModifiedData && (
            <LastModifiedInfo>
              Ostatnia aktualizacja: {lastModifiedData?.companies || 'nigdy'}
            </LastModifiedInfo>
          )}
        </SmallFileUploader>
        <SmallFileUploader>
          <Subheading>Zbiorniki</Subheading>
          <BigDropzone file={containers} setFile={setContainers} />
          {!containers && lastModifiedData && (
            <LastModifiedInfo>
              Ostatnia aktualizacja: {lastModifiedData?.containers || 'nigdy'}
            </LastModifiedInfo>
          )}
        </SmallFileUploader>
        <SmallFileUploader>
          <Subheading>Liczniki</Subheading>
          <BigDropzone file={meters} setFile={setMeters} />
          {!meters && lastModifiedData && (
            <LastModifiedInfo>
              Ostatnia aktualizacja: {lastModifiedData?.meters || 'nigdy'}
            </LastModifiedInfo>
          )}
        </SmallFileUploader>
        <SmallFileUploader>
          <Subheading>Osoby zamieszkałe</Subheading>
          <BigDropzone file={residents} setFile={setResidents} />
          {!residents && lastModifiedData && (
            <LastModifiedInfo>
              Ostatnia aktualizacja: {lastModifiedData?.residents || 'nigdy'}
            </LastModifiedInfo>
          )}
        </SmallFileUploader>

        <Button
          onClick={() => {
            if (!areFilesSelected) {
              navigate('/results');
              return;
            }
            upload();
          }}
        >
          <span>
            {areFilesSelected ? 'Zaimportuj dane' : 'Przejdź do strony głównej'}
          </span>
          <ButtonArrow />
        </Button>
      </Grid>
    </Layout>
  );
};

export default Upload;
