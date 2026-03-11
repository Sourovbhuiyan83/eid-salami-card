let qrDataUrl = null;

  function updateCard() {
    const msg = document.getElementById('message').value;
    const phone = document.getElementById('phoneNumber').value;
    const method = document.getElementById('paymentMethod').value;
    const recipient = document.getElementById('recipientName').value.trim();

    document.getElementById('card-message').textContent = msg;
    document.getElementById('card-payment-number').textContent = phone || '01XXXXXXXXX';
    document.getElementById('card-payment-badge').textContent = method;

    const recipientWrap = document.getElementById('card-recipient-wrap');
    if (recipient) {
      recipientWrap.style.display = 'block';
      document.getElementById('card-recipient-name').textContent = recipient;
    } else {
      recipientWrap.style.display = 'none';
    }
  }

  function updateCount() {
    const val = document.getElementById('message').value.length;
    document.getElementById('charCount').textContent = val;
  }

  function setTheme(btn) {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const card = document.getElementById('eid-card');
    card.className = 'theme-royal theme-emerald theme-crimson theme-golden theme-midnight theme-rose theme-ocean theme-forest'.split(' ')
      .reduce((cls, t) => cls.replace(t, ''), card.className).trim();
    card.classList.add(btn.dataset.theme);
  }

  function handleQR(event) {
    const file = event.target.files[0];
    if (!file) return;
    loadQRFile(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) loadQRFile(file);
  }

  function loadQRFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      qrDataUrl = e.target.result;
      document.getElementById('qrUploadContent').innerHTML =
        `<img src="${qrDataUrl}" class="qr-preview-img"><p style="color:rgba(255,255,255,0.5);font-size:12px">QR আপলোড হয়েছে ✓</p>`;
      const cardQR = document.getElementById('card-qr-img');
      cardQR.src = qrDataUrl;
      cardQR.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }

  function downloadCard() {
    const card = document.getElementById('eid-card');
    html2canvas(card, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'eid-salami-card-(sourovBhuiyan).png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  // Init
  updateCount();