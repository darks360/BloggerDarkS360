const track = document.getElementById('mainTrack');
  const slides = document.querySelectorAll('.slide-box');
  const bgBlur = document.getElementById('mainBgBlur');
  const progressLine = document.getElementById('progressLine');
  const dotsContainer = document.getElementById('dotsContainer');
  
  let current = 0;
  let autoPlay;
  const time = 5000; // ৫ সেকেন্ড সময়

  // ১. ডট জেনারেট করা
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = `dot ${i === 0 ? 'active' : ''}`;
    d.onclick = () => jumpTo(i);
    dotsContainer.appendChild(d);
  });

  const dots = document.querySelectorAll('.dot');

  // ২. ইমেজ লোডিং ফাংশন
  function imageLoaded(img) {
    img.previousElementSibling.style.display = 'none'; // স্পিনার লুকানো
    img.parentElement.classList.add('ready');
    if(slides[current].contains(img)) updateUI();
  }

  // ৩. আপডেট ফাংশন
  function updateUI() {
    track.style.transform = `translateX(-${current * 100}%)`;
    
    // ব্যাকগ্রাউন্ড চেঞ্জ
    const activeImg = slides[current].querySelector('img').src;
    bgBlur.style.backgroundImage = `url('${activeImg}')`;

    // অ্যাক্টিভ ক্লাস ও ডট আপডেট
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === current);
      dots[i].classList.toggle('active', i === current);
    });

    startProgress();
  }

  function step(dir) {
    current = (current + dir + slides.length) % slides.length;
    updateUI();
    resetTimer();
  }

  function jumpTo(index) {
    current = index;
    updateUI();
    resetTimer();
  }

  // ৪. অটো প্লে ও প্রোগ্রেস বার
  function startProgress() {
    progressLine.style.transition = 'none';
    progressLine.style.width = '0%';
    setTimeout(() => {
      progressLine.style.transition = `width ${time}ms linear`;
      progressLine.style.width = '100%';
    }, 50);
  }

  function startAuto() {
    autoPlay = setInterval(() => step(1), time);
  }

  function resetTimer() {
    clearInterval(autoPlay);
    startAuto();
  }

  // ৫. টাচ সাপোর্ট
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  track.addEventListener('touchend', e => {
    let diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) step(diff > 0 ? 1 : -1);
  });

  // স্টার্ট
  updateUI();
  startAuto();
