import { createClient } from 'contentful';
import PhotoCard from '../components/PhotoCard';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_KEY,
  });

  const response = await client.getEntries({ content_type: 'photoArt' });

  return {
    props: { photos: response.items },
  };
}

export default function PhotoList({ photos }) {
  return (
    <div className="photo-list">
      {photos.map(photo => (
        <PhotoCard key={photo.sys.id} photoData={photo} />
      ))}
    </div>
  );
}
