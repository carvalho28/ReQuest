import Image from 'next/image';

export default {
  // logo: <Image src="/logo.svg" alt="Logo" width={50} height={50} />,
  // logo: <div><Image src="/logo.svg" alt="Logo" width={50} height={50} /> <strong>ReQuest</strong></div>,
  logo: <div style={{ display: 'flex', alignItems: 'center' }}><Image src="/logo.svg" alt="Logo" width={50} height={50} style={{ marginRight: '1em' }} /> <strong>ReQuest</strong></div>,
  project: {
    link: 'https://github.com/carvalho28/ReQuest',
  },
  // ...
}
