import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const response = await client.getEntries({
    content_type: 'photoArt',
  });

  const paths = response.items.map(path => ({
    params: { slug: path.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context) {
  // response.items
  const { items } = await client.getEntries({
    content_type: 'photoArt',
    'fields.slug': context.params.slug,
  });

  return {
    props: { photoItem: items[0] },
  };
}

export default function RecipeDetails({ photoItem }) {
  const { photo, title, tags, authorNotes } = photoItem.fields;
  return (
    <div className="banner-content">
      <div className="banner">
        <Image
          src={`https:${photo.fields.file.url}`}
          width={photo.fields.file.details.image.width}
          height={photo.fields.file.details.image.height}
        />
        <h2>{title}</h2>
        <div className="info">
          <div className="tags">
            {tags.map(tag => (
              <span>#{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="banner-info">
        <div className="author-notes">
          <h3>Author notes:</h3>
          <div>{documentToReactComponents(authorNotes)}</div>
        </div>
      </div>
    </div>
  );
}
