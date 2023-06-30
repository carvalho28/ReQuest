export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
        Relationships: [
          {
            foreignKeyName: "chat_users_chat_id_fkey"
            columns: ["chat_id"]
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "messages_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            referencedRelation: "chats"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: Json | null
          created_at: string | null
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
          created_at?: string | null
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
          created_at?: string | null
          email?: string
          id?: string
          level?: number | null
          n_projects?: number | null
          name?: string | null
          requirements_completed?: number | null
          updated_at?: string | null
          xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_level_fkey"
            columns: ["level"]
            referencedRelation: "levels"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "project_profiles_id_proj_fkey"
            columns: ["id_proj"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_profiles_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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
          identifier: string | null
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
          identifier?: string | null
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
          identifier?: string | null
          name?: string
          priority?: string
          status?: string | null
          type?: string | null
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "requirements_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirements_id_proj_fkey"
            columns: ["id_proj"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirements_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      trophies: {
        Row: {
          desc: string | null
          id: number
          image: string | null
        }
        Insert: {
          desc?: string | null
          id?: number
          image?: string | null
        }
        Update: {
          desc?: string | null
          id?: number
          image?: string | null
        }
        Relationships: []
      }
      trophies_profiles: {
        Row: {
          id: number
          id_trophy: number | null
          id_user: string | null
        }
        Insert: {
          id?: number
          id_trophy?: number | null
          id_user?: string | null
        }
        Update: {
          id?: number
          id_trophy?: number | null
          id_user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trophies_profiles_id_trophy_fkey"
            columns: ["id_trophy"]
            referencedRelation: "trophies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trophies_profiles_id_user_fkey"
            columns: ["id_user"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
      get_latest_closed_requirements: {
        Args: {
          user_id: string
        }
        Returns: {
          requirement_name: string
          project_name: string
          project_id: string
          closed_at: string
        }[]
      }
      get_user_projects_within_months: {
        Args: {
          user_id: string
          num_months: number
        }
        Returns: {
          project_name: string
          deadline: string
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
