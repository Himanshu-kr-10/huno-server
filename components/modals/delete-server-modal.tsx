"use client"

import { useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"

import { useModal } from "@/hooks/use-modal-store"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {

  const router = useRouter();

  const { isOpen, onClose, type, data, } = useModal();
  const { server } = data;

  const isModalOpen = isOpen && type === "deleteServer"

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async() => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`)
      onClose();
      router.refresh();
      router.push("/");
      
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose} >
      <DialogContent className="bg-white p-0 overflow-hidden text-black">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">Delete Server</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">Are you sure you want to do this? <br />
            <span className="font-semibold text-indigo-500">{server?.name}</span> will be permanently deleted.
            </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center w-full justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">Cancel</Button>
            <Button disabled={isLoading} onClick={onClick} variant="primary">Confirm</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

