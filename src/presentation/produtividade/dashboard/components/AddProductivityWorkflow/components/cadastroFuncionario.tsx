import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAddFuncionarioMutation } from "@/presentation/produtividade/dashboard/application/useFuncionarioMutation";

type FormData = {
  id: string;
  nome: string;
};

export function CadastroDeFuncionarioModal() {
  const { mutate } = useAddFuncionarioMutation();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    if (data?.user.center) {
      mutate({
        id: formData.id,
        name: formData.nome,
        centerId: data.user.center,
      });
      reset();
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ Novo Usuario</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastro Rápido</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo usuário.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="id" className="text-sm font-medium leading-none">
              ID
            </label>
            <Input
              id="id"
              placeholder="Digite o ID do usuário"
              {...register("id", { required: "ID é obrigatório" })}
            />
            {errors.id && (
              <p className="text-sm text-red-500">{errors.id.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-medium leading-none">
              Nome
            </label>
            <Input
              id="nome"
              placeholder="Digite o nome do usuário"
              {...register("nome", { required: "Nome é obrigatório" })}
            />
            {errors.nome && (
              <p className="text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
