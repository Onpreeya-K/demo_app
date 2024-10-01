import * as React from 'react';

interface Props {
    onFileDrop: (file: File) => void;
    children: any;
}

const FileDropZone: React.FC<Props> = ({ onFileDrop, children }) => {
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const fileList = event.dataTransfer.files;
        if (fileList && fileList.length > 0) {
            const droppedFile = fileList[0];
            onFileDrop(droppedFile);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ width: '100%', height: '100%', border: '2px dashed #ccc' }}
        >
            {children}
        </div>
    );
};

export default FileDropZone;
