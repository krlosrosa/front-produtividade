import { useState } from "react";
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
import axios from "axios";
import { useSession } from "next-auth/react";
import { useAddFuncionario } from "../application/mutation";

export function QuickRegisterModal() {
  const { mutate } = useAddFuncionario();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    nome: "",
  });

  async function criarFuncionario() {
    if (data?.user.center) {
      mutate({
        id: formData.id,
        name: formData.nome,
        centerId: data?.user.center,
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpa o erro quando o usuário digita
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    criarFuncionario();
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="id" className="text-sm font-medium leading-none">
              ID
            </label>
            <Input
              id="id"
              name="id"
              placeholder="Digite o ID do usuário"
              value={formData.id}
              onChange={handleChange}
            />
            {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-medium leading-none">
              Nome
            </label>
            <Input
              id="nome"
              name="nome"
              placeholder="Digite o nome do usuário"
              value={formData.nome}
              onChange={handleChange}
            />
            {errors.nome && (
              <p className="text-sm text-red-500">{errors.nome}</p>
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
