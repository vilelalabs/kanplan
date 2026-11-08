import '@/styles/globals.css'

import { Poppins } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import PrivacyGate from '@/components/PrivacyGate'

// Self-hosted by next/font at build time: visitors' browsers never call Google
// Fonts (no IP sent to a third party, see the privacy policy). Regular weight
// only, like the old @import; globals.css reads the --font-poppins variable.
const poppins = Poppins({ weight: '400', subsets: ['latin'], display: 'swap' })

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <PrivacyGate />
      </SessionProvider>
    </>
  )
}
