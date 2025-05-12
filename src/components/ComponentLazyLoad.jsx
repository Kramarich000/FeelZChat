import { Suspense } from "react";

export default function ComponentLazyLoad({
  children,
  skeleton: Skeleton = () => null,
}) {
  return <Suspense fallback={<Skeleton />}>{children}</Suspense>;
}
