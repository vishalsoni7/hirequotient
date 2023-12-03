export const fetchData = async (setData) => {
  try {
    const res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const jsonData = await res.json();

    if (Array.isArray(jsonData)) {
      const newVar = jsonData.map((curr) => {
        return { ...curr, isEditable: false };
      });
      setData(newVar);
    } else {
      console.error("Data received is not an array:", jsonData);
    }
  } catch (error) {
    console.error(error);
  }
};
