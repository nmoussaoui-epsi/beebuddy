export interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: "freelance" | "client";
  cv?: {
    skills: string[];
    expected_salary?: number;
    experience?: string;
  } | null;
  projects?:
    | {
        title: string;
        description?: string;
        budget?: number;
      }[]
    | null;
}

export interface SwipeData {
  id: string;
  project_id?: string;
  freelancer_id: string;
  direction: "left" | "right";
  created_at: string;
}

export interface Match {
  id: string;
  project_id: string;
  freelancer_id: string;
  client_id: string;
  created_at: string;
}
