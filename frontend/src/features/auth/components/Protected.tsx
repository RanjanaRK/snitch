import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Protected = ({ children }: Props) => {
  return <>{children}</>;
};

export default Protected;
