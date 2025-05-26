"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const callbackUrl = "/admin/products";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

   const res = await signIn("credentials", {
  email,
  password,
  redirect: false,
  callbackUrl,
});

    if (res?.ok) {
      router.push(callbackUrl); // handmatig redirecten
    } else {
      setError("Ongeldige gebruikersnaam of wachtwoord");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Inloggen</h2>

        {error && (
          <p className="text-red-600 mb-4 text-sm">{error}</p>
        )}

        <label className="block mb-2 text-sm font-medium">E-mailadres</label>
<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-3 py-2 border rounded mb-4"
  required
/>

        <label className="block mb-2 text-sm font-medium">Wachtwoord</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Inloggen
        </button>
      </form>
    </div>
  );
}
