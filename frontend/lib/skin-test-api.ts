const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function uploadSkinTestImage(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to upload image");
  }

  return data;
}

export async function createSkinTest(imageUrl: string, token: string) {
  const response = await fetch(`${API_URL}/skin-tests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ imageUrl }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to create skin test");
  }

  return data;
}

export async function analyzeSkinTest(id: string, token: string) {
  const response = await fetch(`${API_URL}/skin-tests/${id}/analyze`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to analyze skin test");
  }

  return data;
}

export async function getMySkinTests(token: string) {
  const response = await fetch(`${API_URL}/skin-tests/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch skin tests");
  }

  return data;
}

export async function getSkinTestById(id: string, token: string) {
  const response = await fetch(`${API_URL}/skin-tests/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch skin test");
  }

  return data;
}
