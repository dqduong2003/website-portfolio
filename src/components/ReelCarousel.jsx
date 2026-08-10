import VelocityCarousel from './ui/velocity-carousel.jsx';

const REEL_CARDS = [
  {
    image: { src: '/assets/projects/video/video1.png', alt: "VMHC'26: RECAP VIDEO" },
    headline: "VMHC'26: RECAP VIDEO",
    text: 'Cinematic Sport · 4K · Color graded in DaVinci Resolve',
    buttonText: 'Watch',
    buttonLink: 'https://youtu.be/Uvd7xdQ__4c?si=SPzYtzpi_--XdhCO',
  },
  {
    image: { src: '/assets/projects/video/music_night.png', alt: 'MUSIC NIGHT: CHAPTER OF US' },
    headline: 'MUSIC NIGHT: CHAPTER OF US',
    text: 'Music Video · 2026',
    buttonText: 'Watch',
    buttonLink: 'https://youtube.com/playlist?list=PLHmbWgUENmZfo61E-5H1w_bX7QAVCRxb2&si=MmL4DqRpcsFdmY5d',
  },
  {
    image: { src: '/assets/projects/video/lookbook.jpg', alt: 'VISS Merch Lookbook' },
    headline: 'VISS Merch Lookbook',
    text: 'Photoshoot Album · 2026',
    buttonText: 'View',
    buttonLink: 'https://www.behance.net/gallery/246131665/VISS-MERCH-LOOKBOOK',
  },
  {
    image: { src: '/assets/projects/video/shuttered_memories.png', alt: 'SHUTTERED MEMORIES' },
    headline: 'SHUTTERED MEMORIES',
    text: 'Short Film · 2023',
    buttonText: 'Watch',
    buttonLink: 'https://youtu.be/L_hPWuWXi-8?si=3ZYNrTlPljGZclhX',
  },
];

// Matches the original .vid-thumb card ratio: 360px wide / 210px tall.
const VID_THUMB_ASPECT_RATIO = 360 / 210;

export default function ReelCarousel() {
  return (
    <VelocityCarousel
      cards={REEL_CARDS}
      cardAspectRatio={VID_THUMB_ASPECT_RATIO}
      style={{ width: '100%', height: 780 }}
      minCardWidth={340}
      maxCardWidth={810}
      desktopWidthFactor={0.72}
      desktopHeightFactor={1.4}
      cardGap={260}
      desktopContentPadding={44}
      borderRadius={12}
      borderWidth={0}
      backgroundColor="transparent"
      overlayColor="#0C0602"
      overlayOpacity={0.5}
      shadowIntensity={0.35}
      animationSpeed={0.5}
      headlineColor="#F5E6C8"
      textColor="#D4A45A"
      buttonBackground="#D4A45A"
      buttonTextColor="#1A1108"
      indicatorColor="#D4A45A"
      indicatorInactiveOpacity={0.3}
      headlineFont={{ fontFamily: 'var(--f-play)', fontStyle: 'italic', fontWeight: 400, fontSize: '36px', lineHeight: '1.12em' }}
      textFont={{ fontFamily: 'var(--f-garamond)', fontStyle: 'italic', fontWeight: 400, fontSize: '16px', lineHeight: '1.4em' }}
      buttonFont={{ fontFamily: 'var(--f-garamond)', fontStyle: 'italic', fontWeight: 500, fontSize: '15px' }}
    />
  );
}
