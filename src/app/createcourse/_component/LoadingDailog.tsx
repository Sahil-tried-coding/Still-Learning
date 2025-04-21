import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
  } from "@/components/ui/alert-dialog"
import Image from "next/image"
import coding from "../../../../public/coding.gif"
import { AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog"

  
  const LoadingDailog = ({loading }:{loading:boolean}) => {
    return (
        <AlertDialog  open={loading}>
  <AlertDialogContent className="bg-white">
    <AlertDialogHeader>
      <AlertDialogDescription>
        <div className="flex gap-6 justify-center items-center bg-white">
<Image alt={'coding'} src={coding} height={100} width={100}/>
<h2>Cooking your cousre by ai</h2>
        </div>
        
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
 
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

      
    )
  }
  
  export default LoadingDailog
