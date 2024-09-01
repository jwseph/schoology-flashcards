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
import { cn, linkStyle } from "@/lib/utils";
import { AlertDialogDescription, AlertDialogProps } from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react"

interface SignInDialogProps extends AlertDialogProps {
  onClick: (username: string, password: string) => Promise<void>;
}

export default function SignInDialog({onClick, ...props}: SignInDialogProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function callOnClick() {
    setLoading(true);
    if (usernameRef.current == null || passwordRef.current == null) return;
    await onClick(usernameRef.current.value, passwordRef.current.value); 
    setLoading(false);
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign in to continue to Class Search</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide your school login info so that we can sign in on your behalf.
            Your school ID and password will not be stored except for a one-time login.
            Read our <Link href='/privacy-policy' className={linkStyle}>Privacy policy</Link> for more detail.
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
          <AlertDialogAction onClick={callOnClick} disabled={loading}>
            <Loader2 className={cn("mr-2 h-4 w-4 animate-spin", {hidden: !loading})} />
            Sign in
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}