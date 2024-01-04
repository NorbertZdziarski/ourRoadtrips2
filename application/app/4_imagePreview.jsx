import React, { useState, useEffect } from 'react';

function ImagePreview() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        }

        reader.readAsDataURL(file);
    }, [file]);

    return (
        <>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            {previewUrl && <img src={previewUrl} alt="Podgląd" />}
        </>
    );
}

export default ImagePreview;
