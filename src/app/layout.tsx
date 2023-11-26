import localFont from 'next/font/local';
import Image from 'next/image';

import backgroundImage from '../../public/images/Background@4x.jpg';
import { Providers } from './providers';
import styles from './index-page.module.css';
import '../styles/global.css';

const euclidCircular = localFont({
  src: [
    {
      path: './fonts/euclid_circular_a_regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/euclid_circular_a_medium-webfont.woff2',
      weight: '500',
      style: 'medium',
    },
    {
      path: './fonts/euclid_circular_a_semibold-webfont.woff2',
      weight: '600',
      style: 'semi-bold',
    },
  ],
});

export const metadata = {
  title: 'Epochs',
  description: 'Subgraph Epochs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={euclidCircular.className}>
      <body>
        <Image
          src={backgroundImage}
          alt="Background Image"
          fill={true}
          className={styles.backgroundImage}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
