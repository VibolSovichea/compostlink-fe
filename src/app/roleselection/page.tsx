"use client";

import { useState } from "react";
import Base from "@/components/shared/base-layout";
import MButton from "@/components/m-ui/m-button";
import { useAuth } from "@/provider/authProvider";

export default function RoleSelectionPage() {
  const { updateRole } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelection = async (role: 'User' | 'Facility') => {
    try {
      setError(null);
      setIsLoading(true);
      await updateRole(role);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
      console.error('Role selection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Base insideClassName="items-center gap-half" hideNavigation={true}>
      <div className="text-title text-black flex flex-col items-center py-double mt-16">
        <div className="text-center">What is your role?</div>
        <div className="text-center text-gray-600">You are both our hero!</div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-medium w-full max-w-md">
        <MButton
          variant="primary"
          full
          onClick={() => handleRoleSelection('Facility')}
          loading={isLoading}
          disabled={isLoading}
        >
          Facility
        </MButton>
        <MButton
          variant="secondary"
          full
          onClick={() => handleRoleSelection('User')}
          loading={isLoading}
          disabled={isLoading}
        >
          Generator
        </MButton>
      </div>
    </Base>
  );
}
