import Image from 'next/image';

interface SocialIconProps {
  platform: 'google' | 'facebook';
}

export function SocialIcon({ platform }: SocialIconProps) {
  return (
    <Image
      src={platform === 'google' ? '/social icons/google.png' : '/social icons/fb.png'}
      alt=""
      width={24}
      height={24}
      aria-hidden="true"
    />
  );
}
