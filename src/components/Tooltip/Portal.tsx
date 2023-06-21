import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
// Portal proptype definition
export type PortalProps = {
    children: React.ReactNode;
}
//Portal component definition
const Portal = ({ children }:PortalProps) => {
  const portalNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const portalNode = document.createElement('div');
    portalNodeRef.current = portalNode;

    document.body.appendChild(portalNode);

    return () => {
      if (portalNodeRef.current) {
        document.body.removeChild(portalNodeRef.current);
      }
    };
  }, []);

  return portalNodeRef.current ? (
    ReactDOM.createPortal(children, portalNodeRef.current)
  ) : null;
};

export default Portal;
