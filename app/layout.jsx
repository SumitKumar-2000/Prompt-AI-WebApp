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
            {/* <div className='main'>
                <div className='gradient'/>
            </div> */}
            <Provider>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout
