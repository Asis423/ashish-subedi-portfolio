import Image from "next/image";
import curiosity from '@/assets/curiosity-01.jpg';
import leaflet1 from '@/assets/social leaflet-01.jpg';
import leaflet2 from '@/assets/social leaflet-01.jpg';

const images = [
  {
    id: 1,
    src: leaflet1,
    alt: "Big wide image",
    width: 1200,
    height: 600,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: 2,
    src: curiosity,
    alt: "Small image 1",
    width: 300,
    height: 300,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 3,
    src: leaflet2,
    alt: "Small image 2",
    width: 300,
    height: 300,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 4,
    src: leaflet2,
    alt: "Tall image",
    width: 400,
    height: 600,
    colSpan: 1,
    rowSpan: 2,
  },
  {
    id: 5,
    src: curiosity,
    alt: "Wide image",
    width: 600,
    height: 300,
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: 6,
    src: curiosity,
    alt: "Small again",
    width: 300,
    height: 300,
    colSpan: 1,
    rowSpan: 1,
  },
];

export default function BlogPage() {
  return (
    <section id="projects">

      <h1 className="justify-center text-3xl mb-10 font-bold text-center">Letter Head</h1>
    <div className="grid grid-cols-4 auto-rows-[200px] gap-4">
      {images.map((image) => (
        <div
        key={image.id}
          className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm"
          style={{
            gridColumn: `span ${image.colSpan}`,
            gridRow: `span ${image.rowSpan}`,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
      </section>
  );
}
