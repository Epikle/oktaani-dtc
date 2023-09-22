import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  selector: string;
};

export default function Portal({ children, selector }: Props) {
  const ref = useRef<Element>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const element = document.querySelector(selector);
    if (element) {
      ref.current = element;
    }

    setMounted(true);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
