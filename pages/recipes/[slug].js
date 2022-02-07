import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const response = await client.getEntries({
    content_type: 'recipe',
  });

  const paths = response.items.map(path => {
    return {
      params: { slug: path.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context) {
  // response.items
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': context.params.slug,
  });

  return {
    props: { recipe: items[0] },
  };
}

export default function RecipeDetails({ recipe }) {
  const { featuredImage, title, ingredients, method } = recipe.fields;
  return (
    <div>
      <div className="banner">
        <Image
          src={`https:${featuredImage.fields.file.url}`}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
        <div className="info">
          <p>{ingredients.map(item => `#${item} `)}</p>
        </div>
        <div className="method">
          <h3>Author notes:</h3>
          <div>{documentToReactComponents(method)}</div>
        </div>
      </div>
    </div>
  );
}
