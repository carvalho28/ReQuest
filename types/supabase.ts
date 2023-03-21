export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      levels: {
        Row: {
          created_at: string | null;
          denomination: string | null;
          id: number;
          xp_needed: number | null;
        };
        Insert: {
          created_at?: string | null;
          denomination?: string | null;
          id?: number;
          xp_needed?: number | null;
        };
        Update: {
          created_at?: string | null;
          denomination?: string | null;
          id?: number;
          xp_needed?: number | null;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string;
          id: string;
          level: number | null;
          n_projects: number | null;
          name: string | null;
          requirements_completed: number | null;
          updated_at: string | null;
          xp: number | null;
        };
        Insert: {
          avatar_url?: string | null;
          email: string;
          id: string;
          level?: number | null;
          n_projects?: number | null;
          name?: string | null;
          requirements_completed?: number | null;
          updated_at?: string | null;
          xp?: number | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string;
          id?: string;
          level?: number | null;
          n_projects?: number | null;
          name?: string | null;
          requirements_completed?: number | null;
          updated_at?: string | null;
          xp?: number | null;
        };
      };
      project_profiles: {
        Row: {
          id: number;
          id_proj: string;
          id_user: string;
        };
        Insert: {
          id?: number;
          id_proj: string;
          id_user: string;
        };
        Update: {
          id?: number;
          id_proj?: string;
          id_user?: string;
        };
      };
      projects: {
        Row: {
          deadline: string;
          description: string | null;
          id: string;
          name: string;
          status: string;
        };
        Insert: {
          deadline: string;
          description?: string | null;
          id?: string;
          name: string;
          status?: string;
        };
        Update: {
          deadline?: string;
          description?: string | null;
          id?: string;
          name?: string;
          status?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      projects_user_people: {
        Args: {
          user_id: string;
        };
        Returns: {
          id: string;
          name: string;
          description: string;
          status: string;
          deadline: string;
          project_users: string[];
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
