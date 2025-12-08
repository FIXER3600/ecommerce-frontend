export async function apiFetch(path: string, options: RequestInit = {}, token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`http://localhost:3000${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`Erro ${res.status}`);
  }

  return res.json();
}
