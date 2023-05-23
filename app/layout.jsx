import Footer from '@components/Footer'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'

export const metadata = {
    title : "Prompt Ai",
    description: "Discover and Share Ai Prompts",
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <main className='app'>
                    <Nav/>
                    {children}
                    <Footer/>
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout
