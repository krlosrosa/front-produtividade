// src/hooks/use-mobile.ts
import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verificação inicial
    checkIfMobile();

    // Adiciona listener para redimensionamento da tela
    window.addEventListener("resize", checkIfMobile);

    return () => {
      // Remove listener quando o componente desmontar
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const checkIfMobile = () => {
    // Verifica pelo tamanho da tela (comum em frameworks CSS como Tailwind)
    const screenWidthCheck = window.innerWidth < 768; // 768px é o breakpoint 'md' do Tailwind

    // Verifica pela user agent string (para dispositivos mobile mesmo com tela grande)
    const userAgentCheck =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // Considera mobile se qualquer uma das verificações for verdadeira
    setIsMobile(screenWidthCheck || userAgentCheck);
  };

  return isMobile;
}
