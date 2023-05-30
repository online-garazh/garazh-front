export type Base64 = string | ArrayBuffer | null;

export const toBase64 = (file: File | Blob): Promise<Base64> =>
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });
