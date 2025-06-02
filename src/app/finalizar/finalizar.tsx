'use client'
import { useState } from 'react';

type Props = {
  isOpen: any,
  onClose: any
}

export default function FinalizarProcessoModal({ isOpen, onClose }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [transporte, setTransporte] = useState('');
  const [idPallet, setIdPallet] = useState('');
  const [preenchimentoRapido, setPreenchimentoRapido] = useState('');

  const handlePreenchimentoRapido = (value: any) => {
    setPreenchimentoRapido(value);
    
    // Se o valor contém ponto e vírgula, processa como preenchimento rápido
    if (value.includes(';')) {
      const partes = value.split(';');
      if (partes.length >= 2) {
        setTransporte(partes[0].trim());
        setIdPallet(partes[1].trim());
      }
    } else {
      // Se não tem ponto e vírgula, limpa os campos
      setTransporte('');
      setIdPallet('');
    }
  };

  const handleFinalizar = () => {
    // Lógica para finalizar o processo
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h1 className="text-2xl font-bold text-primary mb-6">Finalizar Processo de Entrega</h1>
        
        {/* Input de Preenchimento Rápido */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Preenchimento Rápido</span>
            <span className="label-text-alt text-xs">Formato: transporte;idPallet;caixas;unidades;endereços</span>
          </label>
          <input 
            type="text" 
            placeholder="Ex: TRSP-2023-001;12345;100;50;10" 
            className="input input-bordered input-secondary w-full"
            value={preenchimentoRapido}
            onChange={(e) => handlePreenchimentoRapido(e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt text-info">Digite os dados separados por ponto e vírgula (;)</span>
          </label>
        </div>

        <div className="divider">OU</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Informe o Transporte</span>
            </label>
            <input 
              type="text" 
              placeholder="Ex: TRSP-2023-001" 
              className="input input-bordered input-primary w-full"
              value={transporte}
              onChange={(e) => setTransporte(e.target.value)}
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Informe o ID Pallet</span>
            </label>
            <input 
              type="text" 
              placeholder="Ex: 12345" 
              className="input input-bordered input-primary w-full"
              value={idPallet}
              onChange={(e) => setIdPallet(e.target.value)}
            />
          </div>
        </div>
        
        <div className="card bg-base-200 shadow-md mb-6">
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold text-secondary">Transporte: <span className="font-mono">TRSP-2023-122121</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium w-40">Operador:</span>
                  <span className="font-mono">Carlos Roberto Rosa</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium w-40">Qtd Caixas:</span>
                  <span className="badge badge-neutral">230</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium w-40">Qtd Unidades:</span>
                  <span className="badge badge-neutral">20</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium w-40">Endereços visitados:</span>
                  <span className="badge badge-accent">15</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium w-40">Horário de Início:</span>
                  <span className="font-mono">19:45:40</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium w-40">Status:</span>
                  <span className="badge badge-success">Em andamento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {showSuccess && (
          <div className="alert alert-success mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Processo finalizado com sucesso!</span>
          </div>
        )}
        
        <div className="modal-action">
          <button className="btn btn-outline btn-error" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleFinalizar}>
            Finalizar Processo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
