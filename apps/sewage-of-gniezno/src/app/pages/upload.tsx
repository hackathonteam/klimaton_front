import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadFiles from '../actions/upload_files';

const Upload = () => {
  const [file, setFile] = useState<File[] | null>(null);

  const onDrop = useCallback((file) => setFile(file), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {file ? file[0].name : null}
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <button onClick={() => uploadFiles(file && file[0], null)}>Click</button>
    </>
  );
};

export default Upload;
