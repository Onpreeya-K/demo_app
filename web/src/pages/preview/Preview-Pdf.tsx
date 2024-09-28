import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPdf } from '../../services/Disburse-service';
import PopupError from '../../components/popupAlert/Popup-Error';

const PreviewPdfPage = () => {
    const startComponent = useRef(false);
    const { pdf_path } = useParams();
    const [fileData, setFileData] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const fetchPdfFile = async () => {
        try {
            let payload = {
                pdf_path: pdf_path || '',
            };
            const response = await getPdf(payload);
            if (response && response.message === 'Success' && response.payload) {
                setFileData(response.payload.base64);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (/android|iPhone|iPad|iPod/i.test(userAgent)) {
            setIsMobile(true);
        }
        if (startComponent.current === false) {
            if (pdf_path) {
                fetchPdfFile();
            }
        }
        return () => {
            startComponent.current = true;
        };
    });

    const renderPreview = () => {
        if (!fileData) return <></>;
        const fileUrl = `data:application/pdf;base64,${fileData}`;
        if (isMobile) {
            return (
                <div>
                    <p>
                        PDF preview is not supported on mobile. Click below to download or view the
                        file:
                    </p>
                    <a href={fileUrl} download="file.pdf">
                        Download PDF
                    </a>
                </div>
            );
        }
        return (
            <iframe
                src={fileUrl}
                title={pdf_path}
                style={{ width: '100%', height: '100vh', border: 'none' }}
            />
        );
    };

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <PopupError />
            {renderPreview()}
        </div>
    );
};

export default PreviewPdfPage;
