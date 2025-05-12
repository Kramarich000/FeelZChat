import { Suspense } from "react";
import { Loader } from "@components/Loader";

export default function LazyLoad({ children }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
