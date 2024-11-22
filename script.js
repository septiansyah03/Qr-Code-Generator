document.getElementById('generateBtn').addEventListener('click', () => {
    const inputText = document.getElementById('qrInput').value;
    const watermarkText = document.getElementById('watermarkText').value;
    const qrContainer = document.getElementById('qrContainer');
    const downloadLink = document.getElementById('downloadLink');

    
    qrContainer.innerHTML = '';
    downloadLink.style.display = 'none';

    if (inputText.trim() === '') {
        
        Swal.fire({
            icon: 'warning',
            title: 'Oops...👀',
            text: 'Harap Masukan Url Link',
        });
        return;
    }
    if (watermarkText.trim() === '') {
        
        Swal.fire({
            icon: 'warning',
            title: 'Oops lagi...👀',
            text: 'Masukan Judul Link',
        });
        return;
    }

    QRCode.toCanvas(inputText, { width: 300, margin: 2 }, (error, canvas) => {
        if (error) {
            console.error(error);
            
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error generating QR Code',
            });
            return;
        }

        const ctx = canvas.getContext('2d');
        const size = canvas.width;

        
        if (watermarkText.trim() !== '') {
            const words = watermarkText.split(' ');
            const line1 = words[0] || ''; 
            const line2 = words.slice(1).join(' ') || ''; 

            const textHeight = 20; 
            const padding = 10; 

            const maxWidth = Math.max(
                ctx.measureText(line1).width,
                ctx.measureText(line2).width
            ) + padding * 2;

            const totalHeight = textHeight * 2 + padding * 2;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(
                size / 2 - maxWidth / 2,
                size / 2 - totalHeight / 2,
                maxWidth,
                totalHeight
            );

            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillText(line1, size / 2, size / 2 - 5); 
            ctx.fillText(line2, size / 2, size / 2 + textHeight + 5); 
        }

        qrContainer.appendChild(canvas);

        
        const dataUrl = canvas.toDataURL();

        
        const fileName = watermarkText.trim() ? `${watermarkText.replace(/\s+/g, '_')}_QRCode.png` : 'QRCode.png';

        downloadLink.href = dataUrl;
        
        
        downloadLink.download = fileName;
        
        downloadLink.style.display = 'inline-block';
    });
});
        
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: 'Akses Ditolak',
                text: 'Maaf, tidak diizinkan!',
                showConfirmButton: true,
                confirmButtonColor: '#3085d6'
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'i')) ||
                (e.key === 'F12') 
            ) {
                e.preventDefault();
                Swal.fire({
                    icon: 'warning',
                    title: 'Akses Ditolak',
                    text: 'Saat ini tidak diizinkan!',
                    showConfirmButton: true,
                    confirmButtonColor: '#3085d6'
                });
            }
        });
        