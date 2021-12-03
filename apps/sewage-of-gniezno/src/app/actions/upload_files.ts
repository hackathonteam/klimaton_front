import axios from 'axios';

const uploadFiles = async (file1: File | null, file2: File | null) => {
  const formData = new FormData();

  if (file1) formData.append('file1', file1);
  if (file2) formData.append('file2', file2);

  await axios.post(
    'http://localhost:3000/upload',
    { formData },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export default uploadFiles;
