/* Semua nama, foto, pesan personal, dan warna dapat diubah di sini. */
const birthdayConfig = {
  recipientName: 'Ananda Rizky Fitria',
  nickname: 'Ananda',
  birthdayDate: '2026-10-24',
  websiteTitle: 'For Ananda, With Love',
  senderName: '',
  mainPhoto: 'assets/photos/utama.jpg',
  musicFile: 'assets/music/birthday.wav',
  musicVolume: 0.4,
  theme: { pink: '#F8BBD0', babyPink: '#FCE4EC', cream: '#FFF8F0', lavender: '#E9D5FF', roseGold: '#D89BA5', ink: '#613640' },
  copy: {
    brand: 'with love.', edition: 'A LITTLE WORLD, JUST FOR YOU',
    openingEyebrow: 'A VERY SPECIAL DELIVERY', openingTitle: 'Hi, {nickname}!',
    openingText: 'Ada sesuatu yang spesial untuk kamu hari ini...',
    openingNote: 'A little surprise, made just for you.', openButton: 'Open Your Surprise',
    openingFootnote: 'Dibuat dengan cinta. Dinikmati perlahan.', soundHint: 'Ada musik kecil yang menemanimu',
    heroEyebrow: 'TODAY IS ALL ABOUT YOU', heroTitle: 'Happy Birthday,',
    heroText: 'Di antara begitu banyak hal indah di dunia ini, salah satu yang paling aku syukuri adalah kehadiran kamu.',
    heroNote: 'You make my world a little brighter, just by being in it.',
    heroCaption: 'my favorite person, always.', heroSticker: 'the birthday girl', heroButton: 'A little walk down memory lane',
    photoPlaceholder: 'Our Favorite Photo', galleryPlaceholder: 'A memory waiting to happen',
    memoriesTitle: 'Our Little Memories', memoriesSubtitle: 'Some moments are too beautiful to forget.',
    memoriesNote: 'Potongan kecil dari cerita favoritku. Cerita tentang kita.', galleryHint: 'Geser untuk mengenang · Ketuk untuk melihat lebih dekat',
    reasonsTitle: 'Little Things I Love About You', reasonsSubtitle: 'There are a million reasons, but here are a few.', reasonHint: 'Ketuk untuk membuka',
    letterTitle: 'A Letter for {nickname}', letterSubtitle: 'A few words, straight from my heart.',
    letterEnvelope: 'Untuk kamu, dengan seluruh hatiku.', letterButton: 'Read My Letter', fullLetterButton: 'Show Full Letter',
    letterClose: 'Simpan kembali suratnya', letterSignature: 'With all my love,',
    wishTitle: 'Make a Wish, {nickname}!', wishSubtitle: 'A little candle. A big, beautiful wish.',
    wishIntro: 'Pejamkan matamu sebentar...', wishText: 'Buat satu permintaan yang paling kamu inginkan.', wishNote: 'Lalu tiup lilinnya, sayang.',
    blowButton: 'Blow the Candles', relightButton: 'Light the Candles Again',
    wishResult: 'May every beautiful wish of yours come true.', wishResultNote: 'Semoga semua doa dan harapan baikmu terwujud, {nickname}. 💗',
    finalButton: 'One Last Surprise, {nickname}...',
    finalLines: ['In every universe...', 'In every lifetime...', 'I would still choose you.'],
    finalThanks: 'Thank you for being the beautiful person you are.', finalSignature: 'With all my love, just for you.',
    replayButton: 'Replay Our Surprise', footer: 'Made with love, especially for you.',
    secretLogo: 'Psst... I love you more than you know. 💖', secretPhoto: "You're my favorite person, {nickname}.",
    trackTitle: 'A birthday lullaby', trackSubtitle: 'made just for you', audioError: 'Musik belum bisa diputar. Ketuk Play untuk mencoba lagi.',
    nav: ['The memories', 'The little things', 'The letter', 'The wish']
  },
  gallery: [
    { src: 'assets/photos/foto1.jpg', caption: 'Every moment with you is worth remembering.', note: 'you + me', position: 'center', secret: true },
    { src: 'assets/photos/foto2.jpg', caption: 'With you, even ordinary days feel special.', note: 'the little things', position: 'center' },
    { src: 'assets/photos/foto3.jpg', caption: 'My favorite memories always have you in them.', note: 'our kind of happy', position: 'center' },
    { src: 'assets/photos/foto4.jpg', caption: 'Kalau waktu bisa diulang, aku tetap ingin bertemu kamu.', note: 'always you', position: 'center' },
    { src: 'assets/photos/foto5.jpg', caption: 'Kamu, dan semua hal kecil yang membuatku tersenyum.', note: 'a little sunshine', position: 'center' },
    { src: 'assets/photos/foto6.jpg', caption: 'Of all the beautiful things, you are my favorite.', note: 'blooming with you', position: 'center' },
    { src: 'assets/photos/foto7.jpg', caption: 'Masih banyak cerita yang ingin kutulis bersamamu.', note: 'more days like this', position: 'center' },
    { src: 'assets/photos/foto8.jpg', caption: 'Untuk kenangan indah yang akan kita buat nanti.', note: 'to be continued...', position: 'center' }
  ],
  loveReasons: [
    { title: 'Your Smile', icon: 'sun', text: 'Senyum kamu selalu punya cara untuk membuat hariku terasa lebih baik.' },
    { title: 'Your Laugh', icon: 'music-2', text: 'Aku suka mendengar kamu tertawa, bahkan saat hal yang kita tertawakan sebenarnya sederhana.' },
    { title: 'Your Kindness', icon: 'heart-handshake', text: 'Caramu peduli dengan orang-orang di sekitar kamu adalah salah satu hal yang paling aku kagumi.' },
    { title: 'Your Eyes', icon: 'sparkles', text: 'Ada rasa tenang yang sulit dijelaskan setiap kali aku melihat matamu.' },
    { title: 'Your Presence', icon: 'flower-2', text: 'Kehadiran kamu membuat hari-hari biasa terasa lebih berharga.' },
    { title: 'Simply Being You', icon: 'heart', text: 'Aku sayang kamu bukan karena kamu harus menjadi seseorang yang sempurna, tetapi karena kamu adalah kamu.' }
  ],
  letter: `Untuk {recipientName}, perempuan yang sangat aku sayangi.

Selamat ulang tahun, sayang. ❤️

Hari ini adalah hari yang sangat istimewa, karena pada tanggal {birthdayDayMonth}, seseorang yang sekarang menjadi salah satu bagian paling berarti dalam hidupku dilahirkan.

Aku ingin kamu tahu betapa bersyukurnya aku bisa mengenal kamu.

Terima kasih karena sudah hadir dalam hidupku, menjadi teman berbagi cerita, tempat untuk tertawa, dan seseorang yang membuat hal-hal sederhana terasa begitu istimewa.

Aku mungkin tidak selalu pandai mengungkapkan perasaan melalui kata-kata, tetapi aku berharap melalui hadiah kecil ini kamu bisa merasakan betapa berharganya dirimu untukku.

Di hari ulang tahunmu ini, aku ingin mendoakan banyak hal baik untukmu.

Semoga kamu selalu sehat, selalu bahagia, dan selalu diberikan kekuatan untuk menghadapi setiap tantangan yang datang.

Semoga satu per satu impian yang selama ini kamu perjuangkan bisa terwujud.

Dan semoga setiap langkahmu selalu membawa kamu semakin dekat dengan kehidupan yang kamu impikan.

Kalau suatu hari kamu merasa lelah, aku berharap kamu tidak lupa bahwa kamu adalah seseorang yang sangat berharga dan pantas mendapatkan kebahagiaan.

Aku tidak tahu seperti apa semua cerita yang akan datang, tetapi aku berharap kita masih punya banyak waktu untuk menciptakan kenangan bersama.

Terima kasih sudah menjadi {nickname} yang aku kenal dan sayangi.

Tetaplah menjadi dirimu sendiri, karena bagiku, kamu sudah begitu istimewa.

Happy Birthday, {nickname}.

I love you, more than words can say. ❤️`
};
