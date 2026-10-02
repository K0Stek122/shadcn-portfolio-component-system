import { Mail, Phone } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type ContactInfo =
  | { email: string; phone?: string }
  | { email?: string; phone: string }

export type ContactButtonProps = ContactInfo & {
  triggerLabel?: string
}

export function ContactButton({
  triggerLabel = "Contact Me",
  email,
  phone,
}: ContactButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="default" size="lg" />}>
        <Phone data-icon="inline-start" />
        {triggerLabel}
      </AlertDialogTrigger>
      <AlertDialogContent size="sm" className="m-0 rounded-xl shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Contact Details</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-start gap-1 text-foreground">
            {email && (
              <span className="inline-flex items-center gap-2">
                <Mail className="size-4" />
                {email}
              </span>
            )}
            {phone && (
              <span className="inline-flex items-center gap-2">
                <Phone className="size-4" />
                {phone}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* Size is a plain Button prop, not something the shadcn theme controls.
              col-span-2 + justify-self-end: the footer is a 2-col grid at this dialog
              size (meant for a Cancel+Action pair) — span both columns so our lone
              button aligns right instead of sitting in the first cell. */}
          <AlertDialogCancel
            size="lg"
            variant="default"
            className="col-span-2 w-fit justify-self-end"
            style={{ animation: "none" }}
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
