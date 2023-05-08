export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_users: {
        Row: {
          chat_id: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          chat_id?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          chat_id?: string | null
          id?: number
          user_id?: string | null
        }
      }
      chats: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
      }
      levels: {
        Row: {
          created_at: string | null
          denomination: string | null
          id: number
          xp_needed: number | null
        }
        Insert: {
          created_at?: string | null
          denomination?: string | null
          id?: number
          xp_needed?: number | null
        }
        Update: {
          created_at?: string | null
          denomination?: string | null
          id?: number
          xp_needed?: number | null
        }
      }
      messages: {
        Row: {
          author_id: string | null
          chat_id: string | null
          content: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          author_id?: string | null
          chat_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          author_id?: string | null
          chat_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: Json | null
          email: string
          id: string
          level: number | null
          n_projects: number | null
          name: string | null
          requirements_completed: number | null
          updated_at: string | null
          xp: number | null
        }
        Insert: {
          avatar_url?: Json | null
          email: string
          id: string
          level?: number | null
          n_projects?: number | null
          name?: string | null
          requirements_completed?: number | null
          updated_at?: string | null
          xp?: number | null
        }
        Update: {
          avatar_url?: Json | null
          email?: string
          id?: string
          level?: number | null
          n_projects?: number | null
          name?: string | null
          requirements_completed?: number | null
          updated_at?: string | null
          xp?: number | null
        }
      }
      project_profiles: {
        Row: {
          id: number
          id_proj: string
          id_user: string
        }
        Insert: {
          id?: number
          id_proj: string
          id_user: string
        }
        Update: {
          id?: number
          id_proj?: string
          id_user?: string
        }
      }
      projects: {
        Row: {
          created_at: string | null
          deadline: string
          description: string | null
          id: string
          name: string
          status: string
        }
        Insert: {
          created_at?: string | null
          deadline: string
          description?: string | null
          id?: string
          name: string
          status?: string
        }
        Update: {
          created_at?: string | null
          deadline?: string
          description?: string | null
          id?: string
          name?: string
          status?: string
        }
      }
      requirements: {
        Row: {
          assigned_to: string[] | null
          closed_at: string | null
          closed_by: string[] | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          id_proj: string
          name: string
          priority: string
          status: string | null
          type: string | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          assigned_to?: string[] | null
          closed_at?: string | null
          closed_by?: string[] | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          id_proj: string
          name: string
          priority?: string
          status?: string | null
          type?: string | null
          updated_at?: string
          updated_by: string
        }
        Update: {
          assigned_to?: string[] | null
          closed_at?: string | null
          closed_by?: string[] | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          id_proj?: string
          name?: string
          priority?: string
          status?: string | null
          type?: string | null
          updated_at?: string
          updated_by?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_chat_id: {
        Args: {
          user_id_1: string
          user_id_2: string
        }
        Returns: {
          chat_id: string
        }[]
      }
      get_connected_users: {
        Args: {
          my_user_id: string
        }
        Returns: {
          id: string
          email: string
          name: string
          avatar_url: Json
        }[]
      }
      increment_requirements_completed: {
        Args: {
          user_ids: string[]
        }
        Returns: undefined
      }
      projects_user: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
          description: string
          status: string
          deadline: string
          created_at: string
        }[]
      }
      projects_user_people: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
          description: string
          status: string
          deadline: string
          project_users: string[]
        }[]
      }
      projects_user_req: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
          description: string
          status: string
          deadline: string
          created_at: string
          total_reqs: number
          completed_reqs: number
        }[]
      }
      ranking_req: {
        Args: {
          proj_id: string
        }
        Returns: {
          id: string
          name: string
          avatar_url: Json
          requirements_closed: number
        }[]
      }
      requirements_user: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
          due_date: string
          priority: string
          status: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
