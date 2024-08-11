"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"

import { useModal } from "@/hooks/use-modal-store"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {

  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();
  const { server } = data;

  const isModalOpen = isOpen && type === "invite"

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000)
  }

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("invite", { server: response.data })
    }catch(e) {
      console.error(e);
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose} >
      <DialogContent className="bg-white p-0 overflow-hidden text-black">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">Invite Friends</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label 
            className="uppercase text-xs font-bold text-zinc-500 dark:text-secodary/70"
          >
            Server Invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input 
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 foucs-visible:ring-0 
              text-black focus-visible:ring-offset"
              value={inviteUrl}
            />
            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4"/>}  
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size='sm'
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

