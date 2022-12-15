import Link from "next/link";
import Image from "next/image";

export default function PhotoCard({ photoData }) {
  const { title, slug, photo } = photoData.fields;

  return (
    <div className="card">
      <div className="featured">
        <Image
          src={`https:${photo.fields.file.url}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
        </div>
        <div className="actions">
          <Link href={`/photos/${slug}`}>
            <a>Photo info</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
