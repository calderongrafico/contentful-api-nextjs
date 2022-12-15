import { useEffect, useState } from "react";
import { client } from "../../utils/client";
import PhotoCard from "../../components/PhotoCard";

export async function getClientSideEntries() {
  try {
    const entries = await client.getEntries({ content_type: "photoArt" });
    return entries;
  } catch (error) {
    console.log(error);
  }
}

export default function PhotoList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getClientSideEntries().then((response) => setData(response.items));
  }, []);

  return (
    <div className="photo-list">
      {data.map((photo) => (
        <PhotoCard key={photo.sys.id} photoData={photo} />
      ))}
    </div>
  );
}
