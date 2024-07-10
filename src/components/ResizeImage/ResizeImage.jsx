import React, { useState } from 'react';
import { Image as ImageReview } from 'antd';

const ResizeImage = ({ imageUrl, maxWidth, maxHeight }) => {
    const [resizedImageUrl, setResizedImageUrl] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);

    const resizeImage = (url, maxWidth, maxHeight) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // This is important for cross-origin images
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    height *= maxWidth / width;
                    width = maxWidth;
                } else {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const resizedUrl = canvas.toDataURL('image/jpeg');
            setResizedImageUrl(resizedUrl);
        };
        img.src = url;
    };

    React.useEffect(() => {
        resizeImage(imageUrl, maxWidth, maxHeight);
    }, [imageUrl, maxWidth, maxHeight]);

    return resizedImageUrl ? (
        <div onClick={() => setPreviewOpen(true)} style={{ cursor: 'pointer' }}>
            <img src={resizedImageUrl} alt="Resized" />
            <ImageReview
                wrapperStyle={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible,
                }}
                src={imageUrl}
            />
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default ResizeImage;
