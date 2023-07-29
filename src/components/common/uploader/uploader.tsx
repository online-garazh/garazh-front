import React from 'react';
import { type Accept, useDropzone } from 'react-dropzone';

// import { errorMessage } from '~/services/notification.service';
import { toBase64 } from '~/utils/common';

export type OnChangeValueType = { base64: string; fileName?: string };

interface UploaderProps {
  render: (obj: { value?: string[]; open: () => void }) => React.ReactNode;
  onChangeFile: (file: OnChangeValueType) => void;
  value?: string[];
  minDimension?: { width: number; height: number };
  accept?: Accept;
  maxSize?: number;
  errorSizeText: string;
  errorDimensionText?: string;
}

export const ACCEPTED_IMAGE_FORMATS = {
  'image/jpeg': [],
  'image/png': [],
};

export const Uploader: React.FC<UploaderProps> = ({ onChangeFile, maxSize, render, value, accept }) => {
  const IMAGE_MAX_COUNT = maxSize || 2;
  const { getRootProps, getInputProps, open } = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDrop: async (acceptedFiles) => {
      const hasFiles = !!acceptedFiles.length;

      if (hasFiles) {
        // eslint-disable-next-line prefer-destructuring
        const file = acceptedFiles[0];
        const fileSize = Number((file.size / 1024 / 1024).toFixed(4));

        if (fileSize && fileSize > IMAGE_MAX_COUNT) {
          // errorMessage(errorSizeText);
          console.log('error image');

          return;
        }

        const base64 = ((await toBase64(file)) as string) || null;

        if (base64) onChangeFile({ base64, fileName: file.name });
      }
    },

    accept: accept || ACCEPTED_IMAGE_FORMATS,
  });

  return (
    <div {...getRootProps()} style={{ outline: 'none' }}>
      <input {...getInputProps()} />
      <div onClick={(e) => e.stopPropagation()}>{render({ open, value })}</div>
    </div>
  );
};
