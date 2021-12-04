import axios from 'axios';

type Files = {
  declaredSewage: File | null;
  realSewage: File | null;
  waterConsumption: File | null;
  sewageReception: File | null;
  companies: File | null;
  containers: File | null;
  meters: File | null;
  residents: File | null;
};

const uploadFiles = async (files: Files) => {
  const formData = new FormData();

  Object.entries(files).forEach(([name, file]) => {
    console.log(name, file?.name);
    if (file) formData.append(name, file);
  });

  await axios.post(
    'http://localhost:8000/upload',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export default uploadFiles;
