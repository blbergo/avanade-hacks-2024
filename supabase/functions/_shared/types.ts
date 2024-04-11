export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      chats: {
        Row: {
          chat_id: number | null;
          created_at: string;
          id: number;
          messages: Json | null;
        };
        Insert: {
          chat_id?: number | null;
          created_at?: string;
          id?: number;
          messages?: Json | null;
        };
        Update: {
          chat_id?: number | null;
          created_at?: string;
          id?: number;
          messages?: Json | null;
        };
        Relationships: [];
      };
      langchain_pg_collection: {
        Row: {
          cmetadata: Json | null;
          name: string | null;
          uuid: string;
        };
        Insert: {
          cmetadata?: Json | null;
          name?: string | null;
          uuid: string;
        };
        Update: {
          cmetadata?: Json | null;
          name?: string | null;
          uuid?: string;
        };
        Relationships: [];
      };
      langchain_pg_embedding: {
        Row: {
          cmetadata: Json | null;
          collection_id: string | null;
          custom_id: string | null;
          document: string | null;
          embedding: string | null;
          uuid: string;
        };
        Insert: {
          cmetadata?: Json | null;
          collection_id?: string | null;
          custom_id?: string | null;
          document?: string | null;
          embedding?: string | null;
          uuid: string;
        };
        Update: {
          cmetadata?: Json | null;
          collection_id?: string | null;
          custom_id?: string | null;
          document?: string | null;
          embedding?: string | null;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "langchain_pg_embedding_collection_id_fkey";
            columns: ["collection_id"];
            isOneToOne: false;
            referencedRelation: "langchain_pg_collection";
            referencedColumns: ["uuid"];
          },
        ];
      };
      sessions: {
        Row: {
          created_at: string;
          messages: Json | null;
          session_id: number;
          session_name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          messages?: Json | null;
          session_id?: number;
          session_name: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          messages?: Json | null;
          session_id?: number;
          session_name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_sessions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["uuid"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          id: number;
          uuid: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          uuid?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          uuid?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
