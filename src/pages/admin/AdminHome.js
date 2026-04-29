import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AdminLayout({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/gallary");
        if (res.data.success) {
          const firstElement = await api.get(
            `/api/gallary/${res.data.data[0].id}`,
          );
          console.log("res", res.data.data[0].id, firstElement);
        }

        setData(res.data);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  return <Box p={6}>{children}</Box>;
}
