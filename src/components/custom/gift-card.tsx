import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Clipboard } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export type GiftCardProps = {
  image: string;
  title: string;
  description: string;
  price: number;
  qrCode: string;
  pixCode: string;
};

export const GiftCard = ({
  image,
  title,
  description,
  price,
  qrCode,
  pixCode,
}: GiftCardProps) => {
  return (
    <Card className="bg-transparent text-center font-thin flex flex-col justify-between">
      <CardHeader>
        <img
          src={image}
          alt={title}
          className="w-96 object-cover rounded-2xl"
        />
        <CardTitle className="font-thin">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full rounded-full border-red-800 text-red-800 hover:bg-red-800 hover:text-white"
              variant="outline"
            >
              Presentear
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                Agradecemos pelo carinho
              </DialogTitle>
              <DialogDescription></DialogDescription>
              <div
                className="flex flex-col gap-5 items-stretch max-h-[calc(100vh-4rem)] overflow-y-auto py-5"
                style={{
                  overflowY: "scroll",
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE/Edge
                }}
              >
                <div className="mx-auto">
                  <img className="md:max-w-xs" src={qrCode} alt="" />
                </div>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="absolute top-1 right-1 z-10"
                    onClick={async () => {
                      if (
                        navigator.clipboard &&
                        typeof navigator.clipboard.writeText === "function"
                      ) {
                        try {
                          await navigator.clipboard.writeText(pixCode);
                          toast.success("Código copiado com sucesso!", {
                            richColors: true,
                          });
                        } catch (err) {
                          toast.error("Não foi possível copiar o código.", {
                            richColors: true,
                          });
                          console.log(err);
                        }
                      } else {
                        toast.error(
                          "Seu navegador não suporta cópia automática.",
                          {
                            richColors: true,
                          }
                        );
                      }
                    }}
                  >
                    <Clipboard />
                  </Button>
                  <textarea
                    value={pixCode}
                    readOnly
                    onClick={(e) => e.currentTarget.select()}
                    className="w-full text-zinc-500 border-input min-h-30 cursor-text overflow-y-scroll scrollbar-none"
                    style={{
                      overflowY: "scroll",
                      scrollbarWidth: "none", // Firefox
                      msOverflowStyle: "none", // IE/Edge
                    }}
                  ></textarea>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
