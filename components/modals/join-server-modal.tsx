"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal-store"

const formSchema = z.object({
  joinUrl: z.string().min(1, { message: "Server URL is required."}),
})

export const JoinServerModal = () => {

  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "joinServer"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      joinUrl: "",
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    router.push(values.joinUrl)
  }

  const handleClose = () => {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white p-0 overflow-hidden text-black">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">Join Server</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField 
                control={form.control}
                name="joinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Paste Server Invite link
                    </FormLabel>
                    <FormControl>
                      <Input 
                        disabled={isLoading}
                        className="
                          bg-zinc-300/50 
                          border-0 
                          focus:ring-0 
                          text-black 
                          focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4 flex justify-between">
              <Button 
                type="submit"
                disabled={isLoading}
                variant="primary"
              >
                Join
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}