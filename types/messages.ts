export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  match_id: string;
  created_at: string;
  // Données étendues pour l'affichage
  other_user: {
    id: string;
    full_name: string;
    avatar_url: string;
    role: "freelance" | "client";
  };
  last_message?: {
    content: string;
    created_at: string;
    sender_id: string;
  };
  project?: {
    id: string;
    title: string;
  };
}

export interface Match {
  id: string;
  project_id: string;
  freelancer_id: string;
  client_id: string;
  created_at: string;
}
