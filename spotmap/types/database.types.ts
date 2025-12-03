export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type FriendshipStatus = "pending" | "accepted" | "declined";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string | null;
          username: string | null;
          avatar_url: string | null;
          bio: string | null;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      places: {
        Row: {
          id: string;
          created_at: string | null;
          name: string;
          lat: number;
          lng: number;
          category: string | null;
          city: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          name: string;
          lat: number;
          lng: number;
          category?: string | null;
          city?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          name?: string;
          lat?: number;
          lng?: number;
          category?: string | null;
          city?: string | null;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          created_at: string | null;
          user_id: string;
          place_id: string;
          rating: number;
          comment: string | null;
          tags: string[] | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          user_id: string;
          place_id: string;
          rating: number;
          comment?: string | null;
          tags?: string[] | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          user_id?: string;
          place_id?: string;
          rating?: number;
          comment?: string | null;
          tags?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_place_id_fkey";
            columns: ["place_id"];
            referencedRelation: "places";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      friendships: {
        Row: {
          id: string;
          created_at: string | null;
          user_id_1: string;
          user_id_2: string;
          status: FriendshipStatus;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          user_id_1: string;
          user_id_2: string;
          status?: FriendshipStatus;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          user_id_1?: string;
          user_id_2?: string;
          status?: FriendshipStatus;
        };
        Relationships: [
          {
            foreignKeyName: "friendships_user_id_1_fkey";
            columns: ["user_id_1"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "friendships_user_id_2_fkey";
            columns: ["user_id_2"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
