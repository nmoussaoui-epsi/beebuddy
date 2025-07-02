import { supabase } from "@/lib/supabase";

export interface Profile {
  id: string;
  role: "freelance" | "client";
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface CVData {
  id: string;
  skills: string[];
  expected_salary?: number;
  experience?: string;
  created_at: string;
}

export interface ProjectData {
  id: string;
  client_id: string;
  title: string;
  description?: string;
  budget?: number;
  created_at: string;
}

class ProfileService {
  // Créer un profil
  async createProfile(
    userId: string,
    data: { full_name: string; role: "freelance" | "client" }
  ) {
    try {
      const { error } = await supabase.from("profiles").insert({
        id: userId,
        full_name: data.full_name,
        role: data.role,
      });

      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  }

  // Récupérer un profil
  async getProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Créer un CV (pour freelances)
  async createCV(
    userId: string,
    data: { skills: string[]; expected_salary?: number; experience?: string }
  ) {
    try {
      const { error } = await supabase.from("cv").insert({
        id: userId,
        skills: data.skills,
        expected_salary: data.expected_salary,
        experience: data.experience,
      });

      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  }

  // Récupérer un CV
  async getCV(userId: string) {
    try {
      const { data, error } = await supabase
        .from("cv")
        .select("*")
        .eq("id", userId)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Créer un projet (pour clients)
  async createProject(
    clientId: string,
    data: {
      title: string;
      description?: string;
      budget?: number;
      tags?: string[];
    }
  ) {
    try {
      const { error } = await supabase.from("projects").insert({
        client_id: clientId,
        title: data.title,
        description: data.description,
        budget: data.budget,
      });

      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  }

  // Récupérer les projets d'un client
  async getClientProjects(clientId: string) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("client_id", clientId);

      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}

export const profileService = new ProfileService();
