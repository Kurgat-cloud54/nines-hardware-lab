import { readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

export function GalleryGrid() {
  const dir = join(process.cwd(), "public", "images", "gallery");
  const files = readdirSync(dir).filter((file) => /\.(jpe?g|png|webp)$/i.test(file)).sort();
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {files.map((file, index) => (
        <div key={file} className="relative aspect-square overflow-hidden rounded-lg border border-blue-900/80 bg-panel">
          <Image src={`/images/gallery/${file}`} alt={`Inverter repair work ${index + 1}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition duration-300 hover:scale-105" />
        </div>
      ))}
    </div>
  );
}
