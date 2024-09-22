import { SignformProvider } from '@/app/components/forms/sign-up/formProvider'
import { SignUp } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export default function Page() {



  return <>
  
  
  
  <SignformProvider>

    hello 
    
  </SignformProvider>
  </>
}

