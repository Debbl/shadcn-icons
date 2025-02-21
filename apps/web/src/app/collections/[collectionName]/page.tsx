import { Collections } from "~/app/icons";

export async function generateStaticParams() {
  return Object.keys(Collections).map((collection) => ({
    collectionName: collection,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ collectionName: string }>;
}) {
  const { collectionName } = await params;

  return (
    <div>
      <h1>{collectionName}</h1>
    </div>
  );
}
