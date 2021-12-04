import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';

const DropzoneArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  border: 1px dashed #495057;
  border-radius: 15px;
  color: gray;
  cursor: pointer;
  padding: 32px;
  background-color: rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  transition: background-color 200ms;
  box-sizing: border-box;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2px;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
`;

const CloseButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(50px, -8px);
  &:hover {
    background-color: rgb(224, 64, 64);
  }
`;

const Image = styled.img`
  height: 2.5em;
`;

const FileName = styled.span`
  font-size: 12px;
`;

type Props = {
  file?: File | null;
  setFile: (file: File | null) => void;
};

const BigDropzone = ({ file, setFile }: Props) => {
  const onDrop = useCallback(
    (file) => setFile(file.length ? file[0] : null),
    [setFile]
  );

  const onDropRejected = useCallback(
    () => toast.error('Wystąpił błąd. Można dodać jeden plik o formacie .xlsx'),
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    multiple: false,
  });

  console.log(file);

  return file ? (
    <Center>
      <Flex>
        <Image
          src="../../../assets/xlsx.png"
          alt="xlsx"
          style={{ fontSize: '24px' }}
        />
        <CloseButton onClick={() => setFile(null)}>
          <Close />
        </CloseButton>
      </Flex>
      <FileName>{file.name}</FileName>
    </Center>
  ) : (
    <DropzoneArea {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive
        ? 'Upuść plik tutaj'
        : 'Upuść plik lub kliknij tutaj, aby załadować plik'}
    </DropzoneArea>
  );
};

export default BigDropzone;
