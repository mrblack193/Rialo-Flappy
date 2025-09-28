import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Upload your own bird image"
      />
      <button
        onClick={handleClick}
        className="px-6 py-2 bg-stone-700 text-cyan-300 font-semibold rounded-lg text-lg shadow-md hover:bg-stone-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        Upload Custom Bird
      </button>
    </div>
  );
};

export default ImageUploader;
