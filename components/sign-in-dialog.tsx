import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertDialogDescription, AlertDialogProps } from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import { useRef } from "react";

interface SignInDialogProps extends AlertDialogProps {
  onClick: (username: string, password: string) => void;
}

export default function SignInDialog({onClick, ...props}: SignInDialogProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function callOnClick() {
    if (usernameRef.current == null || passwordRef.current == null) return;
    onClick(usernameRef.current.value, passwordRef.current.value); 
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign in to continue</AlertDialogTitle>
          <AlertDialogDescription>
            The app will only use your password to sign in on your behalf once.
            The server does not retain your login information. <Link href='/privacy-policy' className='underline'>Privacy policy</Link>
          </AlertDialogDescription>
          <AlertDialogDescription>
            Note: Please wait a bit after pressing {'"sign in." '}
            If you have to wait more than a few seconds, chances are you entered the wrong password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">School ID</Label>
          <Input type="username" id="username" placeholder="School ID" ref={usernameRef} autoFocus />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password" ref={passwordRef}
            onKeyDown={(e) => {
              if (e.key != 'Enter') return;
              e.stopPropagation();
              callOnClick();
            }}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={callOnClick}>
            Sign in
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}