import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen  bg-neutral-950">
      <Link href={"./create"} className="text-amber-50">
        create Form for s3
      </Link>
    </div>
  );
}
