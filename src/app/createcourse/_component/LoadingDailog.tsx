import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import coding from "../../../../public/coding.gif";

const LoadingDialog = ({ loading }: { loading: boolean }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white border-none shadow-xl rounded-xl max-w-md mx-auto">
        <AlertDialogHeader className="space-y-2">
          <div className="flex items-center gap-1">
            <Image
              src="/8d34699f-7474-43c6-a0f0-dfde1ef62907.webp"
              alt="Still Learning Logo"
              width={60}
              height={60}
              className="rounded-md"
            />
            <h1 className="text-2xl font-semibold text-gray-800">Still Learning</h1>
          </div>
          <AlertDialogTitle className="text-xl text-center font-semibold text-blue-600 mt-4">
            Cooking your course with AI 🔥
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
  <div className="flex flex-col items-center justify-center gap-4 mt-4">
    <Image
      src={coding}
      alt="Coding Animation"
      width={100}
      height={100}
      className="rounded-lg"
    />
    <p className="text-gray-600 text-sm text-center px-2">
    Hold tight—our AI is busy pretending to be a genius while it cooks your course.
    </p>
  </div>
</AlertDialogDescription>


        <AlertDialogFooter />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
