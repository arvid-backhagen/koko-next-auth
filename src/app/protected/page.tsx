"use client";

import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const [dataFromServer, setDataFromServer] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await (await fetch("/api/protected")).json();
      setDataFromServer(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>{dataFromServer?.message}</h3>
      <code>
        {dataFromServer?.protectedContent ? (
          Object.keys(dataFromServer.protectedContent).map((key) => {
            return (
              <p key={key}>
                {key} : {dataFromServer.protectedContent[key]}
              </p>
            );
          })
        ) : (
          <p>No data</p>
        )}
      </code>
      <pre>{JSON.stringify(dataFromServer, null, 2)}</pre>
    </div>
  );
}
